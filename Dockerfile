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

# Copy only necessary files
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

# Expose the port Next.js runs on
EXPOSE 3000

# Start the application in standalone mode
CMD ["node", "server.js"]
