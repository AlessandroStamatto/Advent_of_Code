import { readFileSync } from "fs"
const print = console.log.bind(console)

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
    name: string
    instructions: string[][]
    ip: number
    Mem: Map<string, number>
    send: number[]
    recv: number[]
    sendCount: number
}

function cycle(P: Processor, sound: boolean = false): boolean {
    const { instructions, Mem, send, recv } = P
    const [inst, X, Y] = instructions[P.ip++]
    if (inst === "snd") {
        const value = get(X, Mem)
        send.push(value)
        P.sendCount += 1
    } else if (inst === "set") Mem.set(X, get(Y, Mem))
    else if (inst === "add") Mem.set(X, get(X, Mem) + get(Y, Mem))
    else if (inst === "mul") Mem.set(X, get(X, Mem) * get(Y, Mem))
    else if (inst === "mod") Mem.set(X, get(X, Mem) % get(Y, Mem))
    else if (inst === "rcv") {
        if (sound && get(X, Mem) !== 0 && P.send.length > 0) {
            print(P.send[P.send.length - 1]) //for first star...
            return true //first sound found
        }
        if (recv.length > 0) {
            const val = recv.shift()
            Mem.set(X, val === undefined ? NaN : val)
        } else {
            P.ip -= 1
        }
    } else if (inst === "jgz") {
        if (get(X, Mem) > 0) P.ip += get(Y, Mem) - 1
    } else print("Unknown Instruction:", inst)
    return false
}

function setupProcessors(): [Processor, Processor] {
    const instructions = fileToLines("day18.txt")
    const P0_to_P1: number[] = [],
        P1_to_P0: number[] = []
    const P0: Processor = {
        name: "P0",
        instructions,
        ip: 0,
        Mem: new Map([["p", 0]]),
        send: P0_to_P1,
        recv: P1_to_P0,
        sendCount: 0
    }
    const P1: Processor = {
        name: "P1",
        instructions,
        ip: 0,
        Mem: new Map([["p", 1]]),
        send: P1_to_P0,
        recv: P0_to_P1,
        sendCount: 0
    }
    return [P0, P1]
}

function solve() {
    const [P0, P1] = setupProcessors()
    const len = P0.instructions.length

    let nCycles = 0
    while (P0.ip < len) if (cycle(P0, true)) break
}

function solve2() {
    const [P0, P1] = setupProcessors()
    const len0 = P0.instructions.length
    const len1 = P1.instructions.length

    let deadlock = false
    while ((P0.ip < len0 || P1.ip < len1) && !deadlock) {
        const prev0 = P0.ip,
            prev1 = P1.ip
        if (P0.ip < len0) cycle(P0)
        if (P1.ip < len1) cycle(P1)
        deadlock = prev0 === P0.ip && prev1 === P1.ip
    }
    print(P1.sendCount)
}

print("Processing...")
solve()
solve2()
