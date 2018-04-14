import { readFileSync } from "fs"
const print = console.log.bind(console)

type Tile = [number, number]
function readTiles(filename: string): Tile[] {
    return readFileSync(filename, "utf8")
        .trim()
        .split("\n")
        .map(line => {
            const splited = line.trim().split("/")
            const tile: Tile = [
                Number.parseInt(splited[0]),
                Number.parseInt(splited[1])
            ]
            return tile
        })
}

function sumBridge(bridge: Tile[]) {
    const sum = (a: number, b: number) => a + b
    return bridge.map(vet => vet[0] + vet[1]).reduce(sum, 0)
}

let maxBridge: Tile[] = []
let maxSum = 0
function dfs(available: Tile[] = [], bridge: Tile[] = []) {
    let valid: Tile[] = available
    let last = 0
    const bridgeLen = bridge.length
    if (bridgeLen > 0) {
        last = bridge[bridgeLen - 1][1]
        valid = available.filter(p => p[0] === last || p[1] === last)
    }
    const validLen = valid.length
    if (validLen === 0) {
        //Base Case: no more valid pieces
        const nSum = sumBridge(bridge)
        if (nSum > maxSum) {
            ;[maxBridge, maxSum] = [bridge, nSum]
            print(maxSum)
        }
        //print(nSum, bridge)
    } else {
        //Recursive step
        for (const chosen of valid) {
            const idx = available.findIndex(
                e => chosen[0] === e[0] && chosen[1] === e[1]
            )
            const nAvailable = [...available]
            nAvailable.splice(idx, 1)
            if (chosen[0] === last) {
                const nBridge = [...bridge]
                nBridge.push(chosen)
                dfs(nAvailable, nBridge)
            }
            if (chosen[1] === last) {
                const nBridge = [...bridge]
                nBridge.push([chosen[1], chosen[0]])
                dfs(nAvailable, nBridge)
            }
        }
    }
}

let maxLen = 0
function dfsLongest(available: Tile[] = [], bridge: Tile[] = []) {
    let valid: Tile[] = available
    let last = 0
    const bridgeLen = bridge.length
    if (bridgeLen > 0) {
        last = bridge[bridgeLen - 1][1]
        valid = available.filter(p => p[0] === last || p[1] === last)
    }
    const validLen = valid.length
    if (validLen === 0) {
        //Base Case: no more valid pieces
        const nLen = bridge.length
        if (nLen >= maxLen) {
            maxLen = nLen
            const nSum = sumBridge(bridge)
            if (nSum > maxSum) {
                ;[maxBridge, maxSum] = [bridge, nSum]
                print(maxLen, maxSum)
            }
        }
        //print(nSum, bridge)
    } else {
        //Recursive step
        for (const chosen of valid) {
            const idx = available.findIndex(
                e => chosen[0] === e[0] && chosen[1] === e[1]
            )
            const nAvailable = [...available]
            nAvailable.splice(idx, 1)
            if (chosen[0] === last) {
                const nBridge = [...bridge]
                nBridge.push(chosen)
                dfsLongest(nAvailable, nBridge)
            }
            if (chosen[1] === last) {
                const nBridge = [...bridge]
                nBridge.push([chosen[1], chosen[0]])
                dfsLongest(nAvailable, nBridge)
            }
        }
    }
}

function solve() {
    const pieces = readTiles("day24.txt")
    print(pieces)
    dfsLongest(pieces)
    print("Max Sum:", maxSum, "Bridge:", maxBridge)
}

solve()
