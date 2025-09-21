# Simple Backend Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src ./src
COPY server.js ./

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]