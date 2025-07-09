import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { getProductsByCategory } from "../../../../api/productApi";

const CategoryProducts = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!category?.id) return;

    const fetch = async () => {
      try {
        const res = await getProductsByCategory(category.id);
        const mapped = res.map((item) => ({
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
        console.error("Lỗi khi lấy sản phẩm theo danh mục:", err.message);
      }
    };

    fetch();
  }, [category]);

  if (!category) return null;

  return (
    <section className="mb-10 w-full">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
        Danh mục: {category.name}
      </h2>
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p className="text-center text-gray-500">Không có sản phẩm nào.</p>
      )}
    </section>
  );
};

export default CategoryProducts;
