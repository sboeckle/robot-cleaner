# dockerfile
FROM node:14.16.0-alpine3.10
WORKDIR /app

COPY . /app
# prepare environment and dependencies
ENV PATH ./node_modules/.bin:$PATH

COPY package.json /app
RUN npm install

USER node

CMD ["npm", "start"]