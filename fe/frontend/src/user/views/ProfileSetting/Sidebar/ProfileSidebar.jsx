import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaUserFriends, FaGift, FaPhoneAlt } from "react-icons/fa";
import moment from "moment"; // npm install moment nếu chưa có

const ProfileSidebar = () => {
  const [user, setUser] = useState({
    fullname: "",
    phone: "",
    avatar_url: "",
    created_at: "",
  });

  useEffect(() => {
    const fullname = localStorage.getItem("fullname") || "Người dùng";
    const phone = localStorage.getItem("phone") || "0000000000";
    const avatar_url = localStorage.getItem("avatar_url") || "https://randomuser.me/api/portraits/men/32.jpg";
    const created_at = localStorage.getItem("created_at") || new Date().toISOString();

    setUser({ fullname, phone, avatar_url, created_at });
  }, []);

  // 🔒 Ẩn sdt: hiện 2 số đầu, 2 số cuối, che giữa
  const maskedPhone = user.phone.replace(/(\d{3})(\d{4})(\d{3})/, "$1 **** $3");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center mb-6 shadow-sm min-w-[260px]">
      <img
        src={user.avatar_url}
        alt="User"
        className="w-20 h-20 rounded-full object-cover mb-2 border-4 border-[#22C55E]"
      />
      <div className="font-bold text-lg text-[#17805C] mb-1">{user.fullname}</div>
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
        <div>📅 Đăng ký: {moment(user.created_at).format("DD/MM/YYYY")}</div>
        <div>📱 SĐT: {maskedPhone}</div>
        <div>🔒 Bảo mật 2 lớp</div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
