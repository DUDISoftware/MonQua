import React from "react";

const GiftItem = ({ gift }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col hover:shadow-md transition cursor-pointer relative">
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${gift.status === "Đã nhận" ? "bg-blue-500 text-white" : "bg-[#22C55E] text-white"}`}>
            {gift.status}
        </span>
        <img
            src={gift.image}
            alt={gift.name}
            className="w-full h-32 object-contain rounded-lg mb-2 mt-6"
        />
        <div className="font-semibold text-gray-900 mb-1">{gift.name}</div>
        <div className="text-xs text-gray-500 mb-1">{gift.desc}</div>
        <div className="text-xs text-gray-500 mb-1">{gift.location}</div>
        <div className="text-xs text-gray-400 mb-2">{gift.time}</div>
        <button className="mt-auto bg-[#E6F4E6] text-[#22C55E] py-1.5 rounded-lg text-sm font-semibold border border-[#22C55E] hover:bg-[#22C55E] hover:text-white transition">
            Xem Chi Tiết
        </button>
    </div>
);

export default GiftItem;
