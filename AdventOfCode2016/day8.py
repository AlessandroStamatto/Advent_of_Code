from collections import deque

grid = deque(deque(' ' for _ in range(50)) for _ in range(6))

def rect(width, height):
	for i in range(height):
		for j in range(width):
			grid[i][j] = '#'

def rotRow(i, mag):
	grid[i].rotate(mag)

def rotCol(j, mag):
	for _ in range(mag):
		past = grid[-1][j]
		for i in range(len(grid)):
			grid[i][j], past = past, grid[i][j]

def parse():
	with open("day8.txt") as f:
		for line in f:
			if line[1] == 'e':
				width, height = map(int, line[5:].split('x'))
				rect(width, height)
			else:
				if line[7] == 'r':
					ind, mag = map(int, line[13:].split(" by "))
					rotRow(ind, mag)
				else:
					ind, mag = map(int, line[16:].split(" by "))
					rotCol(ind, mag)

def parte1():
	parse()
	print(sum(sum(1 for e in r if e=='#') for r in grid))

def parte2():
	parse()
	lWidth, lHeight = 5, 6
	for j in range(0, len(grid[0]), lWidth):
		for i in range(lHeight):
			print("".join(list(grid[i])[j:j+lWidth]))
		print(" " * lWidth)
			

parte2()
