import { } from 'fs'

let print = console.log.bind(console)

function hash(V: number[]): string {
    return V.toString()
}

function redistribute(V: number[]): number[] {
    let iMax = 0, len = V.length
    for (let i = 1; i < len; ++i) {
        iMax = V[i] > V[iMax] ? i : iMax
    }

    let pool = V[iMax]
    V[iMax] = 0
    let cur = (iMax + 1) % len
    while (pool > 0) {
        --pool;
        V[cur] += 1
        cur = (cur + 1) % len
    }
    return V
    //print(V)
}

function solve(input: number[]): number[] {
    const S = new Set()
    let V = input, steps = 0
    //print(V)
    while (!S.has(hash(V))) {
        S.add(hash(V)); ++steps
        redistribute(V)
    }
    print(steps)
    return V
}

function solve2(input: number[]): void {
    const needle = hash(input)
    const V = [...input]
    let steps = 1
    while (needle !== hash(redistribute(V))) {
        steps += 1
    }
    print(steps)
}

print("Calculating...")
const input2 = solve([11, 11, 13, 7, 0, 15, 5, 5, 4, 4, 1, 1, 7, 1, 15, 11])
solve2(input2)