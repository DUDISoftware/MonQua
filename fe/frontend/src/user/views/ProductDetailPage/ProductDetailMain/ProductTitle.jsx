import React from "react";

const ProductTitle = ({ title }) => (
    <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-2">
            {title || "Sản phẩm chia sẻ"}
        </h1>
        <div className="w-16 h-1 bg-blue-500 rounded"></div>
    </div>
);

export default ProductTitle;
