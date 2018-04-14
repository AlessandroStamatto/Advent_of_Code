import { readFileSync } from "fs"
const floor = Math.floor.bind(Math)
const print = console.log.bind(console)

//inplace
function reverseSlice(vec: number[], start: number, howMany: number): number[] {
    if (howMany < 2) return vec
    const len = vec.length
    let e = howMany - 1
    for (let s = 0; s < e; ++s, --e) {
        let st = (start + s) % len,
            en = (start + e) % len
        ;[vec[st], vec[en]] = [vec[en], vec[st]]
    }
    return vec
}

function asciiCode(letter: string): number {
    return letter.charCodeAt(0)
}

function toBinary(hex: string): string {
    return parseInt(hex, 16)
        .toString(2)
        .padStart(4, "0")
}

function knotHash(input: string): number[] {
    const list: number[] = []
    const len = 256
    for (let i = 0; i <= 255; ++i) list.push(i)
    let cur = 0,
        skip = 0
    const bytes = input
        .trim()
        .split("")
        .map(asciiCode)
    const lengths = [...bytes, 17, 31, 73, 47, 23]

    //64 rounds to transform list into the sparse hash
    for (let i = 0; i < 64; ++i) {
        for (const length of lengths) {
            reverseSlice(list, cur, length)
            cur += (length + skip) % len
            skip += 1
        }
    }
    const sparseHash = list //just for clarity

    const denseHash: number[] = []
    for (let hexect = 0; hexect < 16; ++hexect) {
        const start = hexect * 16
        const end = (hexect + 1) * 16
        let xor = sparseHash[start]
        for (let i = start + 1; i < end; ++i) {
            xor ^= sparseHash[i]
        }
        denseHash.push(xor)
    }
    return denseHash
        .map(n => n.toString(16).padStart(2, "0"))
        .join("")
        .split("")
        .map(n => toBinary(n))
        .join("")
        .split("")
        .map(Number)
}

function solve() {
    const input = "jxqlasbh"
    let total = 0
    for (let i = 0; i < 128; ++i) {
        total += knotHash(input + "-" + i.toString()).reduce((a, b) => a + b)
    }
    print(total)
}

function zeroRegion(i: number, j: number, matrix: number[][]) {
    const outOfBounds = i < 0 || j < 0 || i > 127 || j > 127
    if (outOfBounds || matrix[i][j] === 0) return
    matrix[i][j] = 0
    zeroRegion(i - 1, j, matrix)
    zeroRegion(i + 1, j, matrix)
    zeroRegion(i, j - 1, matrix)
    zeroRegion(i, j + 1, matrix)
}

function solve2() {
    const input = "jxqlasbh"
    const matrix: number[][] = []
    for (let i = 0; i < 128; ++i) {
        matrix.push(knotHash(input + "-" + i.toString()))
    }
    let total = 0
    for (let i = 0; i < 128; ++i) {
        for (let j = 0; j < 128; ++j) {
            if (matrix[i][j] === 1) {
                total += 1
                zeroRegion(i, j, matrix)
            }
        }
    }
    print(total)
}

solve2()
