import React from "react";

const PostEditor = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <textarea
            className="w-full border border-gray-200 rounded-lg p-2 mb-2 resize-none"
            rows={3}
            placeholder="Chia sẻ cảm nghĩ, hình ảnh hoặc video với cộng đồng..."
        />
        <div className="flex gap-3">
            <button className="bg-[#22C55E] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#16a34a] transition">
                Đăng bài
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold">
                Ảnh
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold">
                Video
            </button>
        </div>
    </div>
);

export default PostEditor;
