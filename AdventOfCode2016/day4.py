from collections import Counter
from string import ascii_lowercase

def valid(): 
	with open("day4.txt") as f:
		for line in f:
			dash, square, end = line.rfind('-'), line.rfind('['), line.rfind(']')
			enc = line[:dash].replace('-', ' ')
			sid, check = line[dash+1:square], line[square+1:end]
			freqs = Counter(enc)
			del freqs[' ']
			freqs = sorted(freqs.most_common(26),
				key=lambda t: (t[1],-ord(t[0])), reverse=True)[:5]
			if check == "".join((l for l,_ in freqs)):
				yield enc, int(sid)

def parte1():
	print(sum(sid for _,sid in valid()))

itol = dict(zip(range(26), ascii_lowercase))
def translated():
	for enc, sid in valid():
		m = {itol[i]:itol[(i+sid)%26] for i in range(26)}
		m[' '] = ' '
		table = str.maketrans(m)
		yield enc.translate(table), sid

def parte2():
	for trans, sid in translated():
		if "pole" in trans:
			print(sid)

parte2()