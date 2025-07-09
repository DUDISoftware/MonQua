import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByUser } from "../../../api/productApi";
import UserTabProductList from "./UserTabProductList"; // 👈 sử dụng component mới
import UserDifferent from "./UserDifferent";

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // 👈 tab đang active

  useEffect(() => {
    const currentUserId = localStorage.getItem("user_id");
    if (userId === currentUserId) {
      navigate("/profile");
      return;
    }

    const fetchByUser = async () => {
      try {
        const res = await getProductsByUser(userId);
        if (res.length > 0 && res[0].user_id) {
          const user = typeof res[0].user_id === "object"
            ? res[0].user_id
            : { _id: res[0].user_id };
          setUserInfo(user);
        }
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm người dùng:", err.message);
      }
    };

    fetchByUser();
  }, [userId, navigate]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col-reverse lg:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4 text-[#17805C] text-center lg:text-left">
            Sản phẩm của người dùng
          </h2>
          <UserTabProductList
            userId={userId}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <aside className="w-full lg:w-72 flex-shrink-0">
          {userInfo && <UserDifferent user={userInfo} />}
        </aside>
      </div>
    </div>
  );
};

export default UserProfilePage;
