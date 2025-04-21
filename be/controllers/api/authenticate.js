const express = require("express");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const config = require("../../configs/setting.json");

const verifyToken = require("../../util/VerifyToken");
const checkRole = require("../../util/checkRole");
const { checkMultiRole } = require("../../util/checkRole");

const UserService = require("../../services/userService");
const userService = new UserService();

const jwtExpirySeconds = 3600;

// Đăng ký
router.post("/register", async (req, res) => {
    try {
        const newUser = await userService.register(req.body);
        res.status(201).json({
            message: " Đăng ký thành công",
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                gender: newUser.gender,
                dob: newUser.dob,
                role: newUser.role,
            },
        });
    } catch (err) {
        console.error(" Lỗi đăng ký:", err.message);
        res.status(400).json({ message: " " + err.message });
    }
});

// Đăng nhập
router.post("/login", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userService.login({ username, email, password });

        const token = jsonwebtoken.sign(
            { user: { _id: user._id, username: user.username, role: user.role } },
            config.jwt.secret,
            { expiresIn: jwtExpirySeconds }
        );

        res.json({
            message: "Đăng nhập thành công",
            user: { _id: user._id, username: user.username, email: user.email, role: user.role },
            token,
        });
    } catch (err) {
        console.error("Lỗi đăng nhập:", err.message);
        res.status(401).json({ message: err.message });
    }
});

// Xoá user
router.delete("/delete-user", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.query.id);
        if (!deleted) return res.status(404).json({ message: " Không tìm thấy người dùng" });
        res.json({ message: " Đã xoá người dùng", user: deleted });
    } catch (err) {
        console.error(" Lỗi xoá người dùng:", err.message);
        res.status(500).json({ message: " Lỗi server" });
    }
});

// Sửa user
router.put("/update-user", verifyToken, checkMultiRole(["admin", "user"]), async (req, res) => {
    try {
        const updated = await userService.updateUser(req.body);
        if (!updated) return res.status(404).json({ message: " Không tìm thấy người dùng để cập nhật" });
        res.json({ message: " Cập nhật thành công", user: updated });
    } catch (err) {
        console.error(" Lỗi cập nhật người dùng:", err.message);
        res.status(500).json({ message: " Lỗi server" });
    }
});

// Danh sách user
router.get("/user-list", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({ status: true, data: users });
    } catch (err) {
        console.error(" Lỗi lấy danh sách người dùng:", err.message);
        res.status(500).json({ status: false, message: " Lỗi server" });
    }
});

// Chi tiết user
router.get("/user-detail", verifyToken, async (req, res) => {
    try {
        const user = await userService.getUserById(req.query.id);
        if (!user) return res.status(404).json({ message: " Không tìm thấy người dùng" });
        res.json({ status: true, data: user });
    } catch (err) {
        console.error("Lỗi lấy chi tiết người dùng:", err.message);
        res.status(500).json({ message: " Lỗi server" });
    }
});

// Test token
router.get("/test-security", verifyToken, (req, res) => {
    res.json({ message: " Token hợp lệ", user: req.userData.user });
});

module.exports = router;