import { readFileSync } from "fs"
const sqrt = Math.sqrt.bind(Math)
const floor = Math.floor.bind(Math)
const print = console.log.bind(console)

type Matrix = string[][]

function strToMat(line: string): Matrix {
    return line
        .trim()
        .split("/")
        .map(l => l.trim().split(""))
}

function matToStr(mat: Matrix): string {
    return mat.map(line => line.join("")).join("/")
}

function transpose(mat: Matrix): Matrix {
    const transposed: Matrix = []
    const lenI = mat.length,
        lenJ = mat[0].length

    for (let j = 0; j < lenJ; ++j) {
        const line = []
        for (let i = 0; i < lenI; ++i) {
            line.push(mat[i][j])
        }
        transposed.push(line)
    }
    return transposed
}

function flip(mat: Matrix): Matrix {
    const fliped: Matrix = []
    const lenI = mat.length,
        lenJ = mat[0].length
    const ult = lenI - 1

    for (let i = 0; i < lenI; ++i) {
        fliped.push([...mat[ult - i]])
    }

    return fliped
}

function allVariations(matStr: string): string[] {
    let M = strToMat(matStr)
    const result: Matrix[] = []
    const add = function(f: (m: Matrix) => Matrix) {
        M = f(M)
        result.push(M)
    }
    add(m => m) //original | 360
    add(transpose) // symmetric rot 0
    add(flip) // rot 90
    add(transpose) // symmetric rot 90
    add(flip) // rot 180
    add(transpose) // symmetric rot 180
    add(flip) // rot 270
    add(transpose) // symmetric rot 270

    return result.map(matToStr)
}

function fileToMap(filename: string): Map<string, Matrix> {
    const M = new Map()

    const lines = readFileSync(filename, "utf8")
        .trim()
        .split("\n")
        .map(l => l.split("=>"))

    for (const [fr, to] of lines) {
        const [frm, tom] = [strToMat(fr), strToMat(to)]
        for (const variation of allVariations(matToStr(frm)))
            M.set(variation, tom)
    }

    return M
}

function breakMatByX(M: Matrix, x: number): Matrix[] {
    const lenI = M.length,
        lenJ = M[0].length
    const result: Matrix[] = []
    for (let i = 0; i < lenI; i += x) {
        for (let j = 0; j < lenJ; j += x) {
            const square: Matrix = []
            for (let k = 0; k < x; ++k) {
                square.push(M[i + k].slice(j, j + x))
            }
            result.push(square)
        }
    }
    return result
}

function joinMatByX(M: Matrix[], x: number): Matrix {
    const len = M.length
    const sqI = M[0].length,
        sqJ = M[0][0].length
    const sqPerDim = sqrt(len)
    const nLines = sqPerDim * sqI
    const result: Matrix = []
    for (let i = 0; i < nLines; ++i) result.push([])

    for (let sq = 0; sq < len; ++sq) {
        const S = M[sq]
        const base = floor(sq / sqPerDim) * sqI
        for (let i = 0; i < sqI; ++i) {
            for (let j = 0; j < sqJ; ++j) {
                result[base + i].push(S[i][j])
            }
        }
    }

    return result
}

function printMatrix(M: Matrix) {
    const len = M.length
    for (let line = 0; line < len; ++line) print(M[line].join(""))
}

function transform(Mat: Matrix, rules: Map<string, Matrix>): Matrix {
    const idx = matToStr(Mat)
    const tom = rules.get(idx)
    if (!tom) {
        print(idx, "FATAL ERROR, NO RULE FOUND")
        return Mat
    } else {
        //print(idx, "=>", tom)
        return tom
    }
}

function simpleTest() {
    fileToMap("day21.txt")
    const M: Matrix = ["#..#", "....", "....", "#..#"].map(s => s.split(""))
    printMatrix(M)
    const breaked = breakMatByX(M, 2)
    for (const sq of breaked) printMatrix(sq)
    const joined = joinMatByX(breaked, 2)
    printMatrix(joined)
}

function countOn(Mat: Matrix): number {
    const lenI = Mat.length,
        lenJ = Mat[0].length
    let total = 0
    for (let i = 0; i < lenI; ++i) {
        for (let j = 0; j < lenJ; ++j) {
            if (Mat[i][j] === "#") total += 1
        }
    }
    return total
}

const start = [[".", "#", "."], [".", ".", "#"], ["#", "#", "#"]]

function solve() {
    const nIterations = 18
    const rules = fileToMap("day21.txt")
    let mat = start
    for (let iteration = 0; iteration < nIterations; ++iteration) {
        const size = mat.length
        const x = size % 2 === 0 ? 2 : 3
        const breaked = breakMatByX(mat, x)
        //for (const m of breaked) printMatrix(m)
        const transformed = breaked.map(m => transform(m, rules))
        //for (const m of transformed) printMatrix(m)
        const joined = joinMatByX(transformed, x)
        mat = joined
        print("Iteration: ", iteration + 1)
        //printMatrix(mat)
    }
    print("Number of #: ", countOn(mat))
}

print("calculating...")
solve()
