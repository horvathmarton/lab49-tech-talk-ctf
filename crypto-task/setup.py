import base64
pt = b'LAB49{SOME_FAKE_FLAG}'
ct=pt
for i in range(48):
    ct = base64.b64encode(ct);
with open('base64-48','wb') as f:
    f.write(ct)
