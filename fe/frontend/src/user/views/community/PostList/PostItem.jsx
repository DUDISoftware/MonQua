import React, { useEffect, useState } from "react";
import CommentSection from "./CommentSection";
import LikeButton from "./LikeButton";

const PostItem = ({ post, isLoggedIn }) => {
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        console.log("Post data in PostItem:", post);
        console.log("Post images:", post.image_url);
        console.log("Post user:", post.user_id);
    }, [post]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    // Lấy thông tin user từ populated data hoặc fallback
    const getUserName = () => {
        if (post.user_id && typeof post.user_id === 'object') {
            return post.user_id.name || "Người dùng";
        }
        return post.author || "Người dùng";
    };

    const getUserInitial = () => {
        const name = getUserName();
        return name.charAt(0).toUpperCase();
    };

    const getFormattedTime = () => {
        if (post.created_at) {
            return new Date(post.created_at).toLocaleString('vi-VN');
        }
        return post.time || "Vừa xong";
    };

    const getCategoryName = () => {
        if (post.category_id && typeof post.category_id === 'object') {
            return post.category_id.name || "";
        }
        return "";
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center mb-2">
                <div className="w-9 h-9 rounded-full bg-[#E6F4E6] flex items-center justify-center font-bold text-[#22C55E] mr-3">
                    {getUserInitial()}
                </div>
                <div>
                    <div className="font-semibold">{getUserName()}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-2">
                        <span>{getFormattedTime()}</span>
                        {getCategoryName() && (
                            <>
                                <span>•</span>
                                <span className="text-[#22C55E] font-medium">{getCategoryName()}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="mb-3 text-gray-800">{post.content}</div>
            {post.image_url && (Array.isArray(post.image_url) ? post.image_url.length > 0 : true) && (
                <div className="mb-3 grid grid-cols-2 gap-2">
                    {Array.isArray(post.image_url) ? (
                        post.image_url.map((imageUrl, idx) => (
                            <img
                                key={idx}
                                src={imageUrl}
                                alt={`Post image ${idx + 1}`}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        ))
                    ) : (
                        <img
                            src={post.image_url}
                            alt="Post image"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    )}
                </div>
            )}

            {/* Like and Comment buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-4">
                    {/* Like button */}
                    <LikeButton
                        postId={post._id}
                        initialLikeCount={post.likeCount || 0}
                        initialIsLiked={post.isLiked || false}
                        isLoggedIn={isLoggedIn}
                    />

                    {/* Comment button */}
                    <button
                        onClick={toggleComments}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-[#22C55E] hover:bg-green-50 transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span className="text-sm font-medium">Bình luận</span>
                    </button>
                </div>

                {/* Share button */}
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-[#22C55E] hover:bg-green-50 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <span className="text-sm font-medium">Chia sẻ</span>
                </button>
            </div>

            {/* Comment Section - chỉ hiển thị khi showComments = true */}
            {showComments && (
                <CommentSection postId={post._id} isLoggedIn={isLoggedIn} />
            )}
        </div>
    );
};

export default PostItem;
