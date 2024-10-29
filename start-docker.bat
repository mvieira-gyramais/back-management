docker-compose.exe up -d

timeout 30

docker.exe exec mongodb-teste /bin/bash /scripts/mongo-init.sh