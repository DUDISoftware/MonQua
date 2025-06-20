const Badge = require("../models/badges/badges.model");
const UserBadge = require("../models/badges/user_badges.model");

// Tạo huy hiệu mới
exports.createBadge = async (badgeData) => {
    try {
        const badge = new Badge(badgeData);
        return await badge.save();
    } catch (error) {
        console.error("Lỗi khi tạo huy hiệu:", error.message);
        throw new Error("Lỗi khi tạo huy hiệu: " + error.message);
    }
};

// Lấy danh sách huy hiệu
exports.getAllBadges = async () => {
    try {
        return await Badge.find();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách huy hiệu:", error.message);
        throw new Error("Lỗi khi lấy danh sách huy hiệu: " + error.message);
    }
};

// Trao huy hiệu cho người dùng
exports.awardBadge = async (awardData) => {
    try {
        const userBadge = new UserBadge(awardData);
        return await userBadge.save();
    } catch (error) {
        console.error("Lỗi khi trao huy hiệu:", error.message);
        throw new Error("Lỗi khi trao huy hiệu: " + error.message);
    }
};

// Lấy danh sách huy hiệu của người dùng
exports.getUserBadges = async (userId) => {
    try {
        return await UserBadge.find({ user_id: userId }).populate("badge_id");
    } catch (error) {
        console.error("Lỗi khi lấy danh sách huy hiệu của người dùng:", error.message);
        throw new Error("Lỗi khi lấy danh sách huy hiệu của người dùng: " + error.message);
    }
};
