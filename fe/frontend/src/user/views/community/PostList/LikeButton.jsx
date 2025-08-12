import React, { useState, useEffect } from 'react';
import { toggleLikePost, getLikeStatus } from '../../../../api/post.like.api.js';

const LikeButton = ({ postId, initialLikeCount = 0, initialIsLiked = false, isLoggedIn }) => {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");

    // Lấy trạng thái like từ backend khi component mount
    useEffect(() => {
        const fetchLikeStatus = async () => {
            if (isLoggedIn && token && postId) {
                try {
                    const response = await getLikeStatus(postId, token);
                    if (response.error === 0) {
                        setIsLiked(response.data.isLiked);
                        setLikeCount(response.data.likeCount);
                    }
                } catch (error) {
                    console.error("Error fetching like status:", error);
                    // Fallback to initial values
                    setIsLiked(initialIsLiked);
                    setLikeCount(initialLikeCount);
                }
            } else {
                setIsLiked(initialIsLiked);
                setLikeCount(initialLikeCount);
            }
        };

        fetchLikeStatus();
    }, [postId, token, isLoggedIn, initialIsLiked, initialLikeCount]);

    const handleLike = async () => {
        if (!isLoggedIn || !token) {
            alert("Bạn cần đăng nhập để thích bài viết");
            return;
        }

        setIsLoading(true);
        try {
            const response = await toggleLikePost(postId, token);
            console.log("Like response:", response);

            if (response.error === 0) {
                setIsLiked(response.liked);
                // Sử dụng likeCount từ response thay vì tự tính
                setLikeCount(response.likeCount || 0);
            }
        } catch (error) {
            console.error("Error liking post:", error);
            alert("Có lỗi xảy ra khi thích bài viết");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleLike}
            disabled={isLoading}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors disabled:opacity-50 ${isLiked
                    ? 'text-[#22C55E] bg-green-50'
                    : 'text-gray-600 hover:text-[#22C55E] hover:bg-green-50'
                }`}
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                className={isLoading ? "animate-pulse" : ""}
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-sm font-medium">
                {isLoading ? "..." : (isLiked ? 'Đã thích' : 'Thích')}
                {likeCount > 0 && ` (${likeCount})`}
            </span>
        </button>
    );
};

export default LikeButton;
