import React, { useState, useEffect } from "react";
import ProductItem from "./ProductCard";
import { getProductsByUser } from "../../../api/productApi";
import ProfileTabs from "../Profile/Tabs/ProfileTabs";

const UserTabProductList = ({ userId, activeTab, onTabChange, isCurrentUser }) => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [counts, setCounts] = useState({ total: 0, active: 0, given: 0 });

  useEffect(() => {
    if (!userId) return;

    const fetchUserProducts = async () => {
      try {
        const data = await getProductsByUser(userId);

        // Nếu là user khác => loại bỏ sản phẩm chờ duyệt
        const visibleData = isCurrentUser
          ? data
          : data.filter(p => p.status === "active" || p.status === "given");

        setProducts(visibleData);

        const total = visibleData.length;
        const activeCount = visibleData.filter(p => p.status === "active").length;
        const givenCount = visibleData.filter(p => p.status === "given").length;
        setCounts({ total, active: activeCount, given: givenCount });
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm người dùng:", err);
      }
    };

    fetchUserProducts();
  }, [userId, isCurrentUser]);

  const filterByStatus = (product) => {
    switch (activeTab) {
      case 0: return true;
      case 1: return product.status === "active";
      case 2: return product.status === "given";
      default: return true;
    }
  };

  const filteredProducts = products.filter(filterByStatus);

  return (
    <>
      <ProfileTabs
        active={activeTab}
        onChangeTab={onTabChange}
        counts={counts}
        hidePending={!isCurrentUser} // 👈 thêm prop để ẩn tab
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductItem
            key={product._id}
            product={{
              id: product._id,
              name: product.title,
              image: product.image_url,
              status: product.status,
              desc: product.description,
              location: product.location,
              label:
                product.status === "active"
                  ? "Hiển thị"
                  : product.status === "pending"
                    ? "Chờ duyệt"
                    : "Đã tặng",
            }}
            active={selected === product._id}
            onClick={() => setSelected(product._id)}
          />
        ))}
      </div>
    </>
  );
};

export default UserTabProductList;
