import { readFileSync } from "fs"

const print = console.log.bind(console)
const floor = Math.floor.bind(Math)

function fileToLines(filename: string): number[][] {
    return readFileSync(filename, "utf8")
        .trim()
        .split("\n")
        .map(line =>
            line
                .trim()
                .split(":")
                .map(n => parseInt(n))
        )
}

function readFirewall(filename: string): number[] {
    const input = fileToLines("day13.txt")
    const maxDepth = input[input.length - 1][0]
    const firewall = Array(maxDepth + 1).fill(0)
    for (const [depth, range] of input) firewall[depth] = range
    return firewall
}

function scannerPos(picosecond: number, range: number): number {
    if (range === 1) return 0
    const unadjusted = picosecond % (range + range - 2),
        last = range - 1
    return unadjusted <= last ? unadjusted : last - unadjusted % last
}

function solve() {
    const firewall = readFirewall("day13.txt")
    const len = firewall.length
    let severity = 0
    for (let cur = 0; cur < len; ++cur) {
        const range = firewall[cur]
        if (range === 0) continue

        if (scannerPos(cur, range) === 0) {
            print("Caught at deep ", cur)
            severity += cur * firewall[cur]
        }
    }
    print("Total severity: ", severity)
}

function solve2() {
    const firewall = readFirewall("day13.txt")
    const len = firewall.length
    let escaped = false
    o: for (let start = 0; !escaped; ++start) {
        for (let cur = 0; cur < len; ++cur) {
            const range = firewall[cur]
            if (range === 0) continue

            if (scannerPos(cur + start, range) === 0) {
                //print(`(${start})Caught at deep ${cur}, retracing...`)
                continue o //outerloop
            }
        }
        escaped = true
        print("Escaped with delay: ", start)
    }
}

solve2()
