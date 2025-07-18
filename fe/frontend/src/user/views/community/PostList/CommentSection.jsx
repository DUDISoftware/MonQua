import React, { useState, useEffect } from "react";
import { getCommentsByPostId, addComment } from "../../../../api/post.comment.api.js";
import axios from "axios";

const CommentSection = ({ postId, isLoggedIn }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);
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

    return (
        <div className="mt-3">
            <div className="text-xs text-gray-500 mb-1">Bình luận</div>
            <div className="flex flex-col gap-2">
                {comments.length > 0 ? (
                    comments.map(c => (
                        <div key={c._id || c.id} className="flex items-start gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#E6F4E6] flex items-center justify-center font-bold text-[#22C55E]">
                                {(c.author || c.user_name || "U")[0]}
                            </div>
                            <div>
                                <div className="text-xs font-semibold">
                                    {c.author || c.user_name || "Người dùng"}
                                    <span className="text-gray-400 font-normal ml-1">
                                        {c.time || new Date(c.created_at || Date.now()).toLocaleString()}
                                    </span>
                                </div>
                                <div className="text-sm">{c.content}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-xs text-gray-400">Chưa có bình luận nào</div>
                )}
            </div>

            {isLoggedIn ? (
                // Hiển thị input bình luận chỉ khi đã đăng nhập
                <div className="flex gap-2 mt-2">
                    <input
                        className="flex-grow border border-gray-200 rounded-lg px-2 py-1 text-sm"
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
                        className="bg-[#22C55E] text-white px-3 py-1 rounded-lg text-sm font-medium disabled:opacity-50"
                        onClick={handleAddComment}
                        disabled={loading || !newComment.trim()}
                    >
                        {loading ? "..." : "Gửi"}
                    </button>
                </div>
            ) : (
                // Hiển thị thông báo đăng nhập nếu chưa đăng nhập
                <div className="text-center mt-2 text-sm text-gray-500">
                    <a href="/login" className="text-[#22C55E] hover:underline">Đăng nhập</a> để bình luận
                </div>
            )}
        </div>
    );
};

export default CommentSection;
