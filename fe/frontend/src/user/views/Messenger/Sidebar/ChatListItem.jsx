import React from "react";

const ChatListItem = ({ chat }) => (
    <div className={`flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[#F6FCFA] ${chat.unread ? "bg-[#E6F4F1]" : ""}`}>
        {chat.avatar ? (
            <img src={chat.avatar} alt={chat.name} className="w-9 h-9 rounded-full object-cover" />
        ) : (
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                {chat.name[0]}
            </div>
        )}
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 truncate">{chat.name}</span>
                <span className="text-xs text-gray-400">{chat.time}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className={`text-sm truncate ${chat.typing ? "text-[#22C55E] italic" : "text-gray-600"}`}>
                    {chat.typing ? "Typing..." : chat.lastMessage}
                </span>
                {chat.unread > 0 && (
                    <span className="ml-2 bg-[#22C55E] text-white text-xs rounded-full px-2 py-0.5">{chat.unread}</span>
                )}
            </div>
        </div>
    </div>
);

export default ChatListItem;
