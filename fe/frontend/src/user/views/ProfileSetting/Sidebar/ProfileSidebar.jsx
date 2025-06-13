import React from "react";
import { FaCheckCircle, FaUserFriends, FaGift, FaPhoneAlt } from "react-icons/fa";

const ProfileSidebar = () => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center mb-6 shadow-sm min-w-[260px]">
        <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="w-20 h-20 rounded-full object-cover mb-2 border-4 border-[#22C55E]"
        />
        <div className="font-bold text-lg text-[#17805C] mb-1">Trịnh Tuấn Đan</div>
        <span className="bg-[#E6F4E6] text-[#22C55E] px-3 py-1 rounded-full text-xs font-medium mb-2 flex items-center gap-1">
            <FaCheckCircle /> Đã xác thực
        </span>
        <button className="w-full bg-[#6EE7B7] text-[#17805C] font-bold text-base py-2 rounded-2xl mb-2 flex items-center justify-center gap-2 transition"
            style={{ boxShadow: "0 2px 8px 0 #6EE7B733" }}>
            <FaUserFriends /> Chia sẻ trong các bạn
        </button>
        <button className="w-full bg-[#ECFDF5] text-[#17805C] font-semibold text-base py-2 rounded-2xl mb-2 border border-[#D1FAE5] flex items-center justify-center gap-2 transition">
            <FaGift /> Chia sẻ trong nhóm
        </button>
        <button className="w-full bg-[#F1F5F9] text-[#2563EB] font-semibold text-base py-2 rounded-2xl border border-[#E0E7EF] flex items-center justify-center gap-2 transition">
            <FaPhoneAlt /> Gọi cho bạn
        </button>
        <div className="w-full mt-4 text-xs text-gray-500">
            <div>📅 Đăng ký: 19/01/2022</div>
            <div>📱 SĐT: 0336 **** 38</div>
            <div>🔒 Bảo mật 2 lớp</div>
        </div>
    </div>
);

export default ProfileSidebar;
