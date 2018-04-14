import { readFileSync } from "fs"
import { getDefaultSettings } from "http2"

const print = console.log.bind(console)

function fileToLines(filename: string): string[] {
    return readFileSync(filename, "utf8")
        .trim()
        .split("\n")
        .map(s => s.trim())
}

interface node {
    name: string
    weight: number
    totalWeight: number
    childs: Set<string>
    parent: string
}

function getDefaultNode(key: string, M: Map<string, node>): node {
    let node = M.get(key)
    if (!node) {
        node = {
            name: key,
            weight: 0,
            totalWeight: 0,
            childs: new Set(),
            parent: key
        }
        M.set(key, node)
    }
    return node
}

function fileToGraph(filename: string): Map<string, node> {
    const M = new Map()
    const input = fileToLines(filename)
    for (const line of input) {
        const splited = line.split(" ")

        const rootName = splited[0]
        const weight = parseInt(splited[1].slice(1))
        const root = getDefaultNode(rootName, M)
        root.weight = weight
        const len = splited.length
        if (len > 2) {
            splited[len - 1] += "," //the following code assumes name ends with comma
            for (const word of splited.slice(3)) {
                const childName = word.slice(0, word.length - 1) //strip ending comma
                const child = getDefaultNode(childName, M)
                root.childs.add(childName)
                child.parent = rootName
            }
        }
    }
    return M
}

function getRoot(G: Map<string, node>): string {
    const nxt = G.values().next()
    if (nxt) {
        let nd = nxt.value
        while (nd.name !== nd.parent) {
            nd = getDefaultNode(nd.parent, G)
        }
        return nd.name
    }
    return "Root not found..."
}

function fillTotalWeights(rootName: string, G: Map<string, node>): void {
    const node = getDefaultNode(rootName, G)
    node.totalWeight = node.weight
    for (const childName of node.childs) {
        const child = getDefaultNode(childName, G)
        fillTotalWeights(childName, G)
        node.totalWeight += child.totalWeight
    }
}

function getDefaultCount(
    weight: number,
    M: Map<number, Set<string>>
): Set<string> {
    let S = M.get(weight)
    if (!S) {
        S = new Set()
        M.set(weight, S)
    }
    return S
}

function outlierChildren(
    parentName: string,
    G: Map<string, node>
): { std: string; outl: string } {
    let std = "",
        outl = ""
    const parent = getDefaultNode(parentName, G)

    if (parent.childs.size <= 2) return { std, outl }

    const Count: Map<number, Set<string>> = new Map()
    for (const childName of parent.childs) {
        const { totalWeight } = getDefaultNode(childName, G)
        const S = getDefaultCount(totalWeight, Count)
        S.add(childName)
    }
    for (const [, S] of Count.entries()) {
        if (S.size === 1) outl = S.values().next().value
        else std = S.values().next().value
    }
    return { std, outl }
}

function badNode(rootName: string, G: Map<string, node>): boolean {
    const root = getDefaultNode(rootName, G)
    if (rootName === root.parent) return false //Graph Root is not bad

    const { outl: parentOutl } = outlierChildren(root.parent, G)
    if (parentOutl !== rootName) return false //if my total weight is not wrong Im not bad

    const { outl: myOutl } = outlierChildren(rootName, G)
    if (myOutl === "") return true //if my total weight is wrong and my childrens balanced: Im bad!

    return false //if my total weight is wrong but my childrens not balanced: Im not bad
}

function findBadNodeCorrection(
    rootName: string,
    G: Map<string, node>
): { std: string; outl: string } {
    fillTotalWeights(rootName, G)
    for (const nodeName of G.keys()) {
        const node = getDefaultNode(nodeName, G)
        if (badNode(nodeName, G)) {
            return outlierChildren(node.parent, G)
        }
    }
    return outlierChildren(rootName, G)
}

function solve() {
    const G = fileToGraph("day7.txt")
    const rootName = getRoot(G)
    print(rootName)
    const { std, outl } = findBadNodeCorrection(rootName, G)
    const stdNode = getDefaultNode(std, G)
    const outlNode = getDefaultNode(outl, G)
    print(
        `std:${stdNode.name}/${stdNode.totalWeight}, outl:${outlNode.name}/${
            outlNode.totalWeight
        }`
    )
    const diff = outlNode.totalWeight - stdNode.totalWeight
    print(diff)

    const parentNode = getDefaultNode(outlNode.parent, G)
    const childsTotalWeights: number[] = []
    for (const childName of parentNode.childs) {
        childsTotalWeights.push(getDefaultNode(childName, G).totalWeight)
    }
    print(outlNode.parent, childsTotalWeights)

    print(outl, outlNode.weight, " -> ", outlNode.weight - diff)
}

solve()
