FROM node:16.20.2
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm", "run", "start-prod" ]