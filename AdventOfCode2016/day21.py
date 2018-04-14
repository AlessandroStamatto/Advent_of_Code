from pathlib import Path
from itertools import permutations

class Scrambler(list):
    def reverse(self, i, j):
        self[i:j+1] = reversed(self[i:j+1])
    
    def rotate(self, off):
        s, tam = list(self), len(self)
        for i,e in enumerate(s):
            self[(i+off)%tam] = e

    def rotate_by_letter(self, a, rvs=False):
    	idx = self.index(a)
    	off = 2 + idx if idx > 3 else 1 + idx
    	if rvs:
    		off *= -1
    	self.rotate(off)

    def swap_pos(self, i, j):
    	self[i], self[j] = self[j], self[i]

    def swap_letter(self, a, b):
    	self.swap_pos(self.index(a), self.index(b))

    def move(self, i, j):
    	a = self.pop(i)
    	self.insert(j, a)

    def answer(self):
    	return "".join(self)

inp = [e.strip().split() for e in Path("day21.txt").read_text().split('\n')]
def solve(start):
	psw = Scrambler(start)
	for cmd1, cmd2, a, *_, b in inp:
		cmd = cmd1 + " " + cmd2
		if cmd == "swap letter":
			psw.swap_letter(a, b)
		elif cmd == "swap position":
			psw.swap_pos(int(a), int(b))
		elif cmd == "move position":
			psw.move(int(a), int(b))
		elif cmd == "reverse positions":
			psw.reverse(int(a), int(b))
		elif cmd == "rotate based":
			psw.rotate_by_letter(b)
		elif cmd == "rotate right":
			psw.rotate(int(a))
		elif cmd == "rotate left":
			psw.rotate(- int(a))
		else:
			print("INVALID COMMAND: ", cmd)
	return psw.answer()

def part1():
	print(solve("abcdefgh"))

def part2():
	for p in permutations("fbgdceah"):
		if solve(p) == "fbgdceah":
			print("".join(p))
			return

part2()