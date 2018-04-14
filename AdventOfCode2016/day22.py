from pathlib import Path
from collections import namedtuple
from itertools import product

inp = Path("day22.txt").read_text().split('\n')[2:]
inp = [e.strip().split() for e in inp]

Node = namedtuple("Node", ("used", "avail"))

dimi, dimj = 29, 33
grid = [[Node(0,0) for _ in range(dimj)] for _ in range(dimi)]
minsize = 100
def parse():
	global minsize
	for nod, size, used, avail, use in inp:
		hifen = nod.rindex('-')
		x = int(nod[16:hifen])
		y = int(nod[hifen+2:])
		minsize = min(minsize, int(size[:-1]))
		used = int(used[:-1])
		avail = int(avail[:-1])
		grid[y][x] = Node(used, avail)
        
def valid(fri,frj , toi,toj):
    if ((fri,frj) != (toi, toj)
    	   and grid[fri][frj].used
    	   and grid[fri][frj].used <= grid[toi][toj].avail):
        return True
    
def part1():
    parse()
    prod = product(range(dimi), range(dimj), range(dimi), range(dimj))
    s = sum(1 for i1,j1 , i2,j2 in prod if valid(i1,j1 , i2,j2))
    print(s)

empty = 0j 
def make_table():
	global empty
	parse()
	pretty = [['.' for _ in range(dimj)] for _ in range(dimi)]
	pretty[0][dimj-1] = 'G'
	for i in range(dimi):
		for j in range(dimj):
			if grid[i][j].used == 0:
				pretty[i][j] = '_'
				empty = i + 1j*j
			elif grid[i][j].used > minsize:
				pretty[i][j] = '#'
	return pretty[:15]

#Help doing by hand ;)
def part2():
	steps = 0
	dirs = {'a': -1j, 'd': 1j, 'w': -1, 's': 1}
	table = make_table()
	global empty
	for e in table:
		print("".join(e))
	print("Steps: ", steps)
	while True:
		d = input()[:1]
		if d not in dirs:
			continue
		npos = empty + dirs[d]
		oi, oj = int(empty.real), int(empty.imag)
		ni, nj = int(npos.real), int(npos.imag)
		if 0 <= ni < 15 and 0 <= nj < dimj and table[ni][nj] != '#':
			table[oi][oj], table[ni][nj] = table[ni][nj], table[oi][oj]
			steps += 1
			empty = ni + nj*1j
		for e in table[:ni+2]:
			print("".join(e))
		print("Steps: ", steps)

part2()
    

