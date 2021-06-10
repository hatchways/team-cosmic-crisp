FROM node:14.13.0-alpine
WORKDIR /app
COPY ./server/package*.json ./
RUN npm install
COPY ./server ./
RUN npm install --prefix client
RUN npm run build --prefix client
EXPOSE 5002
CMD [ "npm","start" ]
