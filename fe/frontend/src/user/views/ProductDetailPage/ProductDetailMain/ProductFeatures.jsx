import React from "react";

const ProductFeatures = ({ status, location }) => (
    <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
            <span className="font-semibold">Tình trạng:</span> {status || "Chưa xác định"}
        </div>
        <div>
            <span className="font-semibold">Khu vực:</span> {location || "Không có thông tin"}
        </div>
    </div>
);

export default ProductFeatures;
