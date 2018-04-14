import { readFileSync } from "fs"
const print = console.log.bind(console)
const Int = parseInt

function fileToLines(filename: string): string[][] {
    return readFileSync(filename, "utf8")
        .trim()
        .split("\n")
        .map(s => s.trim().split(" "))
}

function getDefault(key: number, G: Graph): Set<number> {
    let neighboors = G.get(key)
    if (!neighboors) {
        neighboors = new Set()
        G.set(key, neighboors)
    }
    return neighboors
}

type Graph = Map<number, Set<number>>
function readGraph(filename: string): Graph {
    const G: Graph = new Map()
    for (const [fr, doubleArrow, ...neighboors] of fileToLines("day12.txt")) {
        const frNeighboors = getDefault(Int(fr), G)
        for (const neighboor of neighboors) {
            frNeighboors.add(Int(neighboor))
        }
    }
    return G
}

function DFS(cur: number, G: Graph, visited: Set<number>): void {
    visited.add(cur)
    const neighboors = getDefault(cur, G)
    for (const neighboor of neighboors) {
        if (!visited.has(neighboor)) DFS(neighboor, G, visited)
    }
}

function solve() {
    const G = readGraph("day12.txt")
    const visited: Set<number> = new Set()
    DFS(0, G, visited)
    print(visited, "LEN: ", visited.size)
}

function solve2() {
    const G = readGraph("day12.txt")
    const groups: Set<number>[] = []
    const globalVisited: Set<number> = new Set()

    for (const node of G.keys()) {
        if (globalVisited.has(node)) continue

        const visited: Set<number> = new Set()
        DFS(node, G, visited)
        groups.push(visited)
        visited.forEach(el => globalVisited.add(el))
    }

    print(groups, "LEN: ", groups.length)
}

solve2()
