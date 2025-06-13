import React from "react";

const tags = ["Quần áo", "Sách", "Đồ chơi", "Gia dụng", "Điện tử", "Cây cảnh"];

const ProductTags = () => (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-bold text-lg mb-4">Tags sản phẩm</h3>
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
                <span key={idx} className="bg-[#E6F4E6] text-[#22C55E] px-3 py-1 rounded-full text-xs font-medium">
                    {tag}
                </span>
            ))}
        </div>
    </div>
);

export default ProductTags;
