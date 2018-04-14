from hashlib import md5
from pathlib import Path
from bisect import bisect as bsearch
from timeit import timeit

triplets = [] #[(letter, index)]
quintuplets = {k:[] for k in "0123456789abcdef"} #letter: [index]

#salt = b"abc%d"
salt = b"zpqevtbw%d"

def add_hash(mdstr, index):
	reps, past, notfound = 0, mdstr[0], True
	addedx5 = set()
	for e in mdstr:
		if e == past:
			reps += 1
			if notfound and reps==3:
				triplets.append((e, index))
				notfound = False
			elif reps==5 and e not in addedx5:
				addedx5.add(e)
				quintuplets[e].append(index)
		else:
			reps = 1
		past = e

def populate(fr, to):
	for index in range(fr, to):
		md = md5(salt % index).hexdigest()
		add_hash(md, index)

def keys():
	keyFounds = 0
	for letter, index in triplets:
		qlist, upper = quintuplets[letter], index+1001

		if not qlist:
			continue
		nxt = bsearch(qlist, upper)-1

		if  index < qlist[nxt] <= upper:
			keyFounds += 1
			print("{}th key found '{}': 3({}), 5({})".format(
				keyFounds, letter, index, qlist[nxt]))
		if keyFounds == 64:
			return

def parte1():
	populate(0, 22500)
	keys()

def populate2016(fr, to):
	for index in range(fr, to):
		md = md5(salt % index).hexdigest()
		for _ in range(2016):
			md = md5(md.encode("ascii")).hexdigest()
		add_hash(md, index)

def parte2():
	populate2016(0, 22500)
	keys()

print(timeit("parte2()", "from __main__ import parte2", number=1))











