
<<<<<<< HEAD

import React from "react";
import XeCoProducts from "./CategoryProducts/XeCoProducts";
=======
const CategoryProducts = ({ category }) => {
>>>>>>> 16d1fb35c0ffb2115d323503e1a5e8e296e76c83

// Nhận vào mảng selectedCategories, gọi các component con theo từng danh mục
const CategoryProducts = ({ selectedCategories }) => {
  return (
<<<<<<< HEAD
    <div className="flex flex-col gap-8">
      {selectedCategories.map(cat => {
        if (cat.slug === "xe-co") {
          return <XeCoProducts key={cat.id} category={cat} />;
        }
        // Có thể mở rộng thêm các danh mục khác
        return null;
      })}
    </div>
=======
    <section className="mb-10 w-full">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-[#2E5E31]">
        DANH MỤC PHỔ BIẾN
      </h2>
        <p className="text-center text-gray-500">Khám phá các danh mục món đồ được chia sẻ nhiều nhất trong cộng đồng</p>
    </section>
>>>>>>> 16d1fb35c0ffb2115d323503e1a5e8e296e76c83
  );
};

export default CategoryProducts;
