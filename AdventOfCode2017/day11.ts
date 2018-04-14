import { readFileSync } from "fs"
const print = console.log.bind(console)
const min = Math.min.bind(Math)
const max = Math.max.bind(Math)

type Dir = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw"
interface DirCount {
    [key: string]: number
    n: number
    ne: number
    e: number
    se: number
    s: number
    sw: number
    w: number
    nw: number
}

function createDirCount(path: string[] = []): DirCount {
    const dirCount: DirCount = {
        n: 0,
        ne: 0,
        e: 0,
        se: 0,
        s: 0,
        sw: 0,
        w: 0,
        nw: 0
    }
    for (const dir of path) {
        dirCount[dir] += 1
    }

    return dirCount
}

function sumCount(dirCount: DirCount): number {
    return (
        dirCount.n +
        dirCount.ne +
        dirCount.e +
        dirCount.se +
        dirCount.s +
        dirCount.sw +
        dirCount.w +
        dirCount.nw
    )
}

function cancel(dir1: string, dir2: string, dirCount: DirCount): number {
    const canceled = min(dirCount[dir1], dirCount[dir2])
    dirCount[dir1] -= canceled
    dirCount[dir2] -= canceled
    return canceled
}

//might need several rounds, but for the problem at hand one round was enough
function nStepsDirCount(dirCount: DirCount): number {
    cancel("n", "s", dirCount)
    cancel("sw", "ne", dirCount)
    cancel("se", "nw", dirCount)

    dirCount.n += cancel("ne", "nw", dirCount)
    dirCount.ne += cancel("se", "n", dirCount)
    dirCount.se += cancel("ne", "s", dirCount)
    dirCount.s += cancel("se", "sw", dirCount)
    dirCount.sw += cancel("s", "nw", dirCount)
    dirCount.nw += cancel("n", "sw", dirCount)

    return sumCount(dirCount)
}

function solve() {
    const input = readFileSync("day11.txt", "utf8")
        .trim()
        .split(",")
    const dirCount: DirCount = createDirCount(input)

    print(nStepsDirCount(dirCount))
}

function solve2() {
    const input = readFileSync("day11.txt", "utf8")
        .trim()
        .split(",")

    const len = input.length
    let maxSteps = 0,
        newSteps = 0
    for (let end = 1; end <= len; ++end) {
        newSteps = nStepsDirCount(createDirCount(input.slice(0, end)))
        maxSteps = max(maxSteps, newSteps)
    }
    print(maxSteps)
}

solve()
solve2()
