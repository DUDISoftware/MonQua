import React from "react";

const FeaturedProgramCard = ({ program }) => (
    <div className="bg-white rounded-xl border border-[#B9E5C9] p-3 flex flex-col items-center shadow-sm">
        <div className="w-full h-36 rounded-lg overflow-hidden mb-2">
            <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover grayscale"
            />
        </div>
        <div className="font-semibold text-sm text-black mb-1 text-left w-full">{program.title}</div>
        <div className="text-xs text-gray-500 mb-2 text-left w-full">{program.desc}</div>
        <button className="bg-[#22C55E] text-white px-6 py-1.5 rounded font-semibold text-sm hover:bg-[#16a34a] transition w-full">
            Tham Gia Ngay
        </button>
    </div>
);

export default FeaturedProgramCard;
