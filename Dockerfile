FROM node:22.17-alpine
RUN apk --no-cache add git
RUN git clone https://github.com/MaksZhukov/shop-strapi.git
WORKDIR /shop-strapi
COPY .env ./
RUN npm ci
ENV NODE_ENV production
RUN npm run build
EXPOSE 1337
CMD [ "node", "server.js" ]