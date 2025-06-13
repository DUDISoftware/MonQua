import React from "react";

const RelatedProductItem = ({ product }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-3 flex flex-col hover:shadow-md transition cursor-pointer">
        <img
            src={product.image}
            alt={product.name}
            className="w-full h-20 object-contain rounded-lg mb-2"
        />
        <div className="font-semibold text-gray-900 mb-1">{product.name}</div>
        <div className="text-xs text-gray-500 mb-1">{product.status}</div>
        <div className="text-xs text-gray-500">{product.location}</div>
    </div>
);

export default RelatedProductItem;
