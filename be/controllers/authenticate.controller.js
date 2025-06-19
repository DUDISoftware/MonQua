const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken.middleware");
const checkRole = require("../middleware/checkRole.middleware");
const { checkMultiRole } = require("../middleware/checkRole.middleware");
const userService = require("../services/user.Service");

// Đăng ký bằng email/password
router.post("/register", async (req, res) => {
    try {
        const userData = await userService.registerUser(req.body);
        return res.status(201).json({
            error: 0,
            error_text: "Đăng ký thành công!",
            data_name: "Thông tin người dùng",
            data: [userData]
        });
    } catch (err) {
        console.error("Lỗi đăng ký:", err.message);
        const statusCode = err.message.includes("Email đã tồn tại") ? 409 :
            err.message.includes("Thiếu thông tin") ? 400 : 500;

        return res.status(statusCode).json({
            error: statusCode,
            error_text: err.message || "Lỗi server!",
            data_name: "Thông tin người dùng",
            data: []
        });
    }
});

// Đăng nhập bằng email/password
router.post("/login", async (req, res) => {
    try {
        const requestInfo = {
            ip: req.ip,
            userAgent: req.headers['user-agent'] || ''
        };

        const userData = await userService.loginUser(req.body, requestInfo);

        return res.json({
            error: 0,
            error_text: "Đăng nhập thành công!",
            data_name: "Thông tin người dùng",
            data: [userData]
        });
    } catch (err) {
        console.error("Lỗi đăng nhập:", err.message);

        let statusCode = 500;
        if (err.message.includes("Sai email hoặc mật khẩu")) {
            statusCode = 401;
        } else if (err.message.includes("Tài khoản chưa xác thực") || err.message.includes("Tài khoản đã bị khóa")) {
            statusCode = 403;
        }

        return res.status(statusCode).json({
            error: statusCode,
            error_text: err.message || "Lỗi server!",
            data_name: "Thông tin người dùng",
            data: []
        });
    }
});

// Đăng nhập bằng Google OAuth
router.post("/google-login", async (req, res) => {
    try {
        const { id_token } = req.body;
        if (!id_token) {
            return res.status(400).json({
                error: 400,
                error_text: "Thiếu id_token!",
                data_name: "Thông tin người dùng",
                data: []
            });
        }

        const requestInfo = {
            ip: req.ip,
            userAgent: req.headers['user-agent'] || ''
        };

        const userData = await userService.loginWithGoogle(id_token, requestInfo);

        return res.json({
            error: 0,
            error_text: "Đăng nhập Google thành công!",
            data_name: "Thông tin người dùng",
            data: [userData]
        });
    } catch (err) {
        console.error("Lỗi đăng nhập Google:", err.message);
        return res.status(401).json({
            error: 401,
            error_text: "Token Google không hợp lệ!",
            data_name: "Thông tin người dùng",
            data: []
        });
    }
});

// Test token
router.get("/test-security", verifyToken, (req, res) => {
    return res.json({
        error: 0,
        error_text: "Token hợp lệ!",
        data_name: "Kiểm tra bảo mật",
        data: [req.userData.user]
    });
});

module.exports = router;