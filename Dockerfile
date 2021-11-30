FROM node:alpine as builder
WORKDIR /usr/src/app/frontend
COPY package.json .
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 3000
COPY --from=builder /usr/src/app/frontend/build /usr/share/nginx/html

