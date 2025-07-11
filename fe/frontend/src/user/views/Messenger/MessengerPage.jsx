import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import UserProfileCard from "./Sidebar/UserProfileCard";
import StatusList from "./Sidebar/StatusList";
import ChatList from "./Sidebar/ChatList";
import ChatHeader from "./ChatWindow/ChatHeader";
import MessageList from "./ChatWindow/MessageList";
import MessageInput from "./ChatWindow/MessageInput";
import { createConversation } from "../../../api/chatApi";
import socket from "../../../socket";

const MessengerPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [conversationId, setConversationId] = useState(null);
  const [receiverId, setReceiverId] = useState(params.get("user"));
  const [productId, setProductId] = useState(params.get("product"));
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const hasFetched = useRef(false);

  const handleSelectConversation = (id, receiver, product) => {
    setConversationId(id);
    setReceiverId(receiver);
    setProductId(product);
  };

  useEffect(() => {
    if (conversationId) {
      socket.emit("joinRoom", conversationId);
    }
  }, [conversationId]);
useEffect(() => {
  const userId = localStorage.getItem("user_id");
  if (userId) {
    socket.emit("registerUser", userId); // 👈 đăng ký khi user kết nối
  }
}, []);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId || !receiverId || !productId || hasFetched.current) return;

    hasFetched.current = true;

    const fetchOrCreateConversation = async () => {
      try {
        const res = await createConversation(userId, receiverId, productId);
        if (res.data && res.data.length > 0) {
          setConversationId(res.data[0]._id);
        }
      } catch (error) {
        console.error("Lỗi tạo hội thoại:", error);
      }
    };

    fetchOrCreateConversation();
  }, [receiverId, productId]);

  return (
    <div className="min-h-screen w-full bg-[#E6F4F1] flex items-center justify-center py-4">
      <div className="w-full max-w-6xl h-[80vh] flex rounded-2xl overflow-hidden shadow-lg bg-transparent">
        <aside className="w-[340px] bg-white h-full flex-shrink-0 flex flex-col border-r border-[#E6F4F1]">
          <UserProfileCard />
          <StatusList />
          <ChatList onSelectConversation={handleSelectConversation} />
        </aside>
        <div className="flex-1 flex flex-col bg-[#F6FCFA] h-full">
          <ChatHeader userId={receiverId} />
          <MessageList
            userId={receiverId}
            productId={productId}
            conversationId={conversationId}
            reloadTrigger={reloadTrigger}
          />
          <MessageInput
            conversationId={conversationId}
            onSent={() => setReloadTrigger(prev => prev + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default MessengerPage;
