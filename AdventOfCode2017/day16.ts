import { readFileSync } from "fs"
const print = console.log.bind(console)

type undstring = undefined | string
type Dancers = undstring[]
function spin(x: number, V: Dancers): Dancers {
    for (let i = 0; i < x; ++i) V.unshift(V.pop())
    return V
}

function exchange(a: number, b: number, V: Dancers): Dancers {
    ;[V[a], V[b]] = [V[b], V[a]]
    return V
}

function partner(a: string, b: string, V: Dancers): Dancers {
    const A = V.indexOf(a),
        B = V.indexOf(b)
    ;[V[A], V[B]] = [V[B], V[A]]
    return V
}

function dance(dancers: Dancers, input: string[][]): string {
    for (const [buff, B] of input) {
        const fun = buff[0],
            A = buff.slice(1)

        if (fun === "s") spin(Number(A), dancers)
        else if (fun === "x") exchange(Number(A), Number(B), dancers)
        else if (fun === "p") partner(A, B, dancers)
    }
    return dancers.join("")
}

function solve() {
    const dancers: Dancers = "abcdefghijklmnop".split("")
    const input = readFileSync("day16.txt", "utf8")
        .split(",")
        .map(s => s.split("/"))
    print(dance(dancers, input))
}

const billion = 1000000000
function solve2() {
    let dancers: Dancers = "abcdefghijklmnop".split("")
    //const dancers: Dancers = "abcde".split("")
    const input = readFileSync("day16.txt", "utf8")
        .split(",")
        .map(s => s.split("/"))

    const firstDance = dance(dancers, input)

    let i = 1
    //find cycle
    for (; /*will reuse i*/ i < billion; ++i) {
        const cur = dance(dancers, input)

        if (cur === firstDance) {
            //started repeating!
            print("Cycle each", i, "dances")
            break
        }
    }

    const cycle = i
    const lastDances = billion % cycle //fast forward all cycles
    print("Doing the last", lastDances - 1, "dances ;)")
    for (let i = 1 /*all cycles are reduced to 1 step*/; i < lastDances; ++i) {
        //finish the last dances...
        dance(dancers, input)
    }

    print(dancers.join(""))
}

print("processing...")
solve()
solve2()
