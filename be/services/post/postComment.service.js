
const CommunityCommentsModel = require("../../models/post/community_comments.model");
const Comment_likesModel = require("../../models/post/comment_likes.model");
const CommunityPostsModel = require("../../models/post/community_posts.model");

module.exports = {
    async likeComment(commentId, userId) {
        try {
            if (!await CommunityCommentsModel.exists({ _id: commentId })) {
                throw new Error("Bình luận không tồn tại");
            }
            const existingLike = await Comment_likesModel.findOne({ comment_id: commentId, user_id: userId });
            if (existingLike) {
                await Comment_likesModel.deleteOne({ _id: existingLike._id });
                return { message: "Đã bỏ thích bình luận" };
            }
            const newLike = new Comment_likesModel({
                comment_id: commentId,
                user_id: userId,
            });
            return await newLike.save();
        } catch (error) {
            console.error("Lỗi khi thích bình luận:", error.message);
            throw new Error("Lỗi khi thích bình luận.");
        }
    },

    async addComment(commentData) {
        try {
            const parentComment = commentData.parent_id ? await CommunityCommentsModel.findById(commentData.parent_id) : null;
            if (!await CommunityPostsModel.exists({ _id: commentData.post_id })) {
                throw new Error("Bài viết không tồn tại");
            }
            const newComment = new CommunityCommentsModel(commentData);
            const savedComment = await newComment.save();

            // Populate user data trước khi trả về
            const populatedComment = await CommunityCommentsModel.findById(savedComment._id)
                .populate('user_id', 'name email')
                .lean();

            return populatedComment;
        } catch (error) {
            console.error("Lỗi khi bình luận:", error.message);
            throw new Error("Lỗi khi bình luận.");
        }
    },

    async getCommentsByPostId(postId) {
        try {
            // Lấy tất cả comments của post (bao gồm cả replies)
            const allComments = await CommunityCommentsModel.find({ post_id: postId, status: 'active' })
                .populate('user_id', 'name email')
                .sort({ created_at: 1 }) // Sắp xếp theo thời gian tăng dần
                .lean();

            // Tổ chức thành cấu trúc cây (parent -> children)
            const commentMap = {};
            const rootComments = [];

            // Tạo map của tất cả comments
            allComments.forEach(comment => {
                comment.replies = [];
                commentMap[comment._id] = comment;
            });

            // Sắp xếp thành cấu trúc parent-child
            allComments.forEach(comment => {
                if (comment.parent_id) {
                    // Đây là reply
                    if (commentMap[comment.parent_id]) {
                        commentMap[comment.parent_id].replies.push(comment);
                    }
                } else {
                    // Đây là comment gốc
                    rootComments.push(comment);
                }
            });

            return rootComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } catch (error) {
            console.error("Lỗi khi lấy bình luận:", error.message);
            throw new Error("Lỗi khi lấy bình luận.");
        }
    },

    async getCommentById(id) {
        try {
            const comment = await CommunityCommentsModel.findOne({ _id: id, status: 'active' })
                .populate('user_id', 'name email')
                .lean();
            if (!comment) {
                throw new Error("Bình luận không tồn tại");
            }
            return comment;
        } catch (error) {
            console.error("Lỗi khi lấy bình luận:", error.message);
            throw new Error("Lỗi khi lấy bình luận.");
        }
    },

    async updateComment(id, updateData) {
        try {
            const updatedComment = await CommunityCommentsModel.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedComment) {
                throw new Error("Bình luận không tồn tại");
            }
            return updatedComment;
        } catch (error) {
            console.error("Lỗi khi chỉnh sửa bình luận:", error.message);
            throw new Error("Lỗi khi chỉnh sửa bình luận.");
        }
    },

    async deleteComment(id) {
        try {
            const comment = await CommunityCommentsModel.findById(id);
            if (!comment) {
                throw new Error("Bình luận không tồn tại");
            }
            await deleteChildComments(id);
            await Comment_likesModel.deleteMany({ comment_id: id });
            return await CommunityCommentsModel.findByIdAndDelete(id);
        } catch (error) {
            console.error("Lỗi khi xóa bình luận:", error.message);
            throw new Error("Lỗi khi xóa bình luận.");
        }
    },

    async dbCleanup() {
        try {
            await Comment_likesModel.deleteMany({});
            await CommunityCommentsModel.deleteMany({});
        } catch (error) {
            console.error("Lỗi khi dọn dẹp cơ sở dữ liệu:", error.message);
        }
    },
};
