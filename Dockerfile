# Use a Node.js base image to build the application
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install http-server globally
RUN npm install -g http-server


# Expose port 8080
EXPOSE 8080

# Serve the build directory using http-server
CMD ["http-server", "dist", "-p", "8080"]
