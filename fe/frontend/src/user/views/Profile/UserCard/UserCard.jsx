import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaCommentDots } from "react-icons/fa";

const UserCard = () => {
  const [user, setUser] = useState({
    fullname: "",
    role: "",
    phone: "",
    avatar_url: "",
  });

  useEffect(() => {
    const fullname = localStorage.getItem("fullname") || "Người dùng";
    const role = localStorage.getItem("role") || "user";
    const phone = localStorage.getItem("phone") || "Không có số";
    const avatar_url = localStorage.getItem("avatar_url") || "https://randomuser.me/api/portraits/men/32.jpg";

    setUser({ fullname, role, phone, avatar_url });
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center mb-6 shadow-sm">
      <img
        src={user.avatar}
        alt="User"
        className="w-20 h-20 rounded-full object-cover mb-2 border-4 border-[#22C55E]"
      />
      <div className="font-bold text-lg text-[#17805C] mb-1">{user.fullname}</div>
      <span className="bg-[#E6F4E6] text-[#22C55E] px-3 py-1 rounded-full text-xs font-medium mb-2">
        {user.role === "user" ? "Người dùng" : "Quản lý"}
      </span>
      <div className="text-xs text-gray-500 mb-4">
        Số điện thoại: {user.phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 *** $3")}
      </div>
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
};

export default UserCard;
