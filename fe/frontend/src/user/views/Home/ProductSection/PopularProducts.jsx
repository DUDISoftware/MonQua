// PopularProducts.jsx
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { getPopularProducts } from "../../../../api/productApi"; // đường dẫn đúng tới file bạn export

const PopularProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await getPopularProducts(); // GỌI từ productApi

        const data = Array.isArray(res) ? res : res.products;

        const mapped = data.map((item) => ({
          id: item._id,
          name: item.title,
          image: item.image_url,
          status: item.status,
          desc: item.description,
          location: item.location,
          label:
            item.view_count > item.interested_count
              ? "Xem nhiều"
              : "Quan tâm nhiều",
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm phổ biến:", err.message);
      }
    };

    fetchPopular();
  }, []);

  return (
    <section className="mb-10 w-full">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Danh sách phổ biến</h2>
      <ProductList products={products} />
    </section>
  );
};

export default PopularProducts;
