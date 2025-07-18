import React, { useState } from "react";
import { FaPaperPlane, FaSmile, FaImage, FaPlus } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { sendMessage } from "../../../../api/chatApi";
import socket from "../../../../socket";

const MessageInput = ({ conversationId, onSent }) => {
  const [value, setValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSend = async () => {
    const senderId = localStorage.getItem("user_id");
    if (!value.trim() || !senderId || !conversationId) return;

    const message = {
      content: value,
      sender_id: { _id: senderId },
      sent_at: new Date().toISOString(),
    };

    try {
      socket.emit("sendMessage", { conversationId, message });
      await sendMessage(conversationId, senderId, value);
      setValue("");
      setShowEmojiPicker(false);
      onSent?.();
    } catch (err) {
      console.error("❌ Lỗi gửi tin nhắn:", err.message);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setValue((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative border-t border-[#E6F4F1] bg-white">
            {/* Gợi ý nhanh */}
      <div className="px-4 py-2 text-sm text-gray-500 flex gap-3 overflow-x-auto scrollbar-hide">
        {["Sản phẩm còn không?", "Giá bao nhiêu?", "Có ship không?"].map(
          (msg, idx) => (
            <button
              key={idx}
              onClick={() => setValue(msg)}
              className="bg-[#F0F7F5] text-gray-700 rounded-full px-4 py-1 hover:bg-[#e1efe8]"
            >
              {msg}
            </button>
          )
        )}
      </div>
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <div className="flex items-center px-4 py-2 gap-2">
        <button className="text-green-500">
          <FaPlus />
        </button>
        <button className="text-green-500">
          <FaImage />
        </button>
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-yellow-500"
        >
          <FaSmile />
        </button>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Aa"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="text-blue-500 text-xl px-2"
          title="Gửi"
        >
          <FaPaperPlane />
        </button>
      </div>


    </div>
  );
};

export default MessageInput;
