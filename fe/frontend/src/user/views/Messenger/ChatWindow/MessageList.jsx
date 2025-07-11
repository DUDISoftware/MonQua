import React, { useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import { getMessages, getProductById } from "../../../../api/chatApi"; // đảm bảo bạn có API này
import ProductHeader from "./ProductHeader"; // ✅ Sử dụng component mới

const MessageList = ({ conversationId, reloadTrigger, productId }) => {
  const [messages, setMessages] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (conversationId) fetchMessages();
  }, [conversationId, reloadTrigger]);

  useEffect(() => {
    if (productId) fetchProduct();
  }, [productId]);

  const fetchMessages = async () => {
    try {
      const res = await getMessages(conversationId);
      setMessages(res?.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy tin nhắn:", err);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await getProductById(productId);
      setProduct(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
    }
  };

  const currentUserId = localStorage.getItem("user_id");

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {/* 🛒 Sản phẩm */}
      {product && <ProductHeader product={product} />}

      {/* 💬 Danh sách tin nhắn */}
      {messages.map((msg, index) => (
        <MessageItem
          key={index}
          message={{
            content: msg.content,
            senderName: msg?.sender_id?.name,
            avatar: msg?.sender_id?.avatar,
            time: new Date(msg.sent_at).toLocaleTimeString(),
          }}
          isMine={msg?.sender_id?._id === currentUserId}
        />
      ))}
    </div>
  );
};

export default MessageList;
