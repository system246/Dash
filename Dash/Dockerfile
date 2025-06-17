# FROM node:18 AS build
 
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# # Assuming your output folder is 'dist' instead of 'build'
# RUN npm run build
 
# # Step 2: Serve the build using Nginx
# FROM nginx:alpine
 
# # Change the path to 'dist' here
# COPY --from=build /app/dist /usr/share/nginx/html
 
# EXPOSE 80
 
# CMD ["nginx", "-g", "daemon off;"]

# Base Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install basic utilities
RUN apk update && apk add --no-cache vim curl net-tools

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the source code
COPY . .

# Expose Vimte dev server port
EXPOSE 3000

# Start Vite dev server, accessible from network
CMD ["npm", "run", "dev", "--", "--host"]