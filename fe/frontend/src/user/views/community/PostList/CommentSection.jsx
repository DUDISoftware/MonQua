import React, { useState, useEffect } from "react";
import { getCommentsByPostId, addComment, replyComment } from "../../../../api/post.comment.api.js";
import axios from "axios";

const CommentSection = ({ postId, isLoggedIn }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null); // ID của comment đang được reply
    const [replyText, setReplyText] = useState(""); // Nội dung reply
    const [showReplies, setShowReplies] = useState({}); // Track replies visibility
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Nếu có postId hợp lệ, hãy tải bình luận (không cần token)
        if (postId) {
            const fetchComments = async () => {
                try {
                    // Sử dụng axios trực tiếp thay vì qua API function 
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/comment/list/${postId}`);
                    console.log("Fetch comments response:", response);
                    const commentsData = response.data.data || response.data.comments || response.data || [];
                    setComments(Array.isArray(commentsData) ? commentsData : []);
                } catch (error) {
                    console.error("Error fetching comments:", error);
                }
            };
            fetchComments();
        }
    }, [postId]);

    const handleAddComment = async () => {
        if (!newComment.trim() || !postId || !token) return;

        setLoading(true);
        try {
            const response = await addComment(postId, { content: newComment }, token);
            console.log("Add comment response:", response);

            // Thêm bình luận mới vào danh sách hoặc tải lại
            if (response && response.data) {
                setComments(prev => [...prev, response.data]);
            }
            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleReply = async (commentId) => {
        if (!replyText.trim() || !postId || !token) return;

        setLoading(true);
        try {
            const response = await replyComment(postId, commentId, { content: replyText }, token);
            console.log("Reply response:", response);

            if (response && response.data) {
                // Refresh comments để lấy cấu trúc mới
                const updatedComments = await axios.get(`${import.meta.env.VITE_API_URL}/posts/comment/list/${postId}`);
                const commentsData = updatedComments.data.data || updatedComments.data.comments || updatedComments.data || [];
                setComments(Array.isArray(commentsData) ? commentsData : []);
            }
            setReplyText("");
            setReplyingTo(null);
        } catch (error) {
            console.error("Error replying to comment:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleReplies = (commentId) => {
        setShowReplies(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const renderComment = (comment, isReply = false) => {
        const hasReplies = comment.replies && comment.replies.length > 0;

        return (
            <div key={comment._id || comment.id} className={`${isReply ? 'ml-10' : ''}`}>
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E6F4E6] flex items-center justify-center font-bold text-[#22C55E] text-sm">
                        {(() => {
                            if (comment.user_id && typeof comment.user_id === 'object') {
                                return (comment.user_id.name || "U")[0];
                            }
                            return (comment.author || comment.user_name || "U")[0];
                        })()}
                    </div>
                    <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg px-3 py-2">
                            <div className="text-sm font-semibold text-gray-900">
                                {(() => {
                                    if (comment.user_id && typeof comment.user_id === 'object') {
                                        return comment.user_id.name || "Người dùng";
                                    }
                                    return comment.author || comment.user_name || "Người dùng";
                                })()}
                            </div>
                            <div className="text-sm text-gray-800">{comment.content}</div>
                        </div>
                        <div className="flex items-center gap-4 mt-1 ml-3">
                            <span className="text-xs text-gray-500">
                                {comment.time || new Date(comment.created_at || Date.now()).toLocaleString()}
                            </span>
                            {isLoggedIn && !isReply && (
                                <button
                                    onClick={() => setReplyingTo(comment._id)}
                                    className="text-xs text-[#22C55E] hover:underline font-medium"
                                >
                                    Trả lời
                                </button>
                            )}
                            {hasReplies && (
                                <button
                                    onClick={() => toggleReplies(comment._id)}
                                    className="text-xs text-[#22C55E] hover:underline font-medium"
                                >
                                    {showReplies[comment._id] ? 'Ẩn' : 'Xem'} {comment.replies.length} phản hồi
                                </button>
                            )}
                        </div>

                        {/* Reply Input */}
                        {replyingTo === comment._id && (
                            <div className="flex gap-2 mt-2 ml-3">
                                <div className="w-6 h-6 rounded-full bg-[#E6F4E6] flex items-center justify-center font-bold text-[#22C55E] text-xs">
                                    {(localStorage.getItem("userName") || "U")[0]}
                                </div>
                                <div className="flex-1 flex gap-2">
                                    <input
                                        className="flex-grow border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E]"
                                        placeholder="Viết phản hồi..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleReply(comment._id);
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <button
                                        className="bg-[#22C55E] text-white px-3 py-1 rounded-full text-xs font-medium disabled:opacity-50"
                                        onClick={() => handleReply(comment._id)}
                                        disabled={loading || !replyText.trim()}
                                    >
                                        {loading ? "..." : "Gửi"}
                                    </button>
                                    <button
                                        className="text-gray-500 text-xs px-2"
                                        onClick={() => {
                                            setReplyingTo(null);
                                            setReplyText("");
                                        }}
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Render Replies */}
                        {hasReplies && showReplies[comment._id] && (
                            <div className="mt-2">
                                {comment.replies.map(reply => renderComment(reply, true))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm font-medium text-gray-700 mb-3">Bình luận</div>
            <div className="space-y-4">
                {comments.length > 0 ? (
                    comments.map(comment => renderComment(comment))
                ) : (
                    <div className="text-center text-gray-500 py-4">
                        Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
                    </div>
                )}
            </div>

            {isLoggedIn ? (
                // Hiển thị input bình luận chỉ khi đã đăng nhập
                <div className="flex gap-3 mt-4">
                    <div className="w-8 h-8 rounded-full bg-[#E6F4E6] flex items-center justify-center font-bold text-[#22C55E] text-sm">
                        {(localStorage.getItem("userName") || "U")[0]}
                    </div>
                    <div className="flex-1 flex gap-2">
                        <input
                            className="flex-grow border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E]"
                            placeholder="Viết bình luận..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddComment();
                                }
                            }}
                        />
                        <button
                            className="bg-[#22C55E] text-white px-4 py-2 rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#16a34a] transition-colors"
                            onClick={handleAddComment}
                            disabled={loading || !newComment.trim()}
                        >
                            {loading ? "..." : "Gửi"}
                        </button>
                    </div>
                </div>
            ) : (
                // Hiển thị thông báo đăng nhập nếu chưa đăng nhập
                <div className="text-center mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">
                        <a href="/login" className="text-[#22C55E] hover:underline font-medium">Đăng nhập</a> để bình luận
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentSection;
