
import React from "react";
import { useNavigate } from "react-router-dom";

// Hỗ trợ chọn nhiều danh mục (multiSelect)
const ProductCategories = ({ categories, selected = [], onSelect, multiSelect = false }) => {
  const navigate = useNavigate();

  // Hỗ trợ navigation nếu không dùng multiSelect
  const handleNavigation = (cat) => {
    if (!multiSelect) {
      navigate(`/products?category=${cat._id}`);
    } else {
      onSelect(cat);
    }
  };

  // selected là mảng các danh mục đã chọn
  const isSelected = (cat) => selected.some(c => c.id === cat.id);
  return (
    <div className="flex flex-wrap gap-6 justify-center mb-8">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => handleNavigation(cat)}
          className={`flex flex-col items-center cursor-pointer transition ${isSelected(cat) ? "scale-110 border-2 border-[#22C55E]" : "border border-gray-200"
            } p-2 rounded-xl bg-white`}
        >
          <div className="w-36 h-36 flex items-center justify-center rounded-full bg-[#E6F4E6] mb-2 text-2xl text-[#22C55E]">
            <img
              src={cat.image || "https://th.bing.com/th/id/OIP.AfRtBCDCeiWZJqXS4EfbxgHaFx?w=205&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"}
              alt={cat.name}
              className="w-24 h-24 object-cover rounded-full"
            />
          </div>
          <span
            className={`text-sm font-medium ${isSelected(cat) ? "text-[#22C55E]" : "text-gray-700"
              }`}
          >
            {cat.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;
