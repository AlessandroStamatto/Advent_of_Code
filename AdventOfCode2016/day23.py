from pathlib import Path
from collections import namedtuple

eip = 0
registers = {'a': 0, 'b': 0, 'c': 0, 'd': 0}

instructions = [e.split() for e in Path("day23.txt").read_text().split('\n')]
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


def execute():
	fetch = {"cpy": cpy, "inc": inc, "dec": dec, 
			 "jnz": jnz, "tgl": tgl, "nop": nop, 
			 "add": add, "mul": mul}
	global eip
	while eip < tam:
		instruction, *args = instructions[eip]
		eip+=1
		#print(instruction, args)
		fetch[instruction](*args)

def parte1():
	optimize()
	registers['a'] = 7
	execute()
	print(registers['a'])

def parte2():
	optimize()
	registers['a'] = 12
	execute()
	print(registers['a'])

parte2()