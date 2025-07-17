import React, { useEffect, useState } from "react";
import { getCategories } from "../../../../api/product.category.api.js";

const FilterBar = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full flex flex-wrap gap-3 mb-6">
      <select
        className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 min-w-[120px]"
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Tất cả</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Các filter khác giữ nguyên */}
      <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 min-w-[120px]">
        <option>Khu vực</option>
        <option>Hà Nội</option>
        <option>TP. HCM</option>
        <option>Đà Nẵng</option>
      </select>

      <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 min-w-[120px]">
        <option>Tình trạng</option>
        <option>Tất cả</option>
        <option>Mới</option>
        <option>Đã sử dụng</option>
      </select>

      <div className="flex items-center gap-2">
        <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 min-w-[120px]">
          <option>Khoảng cách</option>
          <option>Dưới 5km</option>
          <option>Dưới 10km</option>
          <option>Bất kỳ</option>
        </select>
        <span className="text-gray-400 text-sm">Km</span>
      </div>
    </div>
  );
};

export default FilterBar;
