FROM node:18-alpine as development

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 8080

# Start development server
CMD ["npm", "run", "dev"]

# Production stage
FROM node:18-alpine as production

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built assets
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 8080

# Start production server
CMD ["npm", "start"]
