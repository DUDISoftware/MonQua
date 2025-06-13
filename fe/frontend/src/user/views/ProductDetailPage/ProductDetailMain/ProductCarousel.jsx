import React from "react";

const images = [
    "https://cdn.sstatic.net/Img/home/illo-freegifts.png",
    "https://via.placeholder.com/300x200?text=Ảnh+2",
    "https://via.placeholder.com/300x200?text=Ảnh+3",
];

const ProductCarousel = () => (
    <div className="w-full mb-4">
        <div className="flex gap-2 overflow-x-auto">
            {images.map((img, idx) => (
                <img
                    key={idx}
                    src={img}
                    alt={`Ảnh sản phẩm ${idx + 1}`}
                    className="h-48 w-72 object-cover rounded-lg border border-gray-200"
                />
            ))}
        </div>
    </div>
);

export default ProductCarousel;
