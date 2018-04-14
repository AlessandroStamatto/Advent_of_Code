import {} from "fs"
const print = console.log.bind(console)

function solve(input: number, max: number) {
    const circular: number[] = [0]
    let start = 0
    for (let n = 1; n <= max; ++n) {
        const pos = (start + input) % circular.length
        start = pos + 1
        circular.splice(start, 0, n)
    }
    print(circular[start + 1])
}

function solve2(input: number, max: number) {
    let start = 0,
        afterZero = 0
    for (let n = 1; n <= max; ++n) {
        const pos = (start + input) % n
        start = pos + 1
        if (start === 1) afterZero = n
    }
    print("After 0 is:", afterZero)
}
print("calculating...")
solve(348, 2017)
solve2(348, 50000000)
