import { readFileSync } from "fs"
import { setTimeout } from "timers"
const print = console.log.bind(console)
const abs = Math.abs.bind(Math),
    min = Math.min.bind(Math),
    max = Math.max.bind(Math)

type particle = { p: number[]; v: number[]; a: number[] }
function fileToParticles(filename: string): particle[] {
    const lines = readFileSync(filename, "utf8")
        .split("\n")
        .map(line =>
            line
                .trim()
                .split("=<")
                .map(el => el.split(","))
        )
    const N = Number.parseInt.bind(Number)
    const particles = lines.map(line => {
        const [, [px, py, pz], [vx, vy, vz], [ax, ay, az]] = line
        return {
            p: [N(px), N(py), N(pz)],
            v: [N(vx), N(vy), N(vz)],
            a: [N(ax), N(ay), N(az)]
        }
    })
    return particles
}

function sum(a: number[], b: number[]): number[] {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}

function dist(vi: number, a: number, t: number): number {
    return vi * t + a * t ** 2 / 2
}

function distance(vi: number[], a: number[], t: number): number[] {
    return [dist(vi[0], a[0], t), dist(vi[1], a[1], t), dist(vi[2], a[2], t)]
}

function addToMe(a: number[], b: number[]) {
    a[0] += b[0]
    a[1] += b[1]
    a[2] += b[2]
}

function walkTick(p: particle) {
    addToMe(p.v, p.a)
    addToMe(p.p, p.v)
}

function walkTicks(p: particle, t: number) {
    while (t-- > 0) {
        addToMe(p.v, p.a)
        addToMe(p.p, p.v)
    }
}

function absolute(a: number[]): number {
    return abs(a[0]) + abs(a[1]) + abs(a[2])
}

function minPos(V: number[]): number {
    let minN = V[0],
        minP = 0,
        len = V.length
    for (let i = 1; i < len; ++i) if (V[i] < minN) [minN, minP] = [V[i], i]
    //for body above
    return minP
}

function solve() {
    const particles = fileToParticles("day20.txt")

    for (const p of particles) {
        let ticks = 100
        while (ticks-- > 0) walkTicks(p, ticks)
    }

    const absolutes = particles.map(p => absolute(p.p))
    print(minPos(absolutes))
}

function vToStr(V: number[]): string {
    return V[0] + "_" + V[1] + "_" + V[2]
}

function filterCollisions(particles: particle[]): particle[] {
    const count: Map<string, number> = new Map()
    for (const { p } of particles) {
        const idx = vToStr(p)
        const cur = count.get(idx)
        count.set(idx, cur ? cur + 1 : 1)
    }

    //filter those that have count higher than 1!
    return particles.filter(({ p }) => {
        let cur = count.get(vToStr(p))
        cur = cur ? cur : 0
        return cur < 2
    })
}

function solve2() {
    let particles = fileToParticles("day20.txt")

    let ticks = 100
    while (ticks-- > 0) {
        for (const p of particles) {
            walkTick(p)
        }
        particles = filterCollisions(particles)
        print(particles.length)
    }
}

solve2()
