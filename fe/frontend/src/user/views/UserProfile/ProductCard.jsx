import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleDetailClick = (e) => {
    e.stopPropagation();
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className={`bg-white rounded-xl border p-3 flex flex-col cursor-pointer relative transition-all
      hover:shadow-md border-gray-200`}
    >
      {/* Label */}
      <span
        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold 
        ${product.label === "Mới" ? "bg-yellow-400 text-white" : "bg-blue-500 text-white"}`}
      >
        {product.label}
      </span>

      {/* Hình ảnh */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-contain rounded-lg mb-2 mt-6"
      />

      {/* Tiêu đề, trạng thái, mô tả, vị trí */}
      <div className="font-semibold text-gray-900 mb-1">{product.name}</div>
      <div className="text-xs text-gray-500 mb-1">{product.status}</div>
      <div className="text-xs text-gray-500 mb-1 line-clamp-2">{product.desc}</div>
      <div className="text-xs text-gray-500 mb-2">{product.location}</div>

      {/* Nút xem chi tiết */}
      <button
        onClick={handleDetailClick}
        className="mt-auto bg-[#E6F4E6] text-[#22C55E] py-1.5 rounded-lg text-sm font-semibold border border-[#22C55E] hover:bg-[#22C55E] hover:text-white transition"
      >
        Xem Chi Tiết
      </button>
    </div>
  );
};

export default ProductCard;
