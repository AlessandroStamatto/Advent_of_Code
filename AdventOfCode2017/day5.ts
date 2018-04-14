import { readFileSync } from 'fs'

let print = console.log.bind(console)

function solve(update: (cur: number) => number): void {
    const fileAsString = readFileSync("day5.txt", "utf8")
    let input = fileAsString.trim().split("\n").map(line => Number(line.trim()))
    //input = [0, 3, 0, 1, -3]
    const len = input.length
    let i = 0, steps = 0, jump = 0
    while (i < len) {
        jump = input[i]
        input[i] = update(input[i])
        i += jump
        ++steps
    }
    print(steps)
}

print("Calculating...")
solve(cur => cur + 1)
solve(cur => cur = cur >= 3 ? cur - 1 : cur + 1)