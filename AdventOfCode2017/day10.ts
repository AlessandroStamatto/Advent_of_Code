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

function solve(): void {
    const list: number[] = []
    const len = 256
    for (let i = 0; i <= 255; ++i) list.push(i)
    let cur = 0,
        skip = 0
    const lengths = readFileSync("day10.txt", "utf8")
        .trim()
        .split(",")
        .map(Number)

    for (const length of lengths) {
        reverseSlice(list, cur, length)
        cur += (length + skip) % len
        skip += 1
    }

    print(list)
    print(list[0], " * ", list[1], "=", list[0] * list[1])
}

function knotHash(): string {
    const list: number[] = []
    const len = 256
    for (let i = 0; i <= 255; ++i) list.push(i)
    let cur = 0,
        skip = 0
    const lengths = [...readFileSync("day10.txt"), 17, 31, 73, 47, 23]
    print(lengths)

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
    const finalHash = denseHash
        .map(n => n.toString(16).padStart(2, "0"))
        .join("")

    //print(denseHash)
    //print(finalHash)
    return finalHash
}

print(knotHash)
