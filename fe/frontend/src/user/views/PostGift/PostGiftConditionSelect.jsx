import React from "react";

const PostGiftConditionSelect = ({ value, onChange }) => (
    <div>
        <label className="block font-semibold text-[#17805C] mb-1">Tình Trạng</label>
        <select className="w-full border border-[#B9E5C9] rounded-full px-4 py-2" value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">Chọn Tình Trạng</option>
            <option value="new">Mới</option>
            <option value="used">Đã sử dụng</option>
            <option value="like_new_90">Còn mới 90%</option>
            <option value="like_new_70">Còn mới 70%</option>
        </select>
    </div>
);

export default PostGiftConditionSelect;
