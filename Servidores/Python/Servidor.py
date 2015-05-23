
import requests
import json


while(True):
	
	r = requests.get('http://localhost:3000/part/4')
	print r.text