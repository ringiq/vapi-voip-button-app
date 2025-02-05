# Use official Node.js runtime
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Ensure `.next` folder is included
RUN cp -r .next /app/.next

# Expose the port
EXPOSE 3000

# Start the application in standalone mode
CMD ["node", ".next/standalone/server.js"]
