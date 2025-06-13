import React from "react";

const GiverInfo = () => (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex flex-col items-center">
        <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Người tặng"
            className="w-20 h-20 rounded-full object-cover mb-2"
        />
        <div className="font-semibold text-lg text-[#17805C] mb-0.5">Trịnh Tuấn Đan</div>
        <div className="text-sm text-[#17805C] mb-4 font-medium">Xem thêm 4 tin khác</div>
        <button
            className="w-full bg-[#6EE7B7] text-[#17805C] font-bold text-lg py-3 rounded-2xl mb-3 transition"
            style={{ boxShadow: "0 2px 8px 0 #6EE7B733" }}
        >
            Gọi: 0336 **** 38
        </button>
        <button
            className="w-full bg-[#ECFDF5] text-[#17805C] font-semibold text-lg py-3 rounded-2xl mb-3 border border-[#D1FAE5] transition"
        >
            Chat với người tặng
        </button>
        <button
            className="w-full bg-[#F1F5F9] text-[#2563EB] font-semibold text-lg py-3 rounded-2xl border border-[#E0E7EF] transition"
        >
            Chat qua Zalo
        </button>
    </div>
);

export default GiverInfo;
