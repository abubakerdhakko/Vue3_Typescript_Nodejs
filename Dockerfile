# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy the rest of the application code to the container
COPY . .

# Build TypeScript code to JavaScript
RUN npm run build

# Expose the port that your application will run on
EXPOSE 8080

# Specify the command to run your application
CMD ["node", "dist/index.js"]
