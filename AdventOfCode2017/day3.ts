import { readFileSync } from 'fs'

const input = 325489
const abs = Math.abs
const print = console.log.bind(console)

function solve(N: number) {
    const RIGHT = 0, UP = 1, LEFT = 2, DOWN = 3
    let i = 0, j = 0, ring = 1, dir = RIGHT, num = 1

    while (num < N) {
        //console.log(`${num} : ${i}|${j}`)
        if (dir === RIGHT) {
            if (j + 1 <= ring) {
                ++j; ++num;
                continue
            }
        } else if (dir === UP) {
            if (abs(i - 1) <= ring) {
                --i; ++num;
                continue
            }
        } else if (dir === LEFT) {
            if (abs(j - 1) <= ring) {
                --j; ++num;
                continue
            }
        } else if (dir === DOWN) {
            if (i + 1 <= ring) {
                ++i; ++num;
                continue
            }
        }

        dir = (dir + 1) % 4
        if (dir === RIGHT)
            ++ring

    }

    print(abs(i) + abs(j))
}

function neighborhoodSum(M: Map<string, number>, i: number, j: number): number {
    const i_1 = (i - 1) + ''
    const i_ = i + ''
    const ip1 = (i + 1) + ''
    const j_1 = (j - 1) + ''
    const j_ = j + ''
    const jp1 = (j + 1) + ''

    return (M.get(i_1 + "_" + j_1) || 0) +
        (M.get(i_1 + "_" + j) || 0) +
        (M.get(i_1 + "_" + jp1) || 0) +
        (M.get(i + "_" + j_1) || 0) +
        (M.get(i + "_" + jp1) || 0) +
        (M.get(ip1 + "_" + j_1) || 0) +
        (M.get(ip1 + "_" + j) || 0) +
        (M.get(ip1 + "_" + jp1) || 0)
}

function solve2(N: number) {
    const RIGHT = 0, UP = 1, LEFT = 2, DOWN = 3
    let i = 0, j = 0, ring = 1, dir = RIGHT, num = 1
    const matrix = new Map()
    matrix.set(0 + "_" + 0, 1)

    let total = 1
    while (total <= N) {
        if (dir === RIGHT) {
            if (j + 1 <= ring) {
                ++j; total = neighborhoodSum(matrix, i, j);
                matrix.set(i + "_" + j, total)
                continue
            }
        } else if (dir === UP) {
            if (abs(i - 1) <= ring) {
                --i; total = neighborhoodSum(matrix, i, j);
                matrix.set(i + "_" + j, total)
                continue
            }
        } else if (dir === LEFT) {
            if (abs(j - 1) <= ring) {
                --j; total = neighborhoodSum(matrix, i, j);
                matrix.set(i + "_" + j, total)
                continue
            }
        } else if (dir === DOWN) {
            if (i + 1 <= ring) {
                ++i; total = neighborhoodSum(matrix, i, j);
                matrix.set(i + "_" + j, total)
                continue
            }
        }

        dir = (dir + 1) % 4
        if (dir === RIGHT)
            ++ring

    }

    print(total)
}

solve2(input)