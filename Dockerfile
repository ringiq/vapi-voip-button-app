# Use the official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Copy standalone output and static assets
RUN mkdir -p /app/.next/static && cp -r .next/static /app/.next/static
RUN mkdir -p /app/public && cp -r public /app/public

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", ".next/standalone/server.js"]
