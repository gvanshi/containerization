# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the React app
COPY . .

# Build the React application
RUN npm run build

# Use NGINX to serve the built app
FROM nginx:stable-alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
