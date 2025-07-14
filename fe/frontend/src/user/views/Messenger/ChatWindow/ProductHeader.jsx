import React from "react";

const ProductHeader = ({ product }) => {
  if (!product) return null;

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-start gap-4">
      <img
        src={product.image_url || "https://via.placeholder.com/80"}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div>
        <div className="font-bold text-[#17805C] text-base mb-1">{product.title}</div>
        <div className="text-sm text-gray-600">{product.description || "Không có mô tả."}</div>
      </div>
    </div>
  );
};

export default ProductHeader;
