import { readFileSync } from "fs"
import { setTimeout } from "timers"
const print = console.log.bind(console)
const abs = Math.abs.bind(Math),
    min = Math.min.bind(Math),
    max = Math.max.bind(Math)

function fileToLines(filename: string): string[][] {
    return readFileSync(filename, "utf8")
        .split("\n")
        .map(line => line.split(""))
}

type Direction = [1, 0] | [-1, 0] | [0, 1] | [0, -1]
type State = {
    Matrix: string[][]
    row: number
    col: number
    m: number
    n: number
    dir: Direction
    letters: string
}
const tileRe = /[|\-+]/
const letterRe = /[A-Z]/

function padLines(M: string[][]): string[][] {
    const m = M.length,
        n = M[0].length
    for (const line of M) while (line.length < n) line.push(" ")
    return M
}

function setupState(fileName: string): State {
    const Matrix = padLines(fileToLines(fileName))
    const row = 0
    const col = Matrix[0].indexOf("|")
    const letters = "",
        dir: Direction = [1, 0]
    const state = {
        Matrix,
        row,
        col,
        letters,
        dir,
        m: Matrix.length,
        n: Matrix[0].length
    }
    return state
}

function printMatrix(state: State) {
    const { Matrix, row, col, dir, letters, m, n } = state

    const height = 16,
        width = 32
    const min_i = max(row - height, 0),
        min_j = max(col - width, 0),
        max_i = min(row + height, m),
        max_j = min(col + width, n)

    for (let i = min_i; i < max_i; ++i) {
        const line = [...Matrix[i]]
        if (row === i) line[col] = "*"
        print(line.slice(min_j, max_j).join(""))
    }
    const tile = Matrix[row][col]
    print("Dir:", dir, "Letters:", letters)
}

const verticalDirs: Direction[] = [[1, 0], [-1, 0]]
const horizontalDirs: Direction[] = [[0, 1], [0, -1]]
function changeDirection(state: State) {
    const { dir, Matrix, row, col, m, n } = state
    const isHorizontal = abs(dir[1]) === 1
    const outOfBounds = row < 0 || row >= m || col < 0 || col >= n
    const crossDirs = isHorizontal ? verticalDirs : horizontalDirs
    const correctTile = isHorizontal ? "|" : "-"
    for (const nDir of crossDirs) {
        const [ni, nj] = [row + nDir[0], col + nDir[1]]
        if (outOfBounds) continue
        const tile = Matrix[ni][nj]
        if (tile === correctTile || letterRe.test(tile)) {
            state.dir = nDir
        }
    }
}

//do one step, returns true if out of grid
function step(state: State): boolean {
    const { Matrix, row, col, dir, letters, m, n } = state
    //Remember that row, col, and letters DO NOT UPDATE state
    const [ni, nj] = [row + dir[0], col + dir[1]]

    //if out of bounds we got out of the grid
    const outOfBounds = ni < 0 || ni >= m || nj < 0 || nj >= n
    if (outOfBounds) return true

    const tile = Matrix[ni][nj]
    //end of grid!
    if (tile === " ") return true

    //if not out of bounds and not end of grid; its always safe to take the step
    state.row = ni
    state.col = nj

    //if its a letter, we add it to the visited ones
    const isLetter = letterRe.test(tile)
    if (isLetter) state.letters += tile

    //if its a cross we must change direction!
    if (tile === "+") changeDirection(state)

    return false
}

function visualStep(state: State, speed: number) {
    console.log("\x1Bc") //clears console
    printMatrix(state)
    if (!step(state) && !state.letters.includes("H"))
        setTimeout(visualStep.bind(undefined, state, speed), speed)
}

function solve(filename: string) {
    const S = setupState(filename)
    let i = 1
    while (!step(S)) ++i
    print(S.letters, "in", i, "steps")
}

function visualize(fileName: string, speed: number) {
    const S = setupState(fileName)
    visualStep(S, speed)
}

print("Starting:")
visualize(process.argv[2], Number(process.argv[3]))
