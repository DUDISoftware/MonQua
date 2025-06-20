import React from "react";

const posts = [
    { id: 1, title: "Cách nhận đồ miễn phí an toàn", link: "#" },
    { id: 2, title: "Chia sẻ đồ cũ, nhận lại niềm vui", link: "#" },
];

const FeaturedPosts = () => (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <h3 className="font-bold text-lg mb-4">Bài viết nổi bật</h3>
        <ul>
            {posts.map(post => (
                <li key={post.id} className="mb-2 last:mb-0">
                    <a href={post.link} className="text-blue-600 hover:underline">{post.title}</a>
                </li>
            ))}
        </ul>
    </div>
);

export default FeaturedPosts;
