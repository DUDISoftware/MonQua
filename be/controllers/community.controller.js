const express = require("express");
const router = express.Router();
const communityService = require("../services/community.service");

// Tạo bài viết mới
router.post("/posts/create", async (req, res) => {
    try {
        const postData = req.body;
        const newPost = await communityService.createPost(postData);
        return res.status(201).json({
            error: 0,
            error_text: "Bài viết đã được tạo thành công!",
            data_name: "Bài viết",
            data: [newPost],
        });
    } catch (error) {
        console.error("Lỗi tạo bài viết:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Bài viết",
            data: [],
        });
    }
});

// Lấy danh sách bài viết
router.get("/posts/list", async (req, res) => {
    try {
        const posts = await communityService.getAllPosts();
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh sách bài viết thành công!",
            data_name: "Danh sách bài viết",
            data: posts,
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách bài viết:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Danh sách bài viết",
            data: [],
        });
    }
});

// Thêm bình luận
router.post("/comments/create", async (req, res) => {
    try {
        const commentData = req.body;
        const newComment = await communityService.createComment(commentData);
        return res.status(201).json({
            error: 0,
            error_text: "Bình luận đã được thêm thành công!",
            data_name: "Bình luận",
            data: [newComment],
        });
    } catch (error) {
        console.error("Lỗi thêm bình luận:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Bình luận",
            data: [],
        });
    }
});

// Like bài viết
router.post("/posts/like", async (req, res) => {
    try {
        const likeData = req.body;
        const likedPost = await communityService.likePost(likeData);
        return res.status(201).json({
            error: 0,
            error_text: "Bài viết đã được like thành công!",
            data_name: "Like bài viết",
            data: [likedPost],
        });
    } catch (error) {
        console.error("Lỗi like bài viết:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Like bài viết",
            data: [],
        });
    }
});

module.exports = router;
