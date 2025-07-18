import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCategories = ({ categories }) => {
  const navigate = useNavigate();

  const handleClick = (cat) => {
    navigate(`/products?category=${cat._id}`);
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center mb-8">
      {categories.map((cat) => (
        <div
          key={cat._id}
          onClick={() => handleClick(cat)}
          className="flex flex-col items-center cursor-pointer transition hover:scale-110"
        >
          <div className="w-36 h-36 flex items-center justify-center rounded-full bg-[#E6F4E6] mb-2 text-2xl text-[#22C55E]">
            <img
              src={cat.image || "https://th.bing.com/th/id/OIP.AfRtBCDCeiWZJqXS4EfbxgHaFx?w=205&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"}
              alt={cat.name}
              className="w-24 h-24 object-cover rounded-full"
            />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {cat.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;
