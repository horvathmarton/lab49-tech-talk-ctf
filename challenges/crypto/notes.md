# Bash
for i in {1..48}; do base64 -d base64-48 > base64-48-2; mv base64-48-2 base64-48; echo $i; done

# Node
fs = require('fs')
ct = fs.readFileSync('base64-48','utf8')
for(let i=0; i<48; i++){
ct=Buffer.from(ct, 'base64').toString('binary')
}
console.log(ct)

# Python 
import base64
with open('base64-48','rb') as f:
    ct=f.read()
for i in range(48):
    ct = base64.b64decode(ct)
print(ct)
