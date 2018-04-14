from collections import Counter

inp = """eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar""".split()

def parte1():
	with open("day6.txt") as f:
		transpose = zip(*f)
		g = (Counter(e).most_common(1)[0][0] for e in transpose)
		print("".join(g))

def parte2():
	with open("day6.txt") as f:
		transpose = zip(*f)
		g = (Counter(e).most_common()[-1][0] for e in transpose)
		print("".join(g))

parte2()