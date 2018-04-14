import { promisify } from 'util'
import { readFileSync } from 'fs'

const print = console.log.bind(console)

function solve() {
    let fileAsString = readFileSync("day1.txt", "utf8")
    let input = fileAsString.trim().split("").map(Number)
    let sumIfEqual = ([prev, total], cur) => prev === cur ? [cur, total + prev] : [cur, total]
    let [last, total] = input.reduce(sumIfEqual, [input[input.length - 1], 0])
    print(total)
}

function solve2() {
    let fileAsString = readFileSync("day1.txt", "utf8")
    let input = fileAsString.trim().split("").map(Number)
    const [len, step] = [input.length, Math.floor(input.length / 2)]
    let sum = 0
    for (let i = 0; i < len; ++i) {
        const [me, other] = [input[i], input[(i + step) % len]]
        sum = me === other ? sum + me : sum
    }
    print(sum)
}

solve2()