import React from "react";

const ProductBanner = () => (
    <div className="w-full rounded-xl overflow-hidden mb-6 flex items-center bg-gradient-to-r from-green-100 to-blue-100 px-6 py-6">
        <img
            src="https://res.cloudinary.com/dvnsihl8y/image/upload/v1748229758/products/main/qv6kkznpo2axguxkmehz.png"
            alt="Banner"
            className="h-20 w-20 object-contain mr-6"
        />
        <div>
            <h2 className="text-xl font-bold mb-1 text-gray-900">Khám phá kho đồ miễn phí</h2>
            <p className="text-gray-700 text-sm">Tìm kiếm và nhận những món đồ bạn cần, hoàn toàn miễn phí từ cộng đồng.</p>
        </div>
    </div>
);

export default ProductBanner;
