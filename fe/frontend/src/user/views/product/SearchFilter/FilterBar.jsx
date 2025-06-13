import React from "react";

const FilterBar = () => (
    <div className="w-full flex flex-wrap gap-3 mb-6">
        <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 min-w-[120px]">
            <option>Danh mục</option>
            <option>Quần áo</option>
            <option>Sách vở</option>
            <option>Đồ chơi</option>
            <option>Đồ gia dụng</option>
            <option>Đồ điện tử</option>
            <option>Cây cảnh</option>
        </select>
        <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 min-w-[120px]">
            <option>Khu vực</option>
            <option>Hà Nội</option>
            <option>TP. HCM</option>
            <option>Đà Nẵng</option>
        </select>
        <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 min-w-[120px]">
            <option>Tình trạng</option>
            <option>Tất cả</option>
            <option>Mới</option>
            <option>Đã sử dụng</option>
        </select>
        <div className="flex items-center gap-2">
            <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 min-w-[120px]">
                <option>Khoảng cách</option>
                <option>Dưới 5km</option>
                <option>Dưới 10km</option>
                <option>Bất kỳ</option>
            </select>
            <span className="text-gray-400 text-sm">Km</span>
        </div>
    </div>
);

export default FilterBar;
