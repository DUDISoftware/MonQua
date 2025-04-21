const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const DatabaseConnection = require("./configs/database");
const config = require("./configs/setting.json");
const mongoose = require("mongoose");
const { seedDefaultRoles } = require("./models/role"); // Sử dụng hàm từ models/role

const app = express();

// Kết nối tới MongoDB
(async () => {
    try {
        const client = DatabaseConnection.getMongoClient();
        await client.connect();
        console.log("Kết nối MongoDB thành công!");

        // Kết nối Mongoose
        await mongoose.connect(client.s.url, {
            dbName: config.mongodb.database
        });
        console.log("Kết nối Mongoose thành công!");

        // Tạo dữ liệu role mặc định
        await seedDefaultRoles();

        app.locals.dbClient = client;
    } catch (error) {
        console.error("Kết nối MongoDB thất bại:", error);
        process.exit(1);
    }
})();

// Khởi động server backend
const server = app.listen(5000, function () {
    console.log("Mở http://localhost:5000 để kiểm tra API hoạt động.");
});