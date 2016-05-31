#!/bin/bash
source /data/env
eval "$(weave env)"

docker build -t laohaowan_website .
docker stop laohaowan_website
docker rm laohaowan_website
docker run -d --name laohaowan_website \
				-p 5109:5000 \
        -e VIRTUAL_HOST="$LAOHAOWAN_VIRTUAL_HOST" \
        laohaowan_website
