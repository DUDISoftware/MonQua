import React from "react";

const ChatListItem = ({ chat, onClick }) => {
  const { receiver, lastMessage, updatedAt } = chat;

  if (!receiver) return null;

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#F6FCFA]"
    >
      {receiver.avatar ? (
        <img
          src={receiver.avatar}
          alt={receiver.name}
          className="w-9 h-9 rounded-full object-cover"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
          {receiver.name?.[0] || "?"}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900 truncate">
            {receiver.name}
          </span>
          <span className="text-xs text-gray-400">
            {updatedAt ? new Date(updatedAt).toLocaleDateString() : ""}
          </span>
        </div>
        <div className="text-sm truncate text-gray-600">{lastMessage || ""}</div>
      </div>
    </div>
  );
};

export default ChatListItem;
