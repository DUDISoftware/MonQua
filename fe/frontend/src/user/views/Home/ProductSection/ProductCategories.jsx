
import React from "react";

// Hỗ trợ chọn nhiều danh mục (multiSelect)
const ProductCategories = ({ categories, selected = [], onSelect, multiSelect = false }) => {
  // selected là mảng các danh mục đã chọn
  const isSelected = (cat) => selected.some(c => c.id === cat.id);

  return (
    <div className="flex flex-wrap gap-6 justify-center mb-8">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => onSelect(cat)}
          className={`flex flex-col items-center cursor-pointer transition ${isSelected(cat) ? "scale-110 border-2 border-[#22C55E]" : "border border-gray-200"
            } p-2 rounded-xl bg-white`}
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#E6F4E6] mb-2 text-2xl text-[#22C55E]">
            🗂
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
