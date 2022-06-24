docker run --name nginx --rm -p80:80 -d -v ${PWD%/*}:/usr/share/nginx/html:ro -v  $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx 
