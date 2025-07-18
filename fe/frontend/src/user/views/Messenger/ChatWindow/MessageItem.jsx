import React from "react";

const MessageItem = ({ message, isMine }) => {
  if (isMine) {
    return (
      <div className="flex justify-end mb-3">
        <div className="flex flex-col items-end">
          <div className="bg-[#22C55E] text-white px-5 py-2 rounded-2xl rounded-br-sm max-w-xs text-sm">
            {message.content}
          </div>
          <span className="text-xs text-gray-400 mt-1">{message.time}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end mb-3">
      <img
        src={
          message?.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            message.senderName || "User"
          )}`
        }
        alt="avatar"
        className="w-8 h-8 rounded-full object-cover mr-2"
      />
      <div className="flex flex-col items-start">
        <div className="bg-white text-gray-900 px-5 py-2 rounded-2xl rounded-bl-sm border border-[#E6F4F1] max-w-xs text-sm">
          {message.content}
        </div>
        <span className="text-xs text-gray-400 mt-1">{message.time}</span>
      </div>
    </div>
  );
};

export default MessageItem;
