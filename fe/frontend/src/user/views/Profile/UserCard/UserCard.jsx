import React from "react";
import { FaPhoneAlt, FaCommentDots } from "react-icons/fa";

const UserCard = () => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center mb-6 shadow-sm">
        <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="w-20 h-20 rounded-full object-cover mb-2 border-4 border-[#22C55E]"
        />
        <div className="font-bold text-lg text-[#17805C] mb-1">Trịnh Tuấn Đan</div>
        <span className="bg-[#E6F4E6] text-[#22C55E] px-3 py-1 rounded-full text-xs font-medium mb-2">
            Đã xác thực
        </span>
        <div className="text-xs text-gray-500 mb-4">Số điện thoại: 0336 **** 38</div>
        <button className="w-full bg-[#6EE7B7] text-[#17805C] font-bold text-base py-2 rounded-2xl mb-2 flex items-center justify-center gap-2 transition"
            style={{ boxShadow: "0 2px 8px 0 #6EE7B733" }}>
            <FaPhoneAlt /> Gọi người đăng
        </button>
        <button className="w-full bg-[#ECFDF5] text-[#17805C] font-semibold text-base py-2 rounded-2xl mb-2 border border-[#D1FAE5] flex items-center justify-center gap-2 transition">
            <FaCommentDots /> Chat với người đăng
        </button>
        <button className="w-full bg-[#F1F5F9] text-[#2563EB] font-semibold text-base py-2 rounded-2xl border border-[#E0E7EF] flex items-center justify-center gap-2 transition">
            Chat qua Zalo
        </button>
    </div>
);

export default UserCard;
