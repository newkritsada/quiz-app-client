# FROM node:14.1-alpine AS BUILD_IMAGE

# # RUN apk update && apk add python make g++ && rm -rf /var/cache/apk/*

# RUN mkdir -p /usr/app
# WORKDIR /usr/app

# # COPY package.json /usr/app
# COPY . /usr/app

# RUN npm install

# # FROM node:14.1-alpine

# # RUN mkdir -p /usr/app
# # WORKDIR /usr/app

# # COPY --from=BUILD_IMAGE /usr/app/node_modules ./node_modules
# # COPY . /usr/app

# EXPOSE 3000

# CMD ["npm","run","dev"]

# Base on offical Node.js Alpine image
FROM node:12.10.0-alpine

RUN mkdir /usr/app
# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install 

# Copy all files
COPY ./ ./

# Build app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
# USER node

# Run npm start script when container starts
CMD ["npm", "run", "production"]
