import base64 

with open('./flag.txt', 'rb') as f:
    flag = f.read()

ct = flag

for i in range(8):
    ct = base64.b64encode(ct)

with open('ciphertext.txt','wb') as f:
    f.write(ct)
