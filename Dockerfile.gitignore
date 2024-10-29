# Dockerfile cho Vue.js

# Sử dụng Node.js làm base image
FROM node:16

# Tạo và chuyển đến thư mục /app
WORKDIR /app

# Sao chép file package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào /app
COPY . .

# Mở cổng 8080 để chạy ứng dụng
EXPOSE 8081

# Chạy lệnh serve để phát triển ứng dụng Vue.js
CMD ["npm", "run", "serve"]
