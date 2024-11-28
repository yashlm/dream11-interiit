# Step 1: Build the frontend
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package.json frontend/package-lock.json ./

# Clean existing node_modules (in case of cache issues)
RUN rm -rf node_modules && rm package-lock.json

# Install frontend dependencies
RUN npm install

# Copy the entire frontend directory
COPY frontend ./

# Build the frontend using Vite
RUN npm run build

# Step 2: Serve the frontend
FROM nginx:alpine

# Set the working directory for Nginx to serve the build
WORKDIR /usr/share/nginx/html

# Copy the build folder from the previous image
COPY --from=build /app/dist .

# Expose port 80 (default HTTP port)
EXPOSE 80

# Start Nginx to serve the frontend app
CMD ["nginx", "-g", "daemon off;"]
