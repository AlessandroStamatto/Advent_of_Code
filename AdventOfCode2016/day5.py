from hashlib import md5

inp = "wtnhxymk"
#inp = "abc"

def parte1():
	i, index, psw = 0, 0, []
	while i < 8:
		md = md5((inp + str(index)).encode("utf-8")).hexdigest()
		if md.startswith("00000"):
			psw.append(md[5])
			i += 1
		index += 1
	print("".join(psw))

def parte2():
	i, index, psw = 0, 0, ['_']*8
	while i < 8:
		md = md5((inp + str(index)).encode("ascii")).hexdigest()
		if md.startswith("00000"):
			pos, v = int(md[5], 16), md[6]
			if -1 < pos < 8 and psw[pos]=='_':
				psw[pos] = v
				i += 1
		index += 1
	print("".join(psw))


parte2()