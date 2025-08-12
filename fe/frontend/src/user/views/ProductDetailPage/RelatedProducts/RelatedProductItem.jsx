import React from "react";
import { useNavigate } from "react-router-dom";

const getQualityText = (quality) => {
    const qualityMap = {
        new: "Mới",
        used: "Đã sử dụng",
        like_new_90: "Như mới 90%",
        like_new_70: "Như mới 70%"
    };
    return qualityMap[quality] || "Chưa xác định";
};

const RelatedProductItem = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product._id}`);
    };

    return (
        <div
            className="bg-white rounded-xl border border-gray-200 p-3 flex flex-col hover:shadow-md transition cursor-pointer"
            onClick={handleClick}
        >
            <img
                src={product.image_url || "https://via.placeholder.com/100"}
                alt={product.title}
                className="w-full h-20 object-cover rounded-lg mb-2"
            />
            <div className="font-semibold text-gray-900 mb-1 text-sm" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {product.title || "Không có tên"}
            </div>
            <div className="text-xs text-gray-500 mb-1">
                {getQualityText(product.quality)}
            </div>
            <div className="text-xs text-gray-500">
                {product.location_details?.full_address || product.location || "Không có địa chỉ"}
            </div>
        </div>
    );
};

export default RelatedProductItem;
