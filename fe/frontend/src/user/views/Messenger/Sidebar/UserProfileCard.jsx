import React from "react";

const UserProfileCard = () => (
    <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E6F4F1]">
        <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="w-14 h-14 rounded-full object-cover"
        />
        <div>
            <div className="font-semibold text-gray-900 text-lg">Thành Nhân</div>
            <div className="text-xs text-gray-400">Busy</div>
        </div>
    </div>
);

export default UserProfileCard;
