.PHONY: lint test

lint:
		npm run lint

test:
		npx vitest run

docker:
		docker build -t docker-demo-front:1.0.0 .