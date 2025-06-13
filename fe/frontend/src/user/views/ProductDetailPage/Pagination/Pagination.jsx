import React from "react";

const Pagination = ({ current = 1, total = 5, onChange }) => (
    <div className="flex justify-center items-center gap-2 mt-8">
        {Array.from({ length: total }).map((_, idx) => (
            <button
                key={idx}
                onClick={() => onChange && onChange(idx + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${current === idx + 1
                        ? "bg-[#22C55E] text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
            >
                {idx + 1}
            </button>
        ))}
    </div>
);

export default Pagination;
