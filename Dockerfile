# base image
FROM node:12.10.0

WORKDIR /app
COPY . .

RUN npm install

CMD ["npm", "run", "production"]
