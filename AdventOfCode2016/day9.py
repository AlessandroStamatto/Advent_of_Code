from pathlib import Path

def decompressV1():
	compressed = Path("day9.txt").read_text()
	ans, i, tam = [], 0, len(compressed)
	while i < tam:
		op = compressed.find('(', i)
		if op==-1:
			ans.append(compressed[i:])
			break
		else:
			ans.append(compressed[i:op])
		cl = compressed.find(')', op)
		num, reps = map(int, compressed[op+1:cl].split('x'))
		ans.append(compressed[cl+1:cl+1+num] * reps)
		i = cl+1+num
	return "".join(ans)

def parte1():
	print(len(decompressV1()))
		
def decompressV2(compressed):
	op = compressed.find('(')
	if op==-1:
		return len(compressed)
	cl = compressed.find(')')
	num, reps = map(int, compressed[op+1:cl].split('x'))
	return (op 
		+ decompressV2(compressed[cl+1:cl+1+num])*reps
		+ decompressV2(compressed[cl+1+num:]))

def parte2():
	compressed = Path("day9.txt").read_text()
	print(decompressV2(compressed))

parte2()