import React, { useState } from "react";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react"; // ✅
import { sendMessage } from "../../../../api/chatApi";
import socket from "../../../../socket";

const MessageInput = ({ conversationId, onSent }) => {
  const [value, setValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // ✅

  const handleSend = async () => {
    const senderId = localStorage.getItem("user_id");
    if (!value.trim() || !senderId || !conversationId) return;

    const message = {
      content: value,
      sender_id: { _id: senderId },
      sent_at: new Date().toISOString(),
    };

    try {
      socket.emit("sendMessage", {
        conversationId,
        message,
      });

      await sendMessage(conversationId, senderId, value); // Lưu DB
      setValue("");
      setShowEmojiPicker(false);
      onSent?.();
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err.message);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setValue((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative flex flex-col border-t border-gray-200">
      {showEmojiPicker && (
        <div className="absolute bottom-14 left-4 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <div className="flex items-center p-4">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-xl text-yellow-500 mr-2"
        >
          <FaSmile />
        </button>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 border rounded-full px-4 py-2"
        />
        <button onClick={handleSend} className="ml-2 text-blue-500 text-xl">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
