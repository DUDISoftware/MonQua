import React from "react";

const StatusList = ({ chats = [], onlineUsers = [], onSelectConversation }) => {
  // Lấy danh sách người nhận duy nhất từ chats
  const uniqueUsersMap = new Map();
  chats.forEach(chat => {
    if (chat.receiver && !uniqueUsersMap.has(chat.receiver._id)) {
      uniqueUsersMap.set(chat.receiver._id, chat);
    }
  });
  const users = Array.from(uniqueUsersMap.values());

  return (
    <div className="flex items-center px-6 py-3 border-b border-[#E6F4F1]">
      <span className="text-xs text-gray-500 mr-4">Status</span>
      <div className="flex gap-2 flex-1 overflow-x-auto">
        {users.map(chat => {
          const user = chat.receiver;
          const isOnline = onlineUsers.includes(user._id);
          return (
            <div
              key={user._id}
              className="flex flex-col items-center cursor-pointer"
              title={user.name}
              onClick={() =>
                onSelectConversation(chat._id, user._id, chat.productId)
              }
            >
              <div className="relative">
                <img
                  src={
                    user.avatar?.startsWith("http")
                      ? user.avatar
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name || "User"
                        )}`
                  }
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#22C55E]"
                />
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
              </div>
            </div>
          );
        })}
      </div>
      <button className="text-xs text-[#22C55E] font-semibold ml-2">View All</button>
    </div>
  );
};

export default StatusList;
