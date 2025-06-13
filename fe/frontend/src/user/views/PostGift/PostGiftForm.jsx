import React from "react";
import PostGiftCategorySelect from "./PostGiftCategorySelect";
import PostGiftConditionSelect from "./PostGiftConditionSelect";
import PostGiftLocationSelect from "./PostGiftLocationSelect";
import PostGiftDeliveryMethod from "./PostGiftDeliveryMethod";
import PostGiftImageUpload from "./PostGiftImageUpload";

const PostGiftForm = () => (
    <form className="bg-white rounded-xl border border-[#B9E5C9] p-8 flex flex-col gap-6 shadow-sm">
        <div className="text-xl font-bold text-[#17805C] mb-2">Đăng tin tặng đồ</div>
        <div>
            <label className="block font-semibold text-[#17805C] mb-1">Tên món đồ</label>
            <input
                className="w-full border border-[#B9E5C9] rounded-full px-4 py-2 placeholder:text-gray-400"
                placeholder="VD: Quần áo, đồ chơi,...."
            />
        </div>
        <div>
            <label className="block font-semibold text-[#17805C] mb-1">Mô Tả Chi Tiết</label>
            <textarea
                className="w-full border border-[#B9E5C9] rounded-2xl px-4 py-2 min-h-[80px] placeholder:text-gray-400"
                placeholder="Mô tả về món đồ, lý do tặng, lưu ý khi nhận..."
            ></textarea>
        </div>
        <div className="flex gap-3">
            <div className="flex-1">
                <PostGiftCategorySelect />
            </div>
            <div className="flex-1">
                <PostGiftConditionSelect />
            </div>
        </div>
        <PostGiftLocationSelect />
        <PostGiftDeliveryMethod />
        <PostGiftImageUpload />
        <button
            className="bg-[#22C55E] text-white px-8 py-2 rounded-full font-semibold hover:bg-[#16a34a] transition mt-4 self-center"
            type="submit"
        >
            Đăng Tin
        </button>
    </form>
);

export default PostGiftForm;
