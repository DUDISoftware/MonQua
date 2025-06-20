const CommunityPost = require("../models/community/community_posts.model");
const CommunityComment = require("../models/community/community_comments.model");
const PostLike = require("../models/community/post_likes.model");

// Tạo bài viết mới
exports.createPost = async (postData) => {
    try {
        const post = new CommunityPost(postData);
        return await post.save();
    } catch (error) {
        console.error("Lỗi khi tạo bài viết:", error.message);
        throw new Error("Lỗi khi tạo bài viết: " + error.message);
    }
};

// Lấy danh sách bài viết
exports.getAllPosts = async () => {
    try {
        return await CommunityPost.find().populate("category_id").populate("user_id");
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error.message);
        throw new Error("Lỗi khi lấy danh sách bài viết: " + error.message);
    }
};

// Thêm bình luận
exports.createComment = async (commentData) => {
    try {
        const comment = new CommunityComment(commentData);
        return await comment.save();
    } catch (error) {
        console.error("Lỗi khi thêm bình luận:", error.message);
        throw new Error("Lỗi khi thêm bình luận: " + error.message);
    }
};

// Like bài viết
exports.likePost = async (likeData) => {
    try {
        const like = new PostLike(likeData);
        return await like.save();
    } catch (error) {
        console.error("Lỗi khi like bài viết:", error.message);
        throw new Error("Lỗi khi like bài viết: " + error.message);
    }
};
