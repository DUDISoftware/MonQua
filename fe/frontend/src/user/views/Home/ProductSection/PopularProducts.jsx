
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList/ProductList";
import { getProducts } from "../../../../api/product.api";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        const data = res.data || [];
        const mapped = data.map((item) => ({
          id: item._id,
          name: item.title,
          image: item.image_url,
          status: item.status,
          desc: item.description,
          location: item.location,
          label: item.label || (item.status === "active" ? "Hiển thị" : item.status === "pending" ? "Chờ duyệt" : "Đã tặng"),
        }));
        setProducts(mapped);
      } catch (err) {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="mb-10 w-full">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Sản phẩm nổi bật</h2>
      <ProductList products={products} />
    </section>
  );
};

export default PopularProducts;
