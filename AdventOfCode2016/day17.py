from hashlib import md5
from heapq import heappush as push, heappop as pop

dirs = "UDLR"
dopen = "bcdef"
passw = "rrrbmfta"
dval = {'U': -1, 'D': 1, 'L': -1j, 'R': 1j}

def doors_open(path):
	md = md5((passw + path).encode("utf8")).hexdigest()
	return "".join(dirs[i] for i in range(4) if md[i] in dopen)

def search():
	dcost = {'U': 2, 'L': 2, 'D': 1, 'R': 1}
	Q = [] 
	push(Q, (0, "", 0j)) #"detours"(U or L), path, pos
	while Q:
		pr, path, pos = pop(Q)
		if pos == 3+3j:
			return path
		if (pos.real < 0 or pos.real > 3 
			or pos.imag < 0 or pos.imag > 3):
			continue
		for d in doors_open(path):
			push(Q, (pr+dcost[d], path+d, pos+dval[d]))
	return "No path (probably an error...)"

def longestPath():
	dcost = {'U': -5, 'L': -5, 'D': -1, 'R': -1}
	maxpath = ""
	Q = [] 
	push(Q, (0, "", 0j)) #"detours"(U or L), path, pos
	while Q:
		pr, path, pos = pop(Q)
		if pos == 3+3j:
			if len(path) > len(maxpath):
				maxpath = path
			continue
		if (pos.real < 0 or pos.real > 3 
			or pos.imag < 0 or pos.imag > 3):
			continue
		for d in doors_open(path):
			push(Q, (pr+dcost[d], path+d, pos+dval[d]))
	return maxpath

def part1():
	print(search())

def part2():
	print(len(longestPath()))

part2()
