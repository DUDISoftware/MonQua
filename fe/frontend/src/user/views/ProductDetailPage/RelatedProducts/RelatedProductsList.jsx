import React from "react";
import RelatedProductItem from "./RelatedProductItem";

const related = [
    { id: 1, name: "Áo len nữ", image: "https://via.placeholder.com/100", status: "Mới", location: "Q3, TPHCM" },
    { id: 2, name: "Áo khoác nam", image: "https://via.placeholder.com/100", status: "Đã sử dụng", location: "Q5, TPHCM" },
];

const RelatedProductsList = () => (
    <div className="mt-8">
        <h3 className="font-bold text-lg mb-4">Sản phẩm liên quan</h3>
        <div className="grid grid-cols-2 gap-4">
            {related.map(item => (
                <RelatedProductItem key={item.id} product={item} />
            ))}
        </div>
    </div>
);

export default RelatedProductsList;
