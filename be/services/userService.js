const User = require("../models/User"); 
const Role = require("../models/role");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

class UserService {
    // Đăng ký người dùng
    async register({ username, email, gender, dob, password, role }) {
        if (!username || !email || !gender || !dob || !password) {
            throw new Error("Thiếu thông tin bắt buộc");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email đã được sử dụng");
        }
        const userRole = role || "user";
        const roleExists = await Role.findOne({ name: userRole });
        if (!roleExists) throw new Error(`Vai trò ${userRole} không hợp lệ`);
        const hashedPassword = await bcrypt.hash(password, 10);
        // Tạo người dùng mới
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            email,
            gender,
            dob,
            password: hashedPassword,
            role: userRole
        });

        await newUser.save();
        return newUser;
    }
    // Đăng nhập người dùng
    async login({ username, email, password }) {
        if ((!username && !email) || !password) {
            throw new Error("Thiếu thông tin đăng nhập");
        }

        // Tìm người dùng bằng username hoặc email
        const user = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (!user) {
            throw new Error("Tài khoản không tồn tại");
        }

        // Kiểm tra mật khẩu
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Sai mật khẩu");
        }

        return user;
    }
    async deleteUser(id) {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error("Không tìm thấy người dùng để xóa");
        }
        return deletedUser;
    }
    async updateUser({ id, username, email, gender, dob, password, role }) {
        const updateFields = {};
        if (username) updateFields.username = username;
        if (email) updateFields.email = email;
        if (gender) updateFields.gender = gender;
        if (dob) updateFields.dob = dob;
        if (role) updateFields.role = role;
        if (password) {
            updateFields.password = await bcrypt.hash(password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedUser) {
            throw new Error("Không tìm thấy người dùng để cập nhật");
        }
        return updatedUser;
    }

    async getAllUsers() {
        return await User.find().select("-password");
    }

    async getUserById(id) {
        const user = await User.findById(id).select("-password");
        if (!user) {
            throw new Error("Không tìm thấy người dùng");
        }
        return user;
    }
}

module.exports = UserService;