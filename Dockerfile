FROM node:9

WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN npm install
COPY . /usr/src/app/
EXPOSE 5000
CMD ["npm", "start"]