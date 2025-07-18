import React from "react";

const tabs = ["Tất cả", "Bài viết", "Hỏi đáp"];

const CommunityTabs = ({ active, setActive }) => {
    return (
        <div className="flex gap-2 mb-6">
            {tabs.map((tab, idx) => (
                <button
                    key={tab}
                    onClick={() => setActive(idx)}
                    className={`px-4 py-2 rounded-lg font-medium transition text-sm ${active === idx
                        ? "bg-[#22C55E] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-[#E6F4E6]"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default CommunityTabs;
