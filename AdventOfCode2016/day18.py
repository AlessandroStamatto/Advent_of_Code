def safe_or_trap(triple):
    if triple in ("^^.", ".^^", "^..", "..^"):
        return '^'
    return '.'

def solve(firstRow, till):
    rows = [firstRow]
    while len(rows) < till:
        lrow = '.' + rows[-1] + '.'
        nrow = "".join([safe_or_trap(lrow[i:i+3]) for i in range(len(lrow)-2)])
        rows.append(nrow)
    return rows
    
def sumall(rows):
    return sum(sum(1 for c in r if c=='.') for r in rows)

inp = "^.^^^.^..^....^^....^^^^.^^.^...^^.^.^^.^^.^^..^.^...^.^..^.^^.^..^.....^^^.^.^^^..^^...^^^...^...^."
def part1():
    print(sumall(solve(inp, 40)))

def part2():
    print(sumall(solve(inp,400000)))

part2()
