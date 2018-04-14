from pathlib import Path
from collections import namedtuple

eip = 0
registers = {'a': 0, 'b': 0, 'c': 0, 'd': 0}

instructions = [e.split() for e in Path("day12.txt").read_text().split('\n')]
tam = len(instructions)

def cpy(fr, to):
	registers[to] = registers[fr] if fr in "abcd" else int(fr)

def inc(reg):
	registers[reg]+=1

def dec(reg):
	registers[reg]-=1

def jnz(cond, offset):
	global eip
	cond = registers[cond] if cond in "abcd" else int(cond)
	if cond != 0:
		eip += int(offset)-1

fetch = {"cpy": cpy, "inc": inc, "dec": dec, "jnz": jnz}

def execute():
	global eip
	while eip < tam:
		instruction, *args = instructions[eip]
		eip+=1
		fetch[instruction](*args)

def parte1():
	execute()
	print(registers['a'])

def parte2():
	registers['c'] = 1
	execute()
	print(registers['a'])

parte1()