import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../../../api/categoryApi";

const FilterBar = ({
  onCategoryChange,
  onQualityChange,
  selectedCategory,
  selectedQuality,
}) => {
  const [categories, setCategories] = useState([]);
  const qualityOptions = [
    { value: "new", label: "Mới" },
    { value: "used", label: "Đã sử dụng" },
    { value: "like_new_90", label: "Như mới (90%)" },
    { value: "like_new_70", label: "Như mới (70%)" },
  ];

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
      {/* Danh mục */}
      <select
        value={selectedCategory}
        className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 min-w-[140px]"
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Tất cả danh mục</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Tình trạng */}
      <select
        value={selectedQuality}
        className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 min-w-[140px]"
        onChange={(e) => onQualityChange(e.target.value)}
      >
        <option value="">Tình trạng</option>
        {qualityOptions.map((q) => (
          <option key={q.value} value={q.value}>
            {q.label}
          </option>
        ))}
      </select>

      {/* Khu vực (chỉ hiển thị UI nếu bạn chưa implement filter thật) */}
      <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 min-w-[140px]">
        <option>Khu vực</option>
        <option>Hà Nội</option>
        <option>TP. HCM</option>
        <option>Đà Nẵng</option>
      </select>

      <div className="flex items-center gap-2">
        <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 min-w-[140px]">
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
