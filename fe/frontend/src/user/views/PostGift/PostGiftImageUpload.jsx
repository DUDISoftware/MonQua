import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa";

const PostGiftImageUpload = () => {
    const inputRef = useRef();
    return (
        <div>
            <label className="block font-semibold text-[#17805C] mb-1">Ảnh Món Đồ</label>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="px-4 py-2 bg-[#22C55E] text-white rounded-full font-semibold flex items-center gap-2"
                    onClick={() => inputRef.current && inputRef.current.click()}
                >
                    <FaCamera /> Chọn Tệp
                </button>
                <span className="text-xs text-gray-400">Không có tệp nào được chọn</span>
                <input ref={inputRef} type="file" className="hidden" accept="image/*" />
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
                Tối đa 5 ảnh, mỗi ảnh tối đa 5MB. Định dạng jpg, png.
            </div>
        </div>
    );
};

export default PostGiftImageUpload;
