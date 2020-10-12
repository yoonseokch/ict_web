FROM node:12

WORKDIR /usr/src/app

COPY ./build .

RUN npm i -g serve

EXPOSE 3000

CMD ["serve", "-s", "."]
