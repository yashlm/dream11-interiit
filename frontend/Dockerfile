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

# Step 2: Serve the frontend using a simpler static file server
FROM node:18

# Set the working directory for the server
WORKDIR /usr/share/app

# Copy the build folder from the previous image
COPY --from=build /app/dist .

# Install `serve` to serve the static files
RUN npm install -g serve

# Expose port 5000 (or whatever port you want to use)
EXPOSE 5000

# Start the `serve` command to serve the static files
CMD ["serve", "-s", ".", "-l", "5000"]
