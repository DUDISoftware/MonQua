import React from "react";

const UserProfileCard = () => {
  const fullName = localStorage.getItem("fullname");
  const phone = localStorage.getItem("phone");
  const role = localStorage.getItem("role");

  return (
    <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E6F4F1]">
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
          fullName || "User"
        )}&background=random`}
        alt="User"
        className="w-14 h-14 rounded-full object-cover"
      />
      <div>
        <div className="font-semibold text-gray-900 text-lg">
          {fullName || "Unknown User"}
        </div>
        <div className="text-xs text-gray-400">
          {role === "admin" ? "Quản trị viên" : "Đang hoạt động"}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
