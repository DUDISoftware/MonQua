import React from "react";
import RelatedProductItem from "./RelatedProductItem.jsx";

const RelatedProductsList = ({ relatedProducts = [] }) => {
    if (!relatedProducts || relatedProducts.length === 0) {
        return (
            <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">Sản phẩm liên quan</h3>
                <div className="text-gray-500 text-center py-4">
                    Không có sản phẩm liên quan
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">Sản phẩm liên quan</h3>
            <div className="grid grid-cols-2 gap-4">
                {relatedProducts.map(product => (
                    <RelatedProductItem key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RelatedProductsList;
