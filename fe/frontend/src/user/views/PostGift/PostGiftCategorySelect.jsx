import React, { useEffect, useState } from "react";
import axios from "axios";

const PostGiftCategorySelect = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
      }
    };
    fetchCategories();
  }, []);

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
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PostGiftCategorySelect;
