from timeit import timeit
from collections import deque

def solve(num):
	elfs = list(zip(range(1, num+1), [1] * num))
	while len(elfs) != 1:
		for i in range(len(elfs)):
			elf, presents = elfs[i]
			if presents:
				j = (i+1)%len(elfs)
				nElf, nPresents = elfs[j]
				elfs[i] = (elf, presents + nPresents)
				elfs[j] = (nElf, 0)
		elfs = [(elf, presents) for elf, presents in elfs if presents > 0]
	return elfs[0][0] 

def part1():
	print(timeit("print(solve(3014603))", "from __main__ import solve", number=1))

def solve2slow(num):
	elfs = list(zip(range(1, num+1), [1] * num))
	i = 0
	while len(elfs) != 1:
		i %= len(elfs)
		j = (i + len(elfs)//2)%len(elfs) #across the circle
		elf, pres = elfs[i]
		lelf, lpres = elfs[j]
		elfs[i] = (elf, pres+lpres)
		i = (i+1) % len(elfs)
		del elfs[j]
		#print("{} gets {} presents: {}({})".format(elf, lelf, i, elfs))
	return elfs[0][0]

def solve2(num):
	elfs = deque(range(1, num+1))
	elfs.rotate(-(len(elfs)//2))
	elfs.popleft()
	while len(elfs) > 1:
		if len(elfs) % 2 == 0:
			elfs.rotate(-1)
		elfs.popleft()
	return elfs.popleft()

def part2():
	print(timeit("print(solve2(3014603))", "from __main__ import solve2", number=1))

part2()