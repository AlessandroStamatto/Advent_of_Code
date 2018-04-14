import { readFileSync } from "fs"
const print = console.log.bind(console)
const toInt = Number.parseInt.bind(Number)

interface Inst {
    write: number
    move: number
    next: string
}
type State = [Inst, Inst]
type Blueprint = Map<string, State>
interface TuringMachine {
    nSteps: number
    curState: string
    states: Blueprint
    cursor: number
    memory: Map<number, number>
}

function fileToStates(filename: string): TuringMachine {
    const states: Blueprint = new Map()

    const lines = readFileSync(filename, "utf8")
        .trim()
        .split("\n")
        .map(w => w.trim().split(" "))
        .filter(el => el.length > 2)

    const curState = lines[0][3][0]
    const nSteps = toInt(lines[1][5])
    const P = lines
        .slice(2)
        .filter(l => l[0] !== "If")
        .map(l => l[l.length - 1][0])
    const len = P.length
    for (let b = 0; b < len; b += 7) {
        const S = P[b + 0]
        const i0 = {
            write: toInt(P[b + 1]),
            move: P[b + 2] === "r" ? 1 : -1,
            next: P[b + 3]
        }
        const i1 = {
            write: toInt(P[b + 4]),
            move: P[b + 5] === "r" ? 1 : -1,
            next: P[b + 6]
        }
        states.set(S, [i0, i1])
    }
    print(curState, nSteps)
    print(states)
    return { nSteps, curState, states, cursor: 0, memory: new Map() }
}

function cycle(machine: TuringMachine) {
    const { states, memory } = machine
    const state = states.get(machine.curState)
    if (!state) {
        print("UNKNOWN STATE: ", machine.curState)
        return
    }
    const cell = memory.get(machine.cursor)
    const exe = cell ? state[1] : state[0]
    const { write, move, next } = exe
    write ? memory.set(machine.cursor, 1) : memory.delete(machine.cursor)
    machine.cursor += move
    machine.curState = next
}

function solve() {
    const machine = fileToStates("day25.txt")
    print(machine)
    const { nSteps } = machine
    for (let step = 0; step < nSteps; ++step) cycle(machine)
    print(machine.memory.size)
}

solve()
