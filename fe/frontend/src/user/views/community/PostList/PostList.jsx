import React from "react";
import PostItem from "./PostItem";

const posts = [
    { id: 1, author: "Nguyễn Văn A", content: "Mình vừa tặng sách cho bạn nhỏ ở Q3, cảm giác rất vui!", time: "2 giờ trước" },
    { id: 2, author: "Trần Thị B", content: "Có ai cần áo khoác nữ không? Mình còn mới 90%", time: "5 giờ trước" },
];

const PostList = () => (
    <div className="flex flex-col gap-6">
        {posts.map(post => (
            <PostItem key={post.id} post={post} />
        ))}
    </div>
);

export default PostList;
