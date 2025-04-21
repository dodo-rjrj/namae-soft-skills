FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN ls -la /app
RUN npm run build

RUN ls -la /app/dist

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80