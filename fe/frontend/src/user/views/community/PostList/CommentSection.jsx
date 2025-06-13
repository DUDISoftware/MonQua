import React from "react";

const comments = [
    { id: 1, author: "Lê Văn C", content: "Tuyệt vời quá!", time: "1 giờ trước" },
];

const CommentSection = ({ postId }) => (
    <div className="mt-3">
        <div className="text-xs text-gray-500 mb-1">Bình luận</div>
        <div className="flex flex-col gap-2">
            {comments.map(c => (
                <div key={c.id} className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#E6F4E6] flex items-center justify-center font-bold text-[#22C55E]">
                        {c.author[0]}
                    </div>
                    <div>
                        <div className="text-xs font-semibold">{c.author} <span className="text-gray-400 font-normal">{c.time}</span></div>
                        <div className="text-sm">{c.content}</div>
                    </div>
                </div>
            ))}
        </div>
        <input
            className="mt-2 w-full border border-gray-200 rounded-lg px-2 py-1 text-sm"
            placeholder="Viết bình luận..."
        />
    </div>
);

export default CommentSection;
