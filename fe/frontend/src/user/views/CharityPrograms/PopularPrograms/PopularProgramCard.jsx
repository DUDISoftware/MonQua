import React from "react";

const PopularProgramCard = ({ program }) => (
    <div className={`rounded-xl border p-4 flex flex-col items-center transition
        ${program.highlight
            ? "border-[#FCA5A5] bg-[#FEF2F2]"
            : "border-[#B9E5C9] bg-[#F6FFF9]"
        }`}>
        <img
            src={program.image}
            alt={program.title}
            className="w-full h-24 object-cover rounded-lg mb-3"
        />
        <div className="font-bold text-base text-[#17805C] mb-1 text-center">{program.title}</div>
        <div className="text-xs text-gray-600 mb-3 text-center">{program.desc}</div>
        <button
            className={`px-6 py-2 rounded-full font-semibold text-sm w-full
                ${program.highlight
                    ? "bg-[#F87171] text-white hover:bg-[#EF4444]"
                    : "bg-[#22C55E] text-white hover:bg-[#16a34a]"
                } transition`}
        >
            Ủng hộ ngay
        </button>
    </div>
);

export default PopularProgramCard;
