FROM node:12.2.0-alpine as builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80

# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/*

COPY ./nginx/default.conf /etc/nginx/conf.d
COPY --from=builder /app/build  /usr/share/nginx/html

# Start nginx in the foreground to play nicely with Docker.
CMD ["nginx", "-g", "daemon off;"]
