import { readFileSync } from "fs"
const print = console.log.bind(console)

function fileToLines(filename: string): string[] {
    return readFileSync(filename, "utf8")
        .trim()
        .split("\n")
        .map(s => s.trim())
}

function solve() {
    const input = fileToLines("day9.txt")[0]
    //input = "{{<a!>},{<a!>},{<a!>},{<ab>}}"
    let inGarbage = false
    let len = input.length,
        cur = 0,
        level = 0,
        total = 0,
        garb = 0

    while (cur < len) {
        if (inGarbage) {
            if (input[cur] === ">") inGarbage = false
            else if (input[cur] === "!") cur += 1
            else garb += 1
        } else {
            if (input[cur] === "{") ++level
            else if (input[cur] === "}") total += level--
            else if (input[cur] === "<") inGarbage = true
        }
        cur += 1
    }
    print(total, garb)
}

solve()
