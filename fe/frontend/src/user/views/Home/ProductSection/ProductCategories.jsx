
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCategories = ({ categories }) => {
  const navigate = useNavigate();

  const handleClick = (cat) => {
    navigate(`/products?category=${cat._id}`);
  };

<<<<<<< HEAD
// Hỗ trợ chọn nhiều danh mục (multiSelect)
const ProductCategories = ({ categories, selected = [], onSelect, multiSelect = false }) => {
  // selected là mảng các danh mục đã chọn
  const isSelected = (cat) => selected.some(c => c.id === cat.id);

=======
>>>>>>> 16d1fb35c0ffb2115d323503e1a5e8e296e76c83
  return (
    <div className="flex flex-wrap gap-6 justify-center mb-8">
      {categories.map((cat) => (
        <div
<<<<<<< HEAD
          key={cat.id}
          onClick={() => onSelect(cat)}
          className={`flex flex-col items-center cursor-pointer transition ${isSelected(cat) ? "scale-110 border-2 border-[#22C55E]" : "border border-gray-200"
            } p-2 rounded-xl bg-white`}
=======
          key={cat._id}
          onClick={() => handleClick(cat)}
          className="flex flex-col items-center cursor-pointer transition hover:scale-110"
>>>>>>> 16d1fb35c0ffb2115d323503e1a5e8e296e76c83
        >
          <div className="w-36 h-36 flex items-center justify-center rounded-full bg-[#E6F4E6] mb-2 text-2xl text-[#22C55E]">
            <img
              src={cat.image || "https://th.bing.com/th/id/OIP.AfRtBCDCeiWZJqXS4EfbxgHaFx?w=205&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"}
              alt={cat.name}
              className="w-24 h-24 object-cover rounded-full"
            />
          </div>
<<<<<<< HEAD
          <span
            className={`text-sm font-medium ${isSelected(cat) ? "text-[#22C55E]" : "text-gray-700"
              }`}
          >
=======
          <span className="text-sm font-medium text-gray-700">
>>>>>>> 16d1fb35c0ffb2115d323503e1a5e8e296e76c83
            {cat.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;
