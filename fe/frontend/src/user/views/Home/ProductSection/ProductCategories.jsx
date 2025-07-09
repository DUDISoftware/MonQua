import React from "react";

const ProductCategories = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center mb-8">
      {categories.map((cat) => (
        <div
          key={cat._id}
          onClick={() => onSelect({ id: cat._id, name: cat.name })}
          className={`flex flex-col items-center cursor-pointer transition ${
            selected?.id === cat._id ? "scale-110" : ""
          }`}
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#E6F4E6] mb-2 text-2xl text-[#22C55E]">
            🗂
          </div>
          <span
            className={`text-sm font-medium ${
              selected?.id === cat._id ? "text-[#22C55E]" : "text-gray-700"
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
