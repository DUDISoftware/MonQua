import React from "react";

const PostGiftDeliveryMethod = () => (
    <div>
        <label className="block font-semibold text-[#17805C] mb-1">Hình Thức Trao Đồ</label>
        <div className="flex gap-6">
            <label className="flex items-center gap-2">
                <input type="radio" name="delivery" className="accent-[#22C55E]" defaultChecked />
                Giao Tận Tay
            </label>
            <label className="flex items-center gap-2">
                <input type="radio" name="delivery" className="accent-[#22C55E]" />
                Người nhận đến lấy
            </label>
            <label className="flex items-center gap-2">
                <input type="radio" name="delivery" className="accent-[#22C55E]" />
                Gặp Tại Tay
            </label>
        </div>
    </div>
);

export default PostGiftDeliveryMethod;
