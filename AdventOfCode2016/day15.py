def solve(npos, state):
	password  = [(e-i-1)%e for i, e in enumerate(npos)]
	print("Password: ", password)
	i = 0
	while state != password:
		state = [(e+1)%lim for e, lim in zip(state, npos)] 
		i += 1
	print(i)

def fast_solve(npos, state):
	password  = [(e-i-1)%e for i, e in enumerate(npos)]
	maxp, idx = max((p, i) for p, i in zip(npos, range(len(npos))))
	
	i = 0
	while state[idx] != password[idx]:
		state = [(e+1)%lim for e, lim in zip(state, npos)]
		i += 1
	while state != password:
		state = [(e+maxp)%lim for e, lim in zip(state, npos)] 
		i += maxp
	print(i)

def part1():
	npos  = (17, 7, 19, 5, 3, 13)
	state = [ 1, 0,  2, 0, 0, 5]
	fast_solve(npos, state)

def part2():
	npos  = (17, 7, 19, 5, 3, 13, 11)
	state = [ 1, 0,  2, 0, 0, 5, 0]
	fast_solve(npos, state)	

part1()
part2()