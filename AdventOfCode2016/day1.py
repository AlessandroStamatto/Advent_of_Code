from functools import reduce

inp = "L2, L3, L3, L4, R1, R2, L3, R3, R3, L1, L3, R2, R3, L3, R4, R3, R3, L1, L4, R4, L2, R5, R1, L5, R1, R3, L5, R2, L2, R2, R1, L1, L3, L3, R4, R5, R4, L1, L189, L2, R2, L5, R5, R45, L3, R4, R77, L1, R1, R194, R2, L5, L3, L2, L1, R5, L3, L3, L5, L5, L5, R2, L1, L2, L3, R2, R5, R4, L2, R3, R5, L2, L2, R3, L3, L2, L1, L3, R5, R4, R3, R2, L1, R2, L5, R4, L5, L4, R4, L2, R5, L3, L2, R4, L1, L2, R2, R3, L2, L5, R1, R1, R3, R4, R1, R2, R4, R5, L3, L5, L3, L3, R5, R4, R1, L3, R1, L3, R3, R3, R3, L1, R3, R4, L5, L3, L1, L5, L4, R4, R1, L4, R3, R3, R5, R4, R3, R3, L1, L2, R1, L4, L4, L3, L4, L3, L5, R2, R4, L2"
#inp = "R8, R4, R4, R8"
inp = inp.split(', ')

def part1():	
	def acc(args, tn):
		xy, mag = args
		t, n = tn[0], int(tn[1:])
		mag *= 1j if t=='L' else -1j
		return xy+(mag*n), mag

	finalPos = reduce(acc, inp, (0j, 1j))[0]
	print(int(finalPos.real + abs(finalPos.imag)))	

def part2():
	visited = {0j}	
	def acc(args, tn):
		xy, mag = args
		t, n = tn[0], int(tn[1:])
		mag *= 1j if t=='L' else -1j
		for i in range(n):
			xy += mag
			if xy in visited:
				print("Found: ", xy)
				print(int(xy.real + abs(xy.imag)))
				exit()
			visited.add(xy) 
		return xy, mag

	finalPos = reduce(acc, inp, (0j, 1j))[0]
	print("No twice", int(finalPos.real + abs(finalPos.imag)))	

part2()