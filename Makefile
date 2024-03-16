install:
	npm ci && cd ./frontend && npm ci

deploy:
	npm ci && cd ./frontend && npm run build:deploy

startDev:
	make start-backend & make start-frontend

build:
	npm run build

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	npx start-server -s ./frontend/build 