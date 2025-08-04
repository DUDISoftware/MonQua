import React from "react";

const getQualityText = (quality) => {
    const qualityMap = {
        new: "Mới",
        used: "Đã sử dụng",
        like_new_90: "Như mới 90%",
        like_new_70: "Như mới 70%"
    };
    return qualityMap[quality] || "Chưa xác định";
};

const getQualityColor = (quality) => {
    const colorMap = {
        new: "text-green-600 bg-green-50",
        used: "text-orange-600 bg-orange-50",
        like_new_90: "text-blue-600 bg-blue-50",
        like_new_70: "text-purple-600 bg-purple-50"
    };
    return colorMap[quality] || "text-gray-600 bg-gray-50";
};

const getStatusText = (status) => {
    const statusMap = {
        pending: "Chờ duyệt",
        active: "Đang chia sẻ",
        given: "Đã tặng",
        hidden: "Đã ẩn"
    };
    return statusMap[status] || "Không xác định";
};

const getStatusColor = (status) => {
    const colorMap = {
        pending: "text-yellow-600 bg-yellow-50",
        active: "text-green-600 bg-green-50",
        given: "text-gray-600 bg-gray-50",
        hidden: "text-red-600 bg-red-50"
    };
    return colorMap[status] || "text-gray-600 bg-gray-50";
};

const getDeliveryText = (deliveryMethod) => {
    const deliveryMap = {
        giao_tan_tay: "Giao tận tay",
        nguoi_nhan_den_lay: "Đến lấy",
        gap_tai_tay: "Gặp trực tiếp"
    };
    return deliveryMap[deliveryMethod] || "Chưa xác định";
};

const ProductFeatures = ({ quality, location, status, deliveryMethod, viewCount }) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin sản phẩm</h3>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Tình trạng</div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getQualityColor(quality)}`}>
                    {getQualityText(quality)}
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Cách nhận</div>
                <div className="font-medium text-gray-900">{getDeliveryText(deliveryMethod)}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Khu vực</div>
                <div className="font-medium text-gray-900">
                    {location ? location.split(',')[0] : "Chưa có thông tin"}
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Lượt xem</div>
                <div className="font-medium text-gray-900">{viewCount || 0}</div>
            </div>
        </div>
    </div>
);

export default ProductFeatures;
