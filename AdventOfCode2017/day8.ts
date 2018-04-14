import { readFileSync } from 'fs'
const print = console.log.bind(console)

function fileToLines(filename: string) {
	return readFileSync(filename, "utf8").trim().split("\n").map(line => line.trim().split(' '))
}

function getDefault(key: string, M: Map<string, number>) {
	const value = M.get(key);
	if (value === null || value === undefined) {
		M.set(key, 0)
		return 0
	} else {
		return value
	}
}

function compare(a: number, comp: string, b: number) {
	if (comp === "==") return a == b
	else if (comp === "!=") return a != b
	else if (comp === "<") return a < b
	else if (comp === "<=") return a <= b
	else if (comp === ">") return a > b
	else if (comp === ">=") return a >= b
}

function solve(filename: string) {
	const input = fileToLines(filename)
	const M: Map<string, number> = new Map()

	let maxValue = -999999
	let maxReg = "none yet"

	//['a','dec','9','if','b','>=','200']
	for (const [reg, mode, by, , cond, comp, to] of input) {
		const regVal = getDefault(reg, M)
		if (regVal > maxValue) {
			maxValue = regVal
			maxReg = reg
		}
		const condVal = getDefault(cond, M)
		if (compare(condVal, comp, Number(to))) {
			const byVal = mode === "dec" ? Number(by) * -1 : Number(by)
			M.set(reg, regVal + byVal)
		}
	}
	print([...M.entries()].sort(([, a], [, b]) => b - a))
	print("max ever: ", maxReg, maxValue)
}

solve("day8.txt")