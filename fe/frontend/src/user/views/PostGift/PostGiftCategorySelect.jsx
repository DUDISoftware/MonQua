import React, { useEffect, useState } from "react";
import { getCategories } from "../../../api/product.category.api";

const PostGiftCategorySelect = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(token);
        const categoriesData = response.data || response.categories || response;
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
      }
    };
    fetchCategories();
  }, [token]);

  return (
    <div>
      <label className="block font-semibold text-[#17805C] mb-1">Danh Mục</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#B9E5C9] rounded-full px-4 py-2"
      >
        <option value="">Chọn Danh Mục</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.category_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PostGiftCategorySelect;
