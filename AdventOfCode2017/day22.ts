import { readFileSync } from "fs"
const print = console.log.bind(console)
const floor = Math.floor.bind(Math)

type Matrix = string[][]
type Status = number
interface Carrier {
    pos: [number, number]
    dir: number
}
//              "up"   "right" "down"  "left"
const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
const CLEAN = 0,
    WEAK = 1,
    INFECTED = 2,
    FLAG = 3

function fileToMat(filename: string): Matrix {
    return readFileSync(filename, "utf8")
        .trim()
        .split("\n")
        .map(line => line.trim().split(""))
}

function posToStr(pos: [number, number]): string {
    return pos[0] + "_" + pos[1]
}

function newGridCarrier(filename: string): [Map<string, Status>, Carrier] {
    const Grid = new Map()
    const mat = fileToMat(filename)
    const lenI = mat.length,
        lenJ = mat[0].length
    for (let i = 0; i < lenI; ++i) {
        for (let j = 0; j < lenJ; ++j) {
            if (mat[i][j] === "#") Grid.set(i + "_" + j, INFECTED)
        }
    }
    const carrier: Carrier = { pos: [floor(lenI / 2), floor(lenJ / 2)], dir: 0 }
    return [Grid, carrier]
}

//toggles clean(false)-infected(true) and returns new infected status
function toggle({ pos }: Carrier, Grid: Map<string, number>): Status {
    const idx = posToStr(pos)
    const el = Grid.get(idx)
    if (el) {
        Grid.delete(idx)
        return CLEAN
    } else {
        Grid.set(idx, INFECTED)
        return INFECTED
    }
}

function solve() {
    const [Grid, carrier] = newGridCarrier("day22.txt")
    const nBursts = 10000
    let total = 0
    for (let burst = 0; burst < nBursts; ++burst) {
        const nStatus = toggle(carrier, Grid)
        if (nStatus) {
            ++total
            carrier.dir = carrier.dir === 0 ? 3 : carrier.dir - 1
        } else {
            carrier.dir = carrier.dir === 3 ? 0 : carrier.dir + 1
        }
        carrier.pos[0] += dirs[carrier.dir][0]
        carrier.pos[1] += dirs[carrier.dir][1]
    }
    print(total)
}

function weaken({ pos }: Carrier, Grid: Map<string, number>): Status {
    const idx = posToStr(pos)
    const el = Grid.get(idx)
    if (el === FLAG) {
        Grid.delete(idx)
        return CLEAN
    } else if (el === WEAK) {
        Grid.set(idx, INFECTED)
        return INFECTED
    } else if (el === INFECTED) {
        Grid.set(idx, FLAG)
        return FLAG
    } else {
        //el === CLEAN
        Grid.set(idx, WEAK)
        return WEAK
    }
}

function solve2() {
    const [Grid, carrier] = newGridCarrier("day22.txt")
    const nBursts = 10000000
    let total = 0
    for (let burst = 0; burst < nBursts; ++burst) {
        const nStatus = weaken(carrier, Grid)
        if (nStatus === INFECTED) {
            ++total
        } else if (nStatus === WEAK) {
            carrier.dir = carrier.dir === 0 ? 3 : carrier.dir - 1
        } else if (nStatus === FLAG) {
            carrier.dir = carrier.dir === 3 ? 0 : carrier.dir + 1
        } else {
            //nStatus === CLEAN
            carrier.dir = (carrier.dir + 2) % 4
        }
        carrier.pos[0] += dirs[carrier.dir][0]
        carrier.pos[1] += dirs[carrier.dir][1]
    }
    print(total)
}

print("Calculating...")
solve2()
