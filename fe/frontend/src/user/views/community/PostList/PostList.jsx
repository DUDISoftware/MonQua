import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, loading, error, activeTab, isLoggedIn }) => {
    if (loading && posts.length === 0) {
        return (
            <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#22C55E]"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center py-5">{error}</div>;
    }

    if (posts.length === 0) {
        return <div className="text-gray-500 text-center py-5">Chưa có bài viết nào</div>;
    }

    // Filter posts based on activeTab if needed
    console.log("Posts in PostList component:", posts);
    // Hiện tại không có trường type trong API response, nên tạm thời hiển thị tất cả
    const filteredPosts = posts;

    return (
        <div className="flex flex-col gap-6">
            {filteredPosts.map(post => (
                <PostItem key={post._id} post={post} isLoggedIn={isLoggedIn} />
            ))}
        </div>
    );
};

export default PostList;
