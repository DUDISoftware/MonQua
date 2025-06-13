import React from "react";

const ProductFeatures = ({
    status = "Mới 95%",
    location = "Q1, TP.HCM",
    size = "M",
    color = "Xanh navy",
    material = "Nỉ bông",
}) => (
    <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
            <span className="font-semibold">Tình trạng:</span> {status}
        </div>
        <div>
            <span className="font-semibold">Khu vực:</span> {location}
        </div>
        <div>
            <span className="font-semibold">Size:</span> {size}
        </div>
        <div>
            <span className="font-semibold">Màu sắc:</span> {color}
        </div>
        <div>
            <span className="font-semibold">Chất liệu:</span> {material}
        </div>
    </div>
);

export default ProductFeatures;
