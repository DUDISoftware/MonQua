import React, { useEffect, useState } from "react";
import { getUserById } from "../../../../api/UserApi";
import socket from "../../../../socket";

const ChatHeader = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
useEffect(() => {
  if (!userId) return;

  socket.emit("checkOnline", userId, (online) => {
    setIsOnline(online);
  });

  socket.on("userOnline", (id) => {
    if (id === userId) setIsOnline(true);
  });

  socket.on("userOffline", (id) => {
    if (id === userId) setIsOnline(false);
  });

  return () => {
    socket.off("userOnline");
    socket.off("userOffline");
  };
}, [userId]);


  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getUserById(userId, token);
        if (data?.data?.length > 0) {
          setUser(data.data[0]);
        }
      } catch (err) {
        console.error("❌ Lỗi lấy thông tin người dùng:", err.message);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) return null;

  return (
    <div className="flex items-center justify-between border-b border-[#E6F4F1] px-6 py-4 bg-[#F6FCFA]">
      <div className="flex items-center gap-3">
        <img
          src={
            user.avatar_url?.startsWith("http")
              ? user.avatar_url
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name || "User"
                )}`
          }
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-gray-900">
            {user.name || "Người dùng"}
          </div>
          <div className={`text-xs ${isOnline ? "text-green-500" : "text-gray-400"}`}>
            {isOnline ? "Đang hoạt động" : "Ngoại tuyến"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
