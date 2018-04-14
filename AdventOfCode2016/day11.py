from itertools import combinations, chain, product
from collections import deque
from timeit import timeit

def chipgenTuple(chips="", gens=""):
	return "".join(sorted(chips)), "".join(sorted(gens))

initial = (
	chipgenTuple("t", "tls"),
	chipgenTuple("ls"),
	chipgenTuple("pr", "pr"),
	chipgenTuple()
)

objective = (
	chipgenTuple(),
	chipgenTuple(),
	chipgenTuple(),
	chipgenTuple("tlspr", "tlspr")
)

def move(state, fr, to, chips="", gens=""):
	floorFr = ("".join(sorted(c for c in state[fr][0] if c not in chips)),
			   "".join(sorted(g for g in state[fr][1] if g not in gens)))
	floorTo = ("".join(sorted(state[to][0]+chips)),
			   "".join(sorted(state[to][1]+gens)))
	new = list(state)
	new[fr], new[to] = floorFr, floorTo
	return tuple(new)

def hashed(state):
	ret = []
	for chips, gens in state:
		sChips, sGens = set(chips), set(gens)
		loneChips, loneGens = sChips - sGens, sGens - sChips
		loneChips, loneGens = "".join(sorted(loneChips)), "".join(sorted(loneGens))
		nPairs = str(len(sChips & sGens))
		ret.append((nPairs+loneChips, nPairs+loneGens))
	return tuple(ret)

def valid(floor):
	chips, gens = floor
	return gens=="" or all(chip in gens for chip in chips)

def push(fr, to, state, Q, S, path):
	if valid(state[fr]) and valid(state[to]):
		hsh = hashed(state)	 
		if (to, hsh) not in S:
			Q.append((to, state, path))
			S.add((to, hsh))

def combs(floor):
    chips, gens = floor
    for cComb, gComb in product(chips, gens):
        yield cComb, gComb
    for cComb in chain(("".join(e) for e in combinations(chips, 2)), chips):
        yield cComb, ""
    for gComb in chain(("".join(e) for e in combinations(gens, 2)), gens):
        yield "", gComb
    

def searchPath(initial, objective):
	Q, S = deque([(0, initial, [])]), set((0,initial))
	while Q:
		fr, state, path = Q.popleft()
		path = path[:]
		path.append(state)
		if state==objective:
			return path
		for to in (min(3, fr+1), max(0, fr-1)):
			for chips, gens in combs(state[fr]):
				new = move(state, fr, to, chips=chips, gens=gens)
				push(fr, to, new, Q, S, path)
	return []

def search(initial, objective):
	Q, S = deque([(0, initial, -1)]), set((0,initial))
	while Q:
		fr, state, steps = Q.popleft()
		steps += 1
		if state==objective:
			return steps
		for to in (min(3, fr+1), max(0, fr-1)):
			for chips, gens in combs(state[fr]):
				new = move(state, fr, to, chips=chips, gens=gens)
				push(fr, to, new, Q, S, steps)
	return []

def parte1Path():
	path = searchPath(initial, objective)
	for e in path:
		print(e)
	print("N steps: ", len(path) - 1)

def parte1():
	print(search(initial, objective))

initial2 = (
	chipgenTuple("ted", "tlsed"),
	chipgenTuple("ls"),
	chipgenTuple("pr", "pr"),
	chipgenTuple()
)

objective2 = (
	chipgenTuple(),
	chipgenTuple(),
	chipgenTuple(),
	chipgenTuple("tlspred", "tlspred")
)

def parte2():
	print(search(initial2, objective2))
	# for e in path:
	# 	print(e)
	# print("N steps: ", len(path) - 1)

parte1Path()
parte1()
parte2()