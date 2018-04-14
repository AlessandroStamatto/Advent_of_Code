from pathlib import Path
from heapq import heappush as push, heappop as pop
from functools import lru_cache
from itertools import permutations

grid, positions = [], {}
def parse():
	global grid
	grid = Path("day24.txt").read_text().split('\n')
	for i in range(len(grid)):
		for j in range(len(grid[0])):
			if grid[i][j].isdigit():
				positions[grid[i][j]] = (i, j)

@lru_cache()
def bfs(start, goal):
	global grid
	dirs = {'U': -1, 'D': 1, 'L': -1j, 'R': 1j}

	Q, S = [], {start}
	push(Q, (0, start, "" )) #len(path), pos, path

	while Q:
		lpath, (i, j), path = pop(Q)
		if (i, j) == goal:
			return len(path)
		for d, v in dirs.items():
			npos = (i + j*1j) + v
			ni, nj = int(npos.real), int(npos.imag)
			if (0 <= ni < len(grid) and 0 <= nj < len(grid[0]) and 
			grid[ni][nj] != '#' and (ni, nj) not in S):
				S.add((ni, nj))
				npath = path + d
				push(Q, (len(npath), (ni, nj), npath))

parse()

def part1():
	chars = "".join(str(c) for c in range(1, len(positions)))
	minp = 99999999
	for p in permutations(chars):
		p = "".join(c for c in p)
		start, newp = positions['0'], 0
		for end in [positions[c] for c in p]:
			newp += bfs(start, end)
			start = end
		minp = min(minp, newp)
	return minp


def part2():
	chars = "".join(str(c) for c in range(1, len(positions)))
	minp = 99999999
	for p in permutations(chars):
		p = "".join(c for c in p) + '0'
		start, newp = positions['0'], 0
		for end in [positions[c] for c in p]:
			newp += bfs(start, end)
			start = end
		minp = min(minp, newp)
	return minp
	

print(part1())
