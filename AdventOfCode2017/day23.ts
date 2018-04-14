import { readFileSync } from "fs"
const print = console.log.bind(console)
const sqrt = Math.sqrt.bind(Math)

function fileToLines(filename: string): string[][] {
    return readFileSync(filename, "utf8")
        .trim()
        .split("\n")
        .map(line =>
            line
                .trim()
                .split(" ")
                .map(word => word.trim())
        )
}

function get(N: string, Mem: Map<string, number>): number {
    if (N.match(/[a-z]/)) {
        const value = Mem.get(N)
        if (value === undefined) return 0
        return value
    }
    const value = Number(N)
    if (Number.isNaN(value)) print("ERROR", N, "turned to NAN")
    return value
}

type Processor = {
    instructions: string[][]
    ip: number
    Mem: Map<string, number>
    mulCount: number
}

function cycle(P: Processor) {
    const { instructions, Mem } = P
    const [inst, X, Y] = instructions[P.ip++]
    const jump = () => (P.ip += get(Y, Mem) - 1)

    //print(inst, `${X}(${get(X, Mem)})`, `${Y}(${get(Y, Mem)})`)

    if (inst === "mul") ++P.mulCount

    if (inst === "set") Mem.set(X, get(Y, Mem))
    else if (inst === "add") Mem.set(X, get(X, Mem) + get(Y, Mem))
    else if (inst === "sub") Mem.set(X, get(X, Mem) - get(Y, Mem))
    else if (inst === "mul") Mem.set(X, get(X, Mem) * get(Y, Mem))
    else if (inst === "div") Mem.set(X, get(X, Mem) / get(Y, Mem))
    else if (inst === "mod") Mem.set(X, get(X, Mem) % get(Y, Mem))
    else if (inst === "jgz" && get(X, Mem) > 0) jump()
    else if (inst === "jnz" && get(X, Mem) !== 0) jump()
    else {
        if (inst[0] !== "j") print("Unknown Instruction:", inst)
    }
}

function setupProcessor(): Processor {
    const instructions = fileToLines("day23.txt")
    return {
        instructions,
        ip: 0,
        Mem: new Map([["p", 0]]),
        mulCount: 0
    }
}

function solve() {
    const P = setupProcessor()
    const len = P.instructions.length

    while (P.ip < len) cycle(P)
    print(P.mulCount)
}

function isComposite(n: number): boolean {
    //if (n===2) return false //no need to work for 2
    const sq = sqrt(n)
    for (let i = 2; i < sq; ++i) {
        if (n % i === 0) return true
    }
    return false
}

function solve2() {
    let total = 0
    for (let i = 108100; i <= 125100; i += 17) {
        if (isComposite(i)) total += 1
    }

    print(total)
}

print("Processing...")
solve2()
