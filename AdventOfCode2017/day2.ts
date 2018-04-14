import { promisify } from 'util'
import { readFileSync } from 'fs'

const print = console.log.bind(console)

function solve() {
    let fileAsString = readFileSync("day2.txt", "utf8")
    let input = fileAsString.split("\n")
        .map(line => line.trim().split('\t').map(Number))
    let checksum = input.map(line => Math.max(...line) - Math.min(...line))
        .reduce((a, b) => a + b)
    print(checksum)
}

function evenDivisibleSum(line: number[]) {
    line.sort((a, b) => b - a)
    const len = line.length
    for (let i = 0; i < len; ++i) {
        for (let j = len - 1; j > 0; --j) {
            if (line[i] !== line[j] && line[i] % line[j] === 0)
                return line[i] / line[j]
        }
    }
}

function solve2() {
    let fileAsString = readFileSync("day2.txt", "utf8")
    let input = fileAsString.split("\n")
        .map(line => line.trim().split('\t').map(Number))
    let checksum = input.map(evenDivisibleSum)
        .reduce((a, b) => a + b)
    print(checksum)
}

solve2()