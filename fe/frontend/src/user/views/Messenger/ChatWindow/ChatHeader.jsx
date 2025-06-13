import React from "react";

const ChatHeader = ({
    name = "Tuấn Đan",
    avatar = "https://randomuser.me/api/portraits/men/32.jpg",
    status = "Online 10' trước",
    group = [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/44.jpg",
        "https://randomuser.me/api/portraits/men/31.jpg",
    ],
}) => (
    <div className="flex items-center justify-between border-b border-[#E6F4F1] px-6 py-4 bg-[#F6FCFA]">
        <div className="flex items-center gap-3">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
            <div>
                <div className="font-semibold text-gray-900">{name}</div>
                <div className="text-xs text-gray-400">{status}</div>
            </div>
        </div>
        <div className="flex -space-x-2">
            {group.map((g, idx) => (
                <img
                    key={idx}
                    src={g}
                    alt="group"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                />
            ))}
        </div>
    </div>
);

export default ChatHeader;
