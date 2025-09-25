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

# Copy data files (mock database)
COPY data ./data

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "dev"]