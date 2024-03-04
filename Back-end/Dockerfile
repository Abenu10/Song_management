# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and yarn.lock into the working directory
COPY package.json yarn.lock ./

# Install the application dependencies
RUN yarn install

# Bundle the app source inside the Docker image
COPY . .

# Expose port 8800 for the app to be accessible
EXPOSE 8800

# Define the command to run the app
CMD [ "yarn", "start" ]