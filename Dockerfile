# Sử dụng một base image với Node.js
FROM node:20

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies của ứng dụng
RUN npm install

# Sao chép mã nguồn của ứng dụng vào thư mục làm việc
COPY . .

# Expose cổng mà ứng dụng sẽ chạy trên
EXPOSE 3005

# Lệnh để chạy ứng dụng
CMD [ "npm", "run", "start:dev" ]

