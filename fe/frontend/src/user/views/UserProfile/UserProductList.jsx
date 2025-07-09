import React from "react";
import ProductCard from "./ProductCard";

const UserProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <div className="text-center text-gray-500">Không có sản phẩm nào.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default UserProductList;
