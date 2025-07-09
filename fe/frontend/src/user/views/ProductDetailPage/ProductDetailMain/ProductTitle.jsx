import React from "react";

const ProductTitle = ({ title }) => (
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        {title || "Không có tiêu đề"}
    </h1>
);

export default ProductTitle;
