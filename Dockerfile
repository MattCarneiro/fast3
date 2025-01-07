# Use Node.js 18 Alpine image for smaller size
    FROM node:18-alpine

    # Set working directory
    WORKDIR /app

    # Copy package files
    COPY package*.json ./

    # Install production dependencies only
    RUN npm install --production

    # Copy application code
    COPY . .

    # Expose port
    EXPOSE 3000

    # Start application
    CMD ["npm", "start"]
