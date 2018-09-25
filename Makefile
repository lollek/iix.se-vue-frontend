all: build
.PHONY: all

build:
	@sudo docker run --rm -v "$(pwd)":/src mkenney/npm:node-8-debian npm run build
	@sudo docker build -t loll3k/iix.se-vue-frontend .
.PHONY: build

run:
	@sudo docker run -p80:80 --rm -it loll3k/iix.se-vue-frontend
.PHONY: run

dev:
	@sudo docker run --rm -v "$(pwd)":/src mkenney/npm:node-8-debian npm run dev
.PHONY: dev

