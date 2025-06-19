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

// Lấy danh sách người dùng (Role Admin)
router.get("/users-list", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.json({
            error: 0,
            error_text: "Lấy danh sách người dùng thành công!",
            data_name: "Danh sách người dùng",
            data: users
        });
    } catch (err) {
        console.error("Lỗi lấy danh sách người dùng:", err.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Danh sách người dùng",
            data: []
        });
    }
});

// Lấy chi tiết người dùng theo ID (Role Admin và user)
router.get("/user-detail/:id", verifyToken, checkMultiRole(["admin", "user"]), async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                error: 404,
                error_text: "Người dùng không tồn tại!",
                data_name: "Chi tiết người dùng",
                data: []
            });
        }
        return res.json({
            error: 0,
            error_text: "Lấy chi tiết người dùng thành công!",
            data_name: "Chi tiết người dùng",
            data: [user]
        });
    } catch (err) {
        console.error("Lỗi lấy chi tiết người dùng:", err.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Chi tiết người dùng",
            data: []
        });
    }
});

// Cập nhật thông tin người dùng (Role Admin và user)
router.put("/update-user/:id", verifyToken, checkMultiRole(["admin", "user"]), async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({
                error: 404,
                error_text: "Người dùng không tồn tại!",
                data_name: "Cập nhật người dùng",
                data: []
            });
        }
        return res.json({
            error: 0,
            error_text: "Cập nhật thông tin người dùng thành công!",
            data_name: "Cập nhật người dùng",
            data: [updatedUser]
        });
    } catch (err) {
        console.error("Lỗi cập nhật thông tin người dùng:", err.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Cập nhật người dùng",
            data: []
        });
    }
});

// Xóa người dùng (Role Admin)
router.delete("/delete-user/:id", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                error: 404,
                error_text: "Người dùng không tồn tại!",
                data_name: "Xóa người dùng",
                data: []
            });
        }
        return res.json({
            error: 0,
            error_text: "Xóa người dùng thành công!",
            data_name: "Xóa người dùng",
            data: [deletedUser]
        });
    } catch (err) {
        console.error("Lỗi xóa người dùng:", err.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Xóa người dùng",
            data: []
        });
    }
});

module.exports = router;