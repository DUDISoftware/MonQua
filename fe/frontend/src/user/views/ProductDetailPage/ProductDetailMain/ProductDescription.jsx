import React from "react";

const ProductDescription = ({ description = "Áo khoác nữ mùa đông, chất liệu dày dặn, giữ ấm tốt, màu sắc trẻ trung, phù hợp nhiều lứa tuổi." }) => (
    <div className="mb-4 text-gray-700">
        <h2 className="font-semibold mb-1">Mô tả chi tiết</h2>
        <p>{description}</p>
    </div>
);

export default ProductDescription;
