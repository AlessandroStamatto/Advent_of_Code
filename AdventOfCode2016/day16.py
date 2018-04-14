from pathlib import Path

def expand(a):
	b = "".join(['0' if e=='1' else '1' for e in reversed(a)])
	return a + "0" + b

def checksum(xs):
	rs = [xs[i] == xs[i+1] for i in range(0,len(xs), 2)]
	while len(rs)%2==0:
		rs = [rs[i] == rs[i+1] for i in range(0,len(rs), 2)]
	return "".join('1' if e else '0' for e in rs)

def dragon_curve(data, dsize):
	while(len(data) < dsize):
		data = expand(data)
	return data

def solve(data, dsize):
	expanded = dragon_curve(data, dsize)
	print(checksum(expanded[:dsize]))

def part1():
	solve("11011110011011101", 272)

def part2():
	solve("11011110011011101", 35651584)

part2()



