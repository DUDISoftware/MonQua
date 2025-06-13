import React, { useState } from "react";

const tabs = ["Đã tặng", "Đã nhận", "Chỉnh sửa hồ sơ"];

const SettingTabs = () => {
    const [active, setActive] = useState(0);

    return (
        <div className="flex gap-2 mb-6">
            {tabs.map((tab, idx) => (
                <button
                    key={tab}
                    onClick={() => setActive(idx)}
                    className={`px-5 py-2 rounded-full font-semibold text-sm border transition ${active === idx
                            ? "bg-[#E6F4E6] text-[#22C55E] border-[#22C55E]"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-[#F6F6F6]"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default SettingTabs;
