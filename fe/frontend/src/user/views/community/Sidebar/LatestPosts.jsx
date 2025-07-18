import React from "react";
import { Link } from "react-router-dom";

const LatestPosts = ({ posts = [] }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <h3 className="font-bold text-lg mb-4">Bài viết mới</h3>
        {posts.length > 0 ? (
            <ul>
                {posts.map(post => (
                    <li key={post._id} className="mb-2 last:mb-0">
                        <Link
                            to={`/community/post/${post._id}`}
                            className="text-blue-600 hover:underline"
                        >
                            {post.content?.substring(0, 50)}
                            {post.content?.length > 50 ? "..." : ""}
                        </Link>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-gray-500 text-sm">Chưa có bài viết mới</p>
        )}
    </div>
);

export default LatestPosts;
