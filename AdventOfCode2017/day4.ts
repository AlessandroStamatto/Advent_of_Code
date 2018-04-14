import { readFileSync } from 'fs'

let print = console.log.bind(console)

function noDuplicatedWord(passphrase: string[]): boolean {
    let S = new Set(passphrase)
    return passphrase.length === S.size
}

function noDuplicatedAnagram(passphrase: string[]): boolean {
    const anagramedPassphrase = passphrase.map(word =>
        word.split("").sort().join(""))
    return noDuplicatedWord(anagramedPassphrase)
}

function solve(isValid: (s: string[]) => boolean) {
    const fileAsString = readFileSync("day4.txt", "utf8")
    const input = fileAsString.trim().split("\n").map(line => line.trim().split(" "))

    let total = 0
    for (let line of input) {
        total = isValid(line) ? total + 1 : total
    }
    print(total)
}

print("Calculating...")
solve(noDuplicatedAnagram)