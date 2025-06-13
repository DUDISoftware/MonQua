import React from "react";

const PostGiftCategorySelect = () => (
    <div>
        <label className="block font-semibold text-[#17805C] mb-1">Danh Mục</label>
        <select className="w-full border border-[#B9E5C9] rounded-full px-4 py-2">
            <option>Chọn Danh Mục</option>
            <option>Quần áo</option>
            <option>Sách vở</option>
            <option>Đồ chơi</option>
            <option>Đồ gia dụng</option>
            <option>Đồ điện tử</option>
            <option>Cây cảnh</option>
        </select>
    </div>
);

export default PostGiftCategorySelect;
