import React from "react";

const ProductBanner = ({ product }) => (
    <div className="w-full rounded-xl overflow-hidden mb-6 flex items-center bg-gradient-to-r from-green-100 to-blue-100 px-6 py-6">
        <img
            src="https://cdn.sstatic.net/Img/home/illo-freegifts.png"
            alt="Banner"
            className="h-20 w-20 object-contain mr-6"
        />
        <div>
            <h2 className="text-xl font-bold mb-1 text-gray-900">
                {product?.title ? `Chi tiết: ${product.title}` : 'Chi tiết sản phẩm'}
            </h2>
            <p className="text-gray-700 text-sm">Xem thông tin và liên hệ nhận món đồ bạn quan tâm.</p>
        </div>
    </div>
);

export default ProductBanner;
