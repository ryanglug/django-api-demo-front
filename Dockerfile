# Build the app
FROM node:24.1-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN apk update && apk add build-base

COPY . .

RUN make lint
RUN make test

RUN npm run build


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

