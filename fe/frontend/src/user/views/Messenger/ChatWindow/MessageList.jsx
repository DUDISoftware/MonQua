import React, { useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import { getMessages } from "../../../../api/chatApi";

const MessageList = ({ conversationId, reloadTrigger }) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await getMessages(conversationId);
      const messageList = res?.data;

      if (Array.isArray(messageList)) {
        setMessages(messageList);
      } else {
        console.error("Phản hồi không hợp lệ:", res);
        setMessages([]);
      }
    } catch (err) {
      console.error("Lỗi khi lấy tin nhắn:", err);
    }
  };

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId, reloadTrigger]);

  const currentUserId = localStorage.getItem("user_id");

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg, index) => (
        <MessageItem
          key={index}
          message={{
            content: msg.content,
            senderName: msg?.sender_id?.name,
            avatar: msg?.sender_id?.avatar,
            time: new Date(msg.sent_at).toLocaleTimeString()
          }}
          isMine={msg?.sender_id?._id === currentUserId}
        />
      ))}
    </div>
  );
};

export default MessageList;
