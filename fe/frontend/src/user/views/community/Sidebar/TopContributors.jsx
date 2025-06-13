import React from "react";

const contributors = [
    { name: "Nguyễn Văn A", count: 12 },
    { name: "Trần Thị B", count: 10 },
    { name: "Lê Văn C", count: 8 },
    { name: "Phạm Thị D", count: 7 },
    { name: "Hoàng Văn E", count: 6 },
];

const TopContributors = () => (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <h3 className="font-bold text-lg mb-4">Top chia sẻ tích cực</h3>
        <ul>
            {contributors.map((c, idx) => (
                <li key={idx} className="flex justify-between mb-2 last:mb-0">
                    <span>{c.name}</span>
                    <span className="text-[#22C55E] font-bold">{c.count}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default TopContributors;
