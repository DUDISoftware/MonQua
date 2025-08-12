import React from "react";

const CategorySelect = ({ value, onChange, categories, name }) => {
    return (
        <div>
            <label className="block font-semibold text-[#17805C] mb-1">Danh mục *</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-[#B9E5C9] rounded-full px-4 py-2"
                required
            >
                <option value="">Chọn danh mục sản phẩm</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.category_name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySelect;
