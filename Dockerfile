# Use an official Node.js runtime as a parent image
FROM node:18.17.1:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Compile TypeScript code
RUN npm run build

# Install PM2 globally
RUN npm install -g pm2

# Expose the port on which your app will run
EXPOSE 3012

# Use PM2 as the process manager
CMD ["pm2-runtime", "dist/index.js"]
