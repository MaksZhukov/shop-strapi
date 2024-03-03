FROM node:18.0.0-alpine
RUN apk --no-cache add git
RUN git clone https://github.com/MaksZhukov/shop-strapi.git
WORKDIR /shop-strapi
# RUN git reset --hard
COPY .env ./
RUN npm install -f
ENV NODE_ENV production
RUN npm run build
EXPOSE 1337
CMD [ "node", "server.js" ]