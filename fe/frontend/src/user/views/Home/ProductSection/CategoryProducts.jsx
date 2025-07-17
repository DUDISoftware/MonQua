

import React from "react";
import XeCoProducts from "./CategoryProducts/XeCoProducts";

// Nhận vào mảng selectedCategories, gọi các component con theo từng danh mục
const CategoryProducts = ({ selectedCategories }) => {
  return (
    <div className="flex flex-col gap-8">
      {selectedCategories.map(cat => {
        if (cat.slug === "xe-co") {
          return <XeCoProducts key={cat.id} category={cat} />;
        }
        // Có thể mở rộng thêm các danh mục khác
        return null;
      })}
    </div>
  );
};

export default CategoryProducts;
