from hashlib import md5
from pathlib import Path
from timeit import timeit

salt = "zpqevtbw"
hexs = [md5((salt+str(i)).encode("utf8")).hexdigest() for i in range(30000)]

trips = [l*3 for l in "0123456789abcdef"]
def firstTriplet(mdstr):
	idxs = [mdstr.find(trip) for trip in trips]
	idxs = [i for i in idxs if i != -1]
	if idxs:
		return mdstr[min(idxs)]
	
def keys():
	nKeys = 0
	for index, mdstr in enumerate(hexs):
		letter = firstTriplet(mdstr)
		if letter:
			five = letter*5
			for nxt in range(index+1, index+1001):
				if five in hexs[nxt]:
					nKeys += 1
					print("{}th key found '{}': 3({}), 5({})".format(
						nKeys, letter, index, nxt))
		if nKeys==64:
			return

def parte1():
	keys()

def parte2():
	for index, mdstr in enumerate(hexs):
		for _ in range(2016):
			mdstr = md5(mdstr.encode("utf8")).hexdigest()
		hexs[index] = mdstr
	keys()

print(timeit("parte2()", setup="from __main__ import parte2", number=1))


