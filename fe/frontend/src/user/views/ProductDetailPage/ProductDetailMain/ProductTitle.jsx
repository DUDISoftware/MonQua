import React from "react";

const ProductTitle = ({ title = "Áo khoác nữ mùa đông" }) => (
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
);

export default ProductTitle;
