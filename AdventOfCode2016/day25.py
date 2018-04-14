from pathlib import Path
from collections import namedtuple

eip = 0
registers = {'a': 0, 'b': 0, 'c': 0, 'd': 0}

instructions = [e.split() for e in Path("day25.txt").read_text().split('\n')]
tam = len(instructions)

def cpy(fr, to):
	if to not in "abcd":
		return
	#print("  copying (", fr, ") to ", to)	
	registers[to] = registers[fr] if fr in "abcd" else int(fr)

def inc(reg):
	if reg not in "abcd":
		return
	#print("  ", reg, " increased to ", registers[reg]+1)
	registers[reg]+=1

def dec(reg):
	if reg not in "abcd":
		return
	#print("  ", reg, " decreased to ", registers[reg]-1)
	registers[reg]-=1

def jnz(cond, offset):
	global eip
	cond = registers[cond] if cond in "abcd" else int(cond)
	offset = registers[offset] if offset in "abcd" else int(offset)
	#print("  ", "Jump cond(", cond, ") jumping to ", eip+int(offset)-1)
	if cond != 0:
		eip += int(offset)-1

toogle = {"inc": "dec", "dec": "inc", "tgl": "inc", "jnz": "cpy", "cpy": "jnz"}
def tgl(reg):
	neip = eip-1 + registers[reg]
	if not(0 <= neip < tam):
		return
	#print("  changing ", instructions[neip][0], " to ", toogle[instructions[neip][0]])
	instructions[neip][0] = toogle[instructions[neip][0]]
	optimize()

def mul(to, a, b):
	registers[to] += registers[a] * registers[b]
	registers[a], registers[b] = 0, 0

def add(to, a):
	registers[to] += registers[a]
	registers[a] = 0 

def nop():
	return

def optimize():
	ins = "".join(e[0][0] for e in instructions)
	while True:
		try:
			idx = ins.index("idjdj")
			to, c, d = instructions[idx][1], instructions[idx+1][1], instructions[idx+3][1]
			instructions[idx:idx+5] = ["nop"],["nop"],["nop"],["nop"],["mul", to, c, d] 
			ins = "".join(e[0][0] for e in instructions) 
		except ValueError:
			break
	while True:
		try:
			idx = ins.index("dij")
			c, to = instructions[idx][1], instructions[idx+1][1]
			instructions[idx:idx+3] = ["nop"], ["nop"], ["add", to, c]
			ins = "".join(e[0][0] for e in instructions) 
		except ValueError:
			break
	#for instruction in instructions:
		#print(instruction)

output, precision = [], 4
def out(a):
	x = 0
	if a in "abcd":
		x = registers[a]
	else:
		x = int(a)
	even = len(output)%2 == 0
	if not(-1 < x < 2) or (x==1 and even) or (x==0 and not even):
		return True
	output.append(x) 
	return len(output)==precision

def execute():
	fetch = {"cpy": cpy, "inc": inc, "dec": dec, 
			 "jnz": jnz, "tgl": tgl, "nop": nop, 
			 "add": add, "mul": mul, "out": out}
	global eip
	global output
	eip, b, c, d, output = 0, 0, 0, 0, []
	while eip < tam:
		instruction, *args = instructions[eip]
		eip+=1
		#print(instruction, args)
		if fetch[instruction](*args):
			return output

def parte1():
	global precision
	optimize()
	num, precision = 0, 8

	goal = [0,1] * (precision//2)
	registers['a'] = num	
	while execute() != goal:
		num += 1
		registers['a'] = num
		if num%100 == 0:
			print(num)
	print(num, output)
	
parte1()