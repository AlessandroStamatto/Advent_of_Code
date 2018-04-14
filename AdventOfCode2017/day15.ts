import {} from "fs"
const print = console.log.bind(console)

let aPrev = 699,
    bPrev = 124
const aFactor = 16807,
    bFactor = 48271
function genPair(): boolean {
    ;[aPrev, bPrev] = [
        (aPrev * aFactor) % 2147483647,
        (bPrev * bFactor) % 2147483647
    ]
    return aPrev % 65536 === bPrev % 65536
}

function solve() {
    let total = 0
    for (let i = 0; i < 40000000; ++i) {
        total = genPair() ? total + 1 : total
    }
    print(total)
}

function genPair2(): boolean {
    aPrev = (aPrev * aFactor) % 2147483647
    bPrev = (bPrev * bFactor) % 2147483647
    while (aPrev % 4 !== 0) aPrev = (aPrev * aFactor) % 2147483647
    while (bPrev % 8 !== 0) bPrev = (bPrev * bFactor) % 2147483647

    return aPrev % 65536 === bPrev % 65536
}

function solve2() {
    let total = 0
    for (let i = 0; i < 5000000; ++i) {
        total = genPair2() ? total + 1 : total
    }
    print(total)
}

print("Processing...")
solve2()
