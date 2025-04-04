# Use an official Node.js runtime as a base image
FROM node:18-alpine 

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Use Nginx to serve the built frontend
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
