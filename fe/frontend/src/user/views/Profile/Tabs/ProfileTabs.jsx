import React from "react";

const ProfileTabs = ({ active, onChangeTab, counts }) => {
    const tabs = [
        { label: "Tất cả", count: counts?.total || 0 },
        { label: "Đang hiển thị", count: counts?.active || 0 },
        { label: "Đã tặng", count: counts?.given || 0 },
    ];

    return (
        <div className="flex gap-2 mb-6">
            {tabs.map((tab, idx) => (
                <button
                    key={tab.label}
                    onClick={() => onChangeTab(idx)}
                    className={`px-5 py-2 rounded-full font-semibold text-sm border transition ${
                        active === idx
                            ? "bg-[#E6F4E6] text-[#22C55E] border-[#22C55E]"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-[#F6F6F6]"
                    }`}
                >
                    {tab.label} ({tab.count})
                </button>
            ))}
        </div>
    );
};

export default ProfileTabs;
