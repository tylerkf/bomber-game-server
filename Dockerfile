FROM node:8

ADD ./ /usr/local
WORKDIR /usr/local

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]
