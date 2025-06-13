import React from "react";

const PostGiftLocationSelect = () => (
    <div>
        <label className="block font-semibold text-[#17805C] mb-1">Khu Vực</label>
        <div className="flex gap-2 mb-2">
            <select className="border border-[#B9E5C9] rounded-full px-3 py-2 flex-1">
                <option>Tỉnh/Thành</option>
            </select>
            <select className="border border-[#B9E5C9] rounded-full px-3 py-2 flex-1">
                <option>Quận/Huyện</option>
            </select>
            <select className="border border-[#B9E5C9] rounded-full px-3 py-2 flex-1">
                <option>Xã/Phường</option>
            </select>
        </div>
        <input
            className="w-full border border-[#B9E5C9] rounded-full px-4 py-2"
            placeholder="VD: 30 Phạm Văn Đồng ............................."
        />
    </div>
);

export default PostGiftLocationSelect;
