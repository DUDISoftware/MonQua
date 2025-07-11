import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { sendMessage } from "../../../../api/chatApi";

const MessageInput = ({ conversationId, onSent }) => {
  const [value, setValue] = useState("");

  const handleSend = async () => {
    const senderId = localStorage.getItem("user_id");
    if (!value.trim() || !senderId || !conversationId) return;

    try {
      await sendMessage(conversationId, senderId, value);
      setValue("");
      onSent?.(); // 🔁 notify parent to reload
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err.message);
    }
  };

  return (
    <div className="flex items-center p-4 border-t border-gray-200">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập tin nhắn..."
        className="flex-1 border rounded-full px-4 py-2"
      />
      <button onClick={handleSend} className="ml-2 text-blue-500">
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default MessageInput;
