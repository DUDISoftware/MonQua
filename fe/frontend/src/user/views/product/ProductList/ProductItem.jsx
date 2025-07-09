import React from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`); // Chuyển hướng đến trang chi tiết sản phẩm
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl border border-gray-200 p-3 flex flex-col hover:shadow-md transition cursor-pointer relative"
    >
      <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
        product.label === "Mới"
          ? "bg-yellow-400 text-white"
          : "bg-blue-500 text-white"
      }`}>
        {product.label}
      </span>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-contain rounded-lg mb-2 mt-6"
      />
      <div className="font-semibold text-gray-900 mb-1">{product.name}</div>
      <div className="text-xs text-gray-500 mb-1">{product.status}</div>
      <div className="text-xs text-gray-500 mb-1">{product.desc}</div>
      <div className="text-xs text-gray-500 mb-2">{product.location}</div>
      <button
        onClick={handleClick}
        className="mt-auto bg-[#F6F6F6] text-[#22C55E] py-1.5 rounded-lg text-sm font-medium border border-[#22C55E] hover:bg-[#22C55E] hover:text-white transition"
      >
        Xem Chi Tiết
      </button>
    </div>
  );
};

export default ProductItem;
