from pathlib import Path
from bisect import bisect as bsearch

def valid(i, ranges):
	for fr, to in ranges:
		if fr <= i <= to:
			return False
	if i < 4294967296:
		return True

def solve():
	ranges = sorted(tuple(int(c) for c in e.split('-')) 
		     for e in Path("day20.txt").read_text().split())
	i = 0
	for fr, to in ranges:
		if i < fr and valid(i, ranges):
			return i
		i = to+1
	return i

def part1():
	print(solve())

def solve2():
	ranges = sorted(tuple(int(c) for c in e.split('-')) 
		     for e in Path("day20.txt").read_text().split())
	candidates = [0] + [to+1 for _, to in ranges]
	s = 0
	for e in candidates:
		i = e
		while valid(i, ranges):
			s += 1
			i += 1
	return s

def part2():
	print(solve2())

part2()