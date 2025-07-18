import React from "react";
import CommentSection from "./CommentSection";

const PostItem = ({ post, isLoggedIn }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center mb-2">
            <div className="w-9 h-9 rounded-full bg-[#E6F4E6] flex items-center justify-center font-bold text-[#22C55E] mr-3">
                {post.author[0]}
            </div>
            <div>
                <div className="font-semibold">{post.author}</div>
                <div className="text-xs text-gray-400">{post.time}</div>
            </div>
        </div>
        <div className="mb-3 text-gray-800">{post.content}</div>
        {post.image_urls && post.image_urls.length > 0 && (
            <div className="mb-3 grid grid-cols-2 gap-2">
                {post.image_urls.map((imageUrl, idx) => (
                    <img
                        key={idx}
                        src={imageUrl}
                        alt={`Post image ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                ))}
            </div>
        )}
        <CommentSection postId={post._id} isLoggedIn={isLoggedIn} />
    </div>
);

export default PostItem;
