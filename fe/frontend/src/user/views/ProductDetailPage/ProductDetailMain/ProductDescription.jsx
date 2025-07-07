import React from "react";

const ProductDescription = ({ description }) => (
    <div className="mb-4 text-gray-700">
        <h2 className="font-semibold mb-1">Mô tả chi tiết</h2>
        <p>{description || "Không có mô tả chi tiết."}</p>
    </div>
);

export default ProductDescription;
