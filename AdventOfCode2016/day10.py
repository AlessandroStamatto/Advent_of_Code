from pathlib import Path
from collections import defaultdict

def parse():
	bots = defaultdict(list)
	f = [e.split() for e in Path("day10.txt").read_text().split('\n')]
	for line in f:
		if line[0][0] == 'v':
			bots[int(line[-1])].append(int(line[1]))
			line.clear()
	return [
	[int(e[1]), int(e[6]), int(e[11]), 
	 e[5][0]=='o', e[10][0]=='o'] 
	 for e in f if e], bots

def execute(f, bots):
	resp = {}
	while f:
		for line in f:
			fr, lowTo, highTo, lowOut, highOut = line
			if lowOut: lowTo = str(lowTo)
			if highOut: highTo = str(highTo)
			coins = bots[fr]
			if len(coins) == 2:
				low, high = min(coins), max(coins)
				bots[fr].clear()
				bots[lowTo].append(low)
				bots[highTo].append(high)
				resp[(low, high)] = fr
				line.clear()
		f = [e for e in f if e]
	return resp  

def parte1():
	f, bots = parse()
	resp = execute(f, bots)
	print(resp[(17, 61)])

def parte2():
	f, bots = parse()
	resp = execute(f, bots)
	print(bots['0'][0]*bots['1'][0]*bots['2'][0])

parte1()
parte2()