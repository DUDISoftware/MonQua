import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { getConversationsByUserId } from "../../../../api/chatApi";

const ChatList = ({ onSelectConversation, onChatsLoaded }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const fetchChats = async () => {
      try {
        const res = await getConversationsByUserId(userId);
        const data = Array.isArray(res.data) ? res.data : [];
        setChats(data);
        onChatsLoaded?.(data); // ✅ Truyền lên MessengerPage
      } catch (err) {
        console.error("Lỗi khi lấy danh sách hội thoại:", err);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="overflow-y-auto px-2 py-3">
      {chats.map((chat) => (
        <ChatListItem
          key={chat._id}
          chat={chat}
          onClick={() =>
            onSelectConversation(chat._id, chat.receiver?._id, chat.productId)
          }
        />
      ))}
    </div>
  );
};


export default ChatList;
