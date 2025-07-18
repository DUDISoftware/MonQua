import React, { useEffect, useState } from "react";
import { FiPhone, FiVideo, FiMoreVertical } from "react-icons/fi";
import { getUserById } from "../../../../api/user.api";
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
        const res = await getUserById(userId, token);
        if (res?.data?.length > 0) {
          setUser(res.data[0]);
        }
      } catch (err) {
        console.error("❌ Lỗi lấy thông tin người dùng:", err.message);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#F6FCFA] border-b border-[#E6F4F1]">
      <div className="flex items-center gap-3">
        <img
          src={
            user.avatar_url?.startsWith("http")
              ? user.avatar_url
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}`
          }
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">{user.name || "Người dùng"}</div>
          <div className={`text-sm ${isOnline ? "text-green-500" : "text-gray-400"}`}>
            {isOnline ? "Đang hoạt động" : "Ngoại tuyến"}
          </div>
        </div>
      </div>
      <div className="flex gap-4 text-green-500 text-xl">
        <FiPhone />
        <FiVideo />
        <FiMoreVertical />
      </div>
    </div>
  );
};

export default ChatHeader;
