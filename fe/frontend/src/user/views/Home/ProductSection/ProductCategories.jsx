import React from "react";
import { FaTshirt, FaBook, FaPuzzlePiece, FaBlender, FaTv, FaLeaf } from "react-icons/fa";

const categories = [
    { name: "Quần áo", icon: <FaTshirt className="text-2xl text-[#22C55E]" /> },
    { name: "Sách vở", icon: <FaBook className="text-2xl text-[#22C55E]" /> },
    { name: "Đồ chơi", icon: <FaPuzzlePiece className="text-2xl text-[#22C55E]" /> },
    { name: "Đồ gia dụng", icon: <FaBlender className="text-2xl text-[#22C55E]" /> },
    { name: "Đồ điện tử", icon: <FaTv className="text-2xl text-[#22C55E]" /> },
    { name: "Cây cảnh", icon: <FaLeaf className="text-2xl text-[#22C55E]" /> },
];

const ProductCategories = () => (
    <div className="flex flex-wrap gap-6 justify-center mb-8">
        {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#E6F4E6] mb-2">
                    {cat.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{cat.name}</span>
            </div>
        ))}
    </div>
);

export default ProductCategories;
