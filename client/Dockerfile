FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NODE_ENV=development  

RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

ENV NODE_ENV=development  

EXPOSE 3000
