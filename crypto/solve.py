import base64

with open('./ciphertext.txt') as f:
    ct=f.read()

for i in range(8):
    ct = base64.b64decode(ct)

print(ct)