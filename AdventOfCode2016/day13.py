from collections import deque

def make_matrix(magic):
	def is_wall(x, y):
		num = (x*x + 3*x + 2*x*y + y + y*y) + magic
		return sum(map(int, bin(num)[2:])) % 2 == 1
	return [
		['#' if is_wall(x, y) else '.' 
			for x in range(52)
		] 
		for y in range(52)
	]

def search(initial, objective, matrix):
	Q, S = deque(), set()
	Q.append( (initial, []) ), S.add(initial)
	while Q:
		pos, path = Q.popleft()
		path = path[:]
		path.append(pos)
		if pos == objective:
			return path
		xm, ym = pos
		positions = ( (xm, min(50, ym+1)), (xm, max(0, ym-1)), 
			(min(50, xm+1), ym), (max(0, xm-1), ym) ) 
		for x, y in positions:
			if matrix[y][x] == '.' and (x, y) not in S:
				Q.append(((x, y), path))
				S.add((x, y))
	return []

def parte1():
	m = make_matrix(1350)
	p = search((1,1), (31, 39), m)
	print(p)
	print("n.steps: ", len(p)-1)

def locations(initial, matrix):
	Q, S = deque(), set()
	Q.append( (initial, -1) ), S.add(initial)
	while Q:
		pos, steps = Q.popleft()
		steps += 1
		if steps==50:
			S.add(pos)
			continue
		xm, ym = pos
		positions = ( (xm, min(50, ym+1)), (xm, max(0, ym-1)), 
			(min(50, xm+1), ym), (max(0, xm-1), ym) ) 
		for x, y in positions:
			if matrix[y][x] == '.' and (x, y) not in S:
				Q.append(((x, y), steps))
				S.add((x, y))
	return S

def parte2():
	m = make_matrix(1350)
	print(len(locations((1, 1), m)))

parte2()