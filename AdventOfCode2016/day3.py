def parte1():
	with open("day3.txt") as f:
		ing=((int(e) for e in l.split()) for l in f) #list of lines of 3 ints
		s = sum(1 for a, b, c in ing if a+b>c and a+c>b and c+b>a)
		print(s)

def parte2():
	with open("day3.txt") as f:
		ing=zip(*((int(e) for e in l.split()) for l in f)) #list of columns of ints
		ing=(e for l in ing for e in l) #flatten to list of ints
		triple = [iter(ing)] * 3 #list with the same iterator 3 times
		ing = zip(*triple) #list of triples, group elements 3 by 3
		s = sum(1 for a, b, c in ing if a+b>c and a+c>b and c+b>a)
		print(s)

parte2()	