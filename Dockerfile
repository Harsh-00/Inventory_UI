# 1. Use an official Node.js image
FROM node:18-alpine AS build

# 2. Create and set working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json (if you have it) first
COPY package.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the code
COPY . .

ENV VITE_ORDER_ENDPOINT="http://localhost:8001"
ENV VITE_PRODUCT_ENDPOINT="http://localhost:8000"

# 6. Build the UI
RUN npm run build



# 7. Use a lightweight web server like nginx to serve the build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]