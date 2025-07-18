import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { getConversationsByUserId } from "../../../../api/chatApi";

const ChatList = ({ onSelectConversation, onChatsLoaded }) => {
  const [chats, setChats] = useState([]);
  const uniqueChats = chats.filter((chat, index, self) =>
    index === self.findIndex((c) => c._id === chat._id)
  );

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const fetchChats = async () => {
      try {
        const res = await getConversationsByUserId(userId);
        const data = Array.isArray(res.data) ? res.data : [];

        // Lọc trùng theo _id
        const uniqueData = Array.from(new Map(data.map(chat => [chat._id, chat])).values());

        setChats(uniqueData);
        onChatsLoaded?.(uniqueData);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách hội thoại:", err);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="overflow-y-auto px-2 py-3">
      {uniqueChats.map((chat) => (
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
