import React, { lazy, Suspense } from "react";
import XeCoProducts from "./CategoryProducts/XeCoProducts";

// Dynamic import for category components
const categoryComponents = {
  "xe-co": XeCoProducts,
  // Add more category components here as they're created
  // "dien-tu": ElectronicsProducts,
  // "thoi-trang": FashionProducts,
};

// Nhận vào mảng selectedCategories, gọi các component con theo từng danh mục
const CategoryProducts = ({ selectedCategories }) => {
  return (
    <div className="flex flex-col gap-8">
      {selectedCategories.map(cat => {
        const CategoryComponent = categoryComponents[cat.slug];

        if (CategoryComponent) {
          return <CategoryComponent key={cat.id} category={cat} />;
        }

        // Fallback component for categories without a specific component
        return (
          <div key={cat.id} className="p-4 rounded-lg bg-white shadow-md">
            <h3 className="text-xl font-medium text-gray-800 mb-4">{cat.name}</h3>
            <p className="text-gray-500">Sản phẩm cho danh mục này sẽ được hiển thị ở đây.</p>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryProducts;
