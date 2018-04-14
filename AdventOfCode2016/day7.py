from pathlib import Path
from re import split

def abba(s):
	for i in range(len(s)-3):
		if (    s[i] == s[i+3] 
			and s[i+1] == s[i+2]
			and s[i] != s[i+1]):
			return True
	return False

def validTLS(ss):
    abbaNet = any(abba(ss[i]) for i in range(0,len(ss),2))
    abbaHyper = any(abba(ss[i]) for i in range(1,len(ss), 2))
    return abbaNet and not abbaHyper

def parte1():
	inp = Path("day7.txt").read_text().split('\n')
	print(sum( validTLS(split("\[|\]", line)) for line in inp ) )

def aba(s):
	return {s[i:i+2] for i in range(len(s)-2) if s[i]==s[i+2] and s[i]!=s[i+1]}

def bab(s, abas):
	for i in range(len(s)-2):
		if s[i]!=s[i+1] and s[i]==s[i+2] and s[i+1:i+3] in abas:
			return True
	return False

def validSSL(ss):
    abas =  aba(".".join( ss[i] for i in range(0, len(ss), 2)))
    return any(bab(ss[i], abas) for i in range(1, len(ss), 2))

def parte2():
	inp = Path("day7.txt").read_text().split('\n')
	print(sum( validSSL(split("\[|\]", line)) for line in inp ) )

parte2()