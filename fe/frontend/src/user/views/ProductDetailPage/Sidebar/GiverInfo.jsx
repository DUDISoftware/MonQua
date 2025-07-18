import React from "react";
import { useNavigate } from "react-router-dom";

const GiverInfo = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return null;
  const handleChat = () => {
    const currentUserId = localStorage.getItem("user_id");
    const receiverId = user._id;
    const productId = user.productId || user._productId || user.product_id || "";

    console.log("🔍 currentUserId:", currentUserId);
    console.log("🔍 receiverId:", receiverId);
    console.log("🔍 productId:", productId);

    if (!currentUserId || !receiverId) return;

    navigate(`/messenger?user=${receiverId}&product=${productId}`);
  };

  const handleViewMore = () => {
    const currentUserId = String(localStorage.getItem("user_id") || "");
    const productOwnerId = String(user._id || "");

    if (productOwnerId === currentUserId) {
      navigate("/profile");
    } else {
      navigate(`/user/${productOwnerId}`);
    }
  };


  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex flex-col items-center">
      <img
        src={user.avatar || "https://randomuser.me/api/portraits/women/44.jpg"}
        alt="Người tặng"
        className="w-20 h-20 rounded-full object-cover mb-2"
      />
      <div className="font-semibold text-lg text-[#17805C] mb-0.5">
        {user.full_name || user.name || "Không rõ"}
      </div>

      <button
        onClick={handleViewMore}
        className="text-sm text-[#17805C] mb-4 font-medium hover:underline"
      >
        Xem thêm sản phẩm
      </button>

      {user.phone && (
        <button
          className="w-full bg-[#6EE7B7] text-[#17805C] font-bold text-lg py-3 rounded-2xl mb-3 transition"
          style={{ boxShadow: "0 2px 8px 0 #6EE7B733" }}
        >
          Gọi: {user.phone.slice(0, 4)} **** {user.phone.slice(-2)}
        </button>
      )}

      <button
        onClick={handleChat}
        className="w-full bg-[#ECFDF5] text-[#17805C] font-semibold text-lg py-3 rounded-2xl mb-3 border border-[#D1FAE5] transition"
      >
        Chat với người tặng
      </button>

      {user.zalo && (
        <a
          href={`https://zalo.me/${user.zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center bg-[#F1F5F9] text-[#2563EB] font-semibold text-lg py-3 rounded-2xl border border-[#E0E7EF] transition block"
        >
          Chat qua Zalo
        </a>
      )}
    </div>
  );
};

export default GiverInfo;
