import React from "react";

const PostGiftConditionSelect = () => (
    <div>
        <label className="block font-semibold text-[#17805C] mb-1">Tình Trạng</label>
        <select className="w-full border border-[#B9E5C9] rounded-full px-4 py-2">
            <option>Chọn Tình Trạng</option>
            <option>Mới</option>
            <option>Đã sử dụng</option>
            <option>Còn mới 90%</option>
            <option>Còn mới 70%</option>
        </select>
    </div>
);

export default PostGiftConditionSelect;
