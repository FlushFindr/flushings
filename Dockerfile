# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files into the container at /app
COPY package*.json ./

# Install dependencies in the container
RUN npm install

# Bundle the app source inside the container
COPY . .

# Build your Next.js app for production
RUN npm run build

# Define the command to run the app
CMD ["npm", "start"]

# Expose the port the app runs on
EXPOSE 3000
