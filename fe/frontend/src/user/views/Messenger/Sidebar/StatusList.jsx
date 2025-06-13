import React from "react";

const statuses = [
    { id: 1, name: "Tấn Trung", avatar: "https://randomuser.me/api/portraits/men/31.jpg", online: true },
    { id: 2, name: "Tuấn Đan", avatar: "https://randomuser.me/api/portraits/men/32.jpg", online: true },
    { id: 3, name: "Tuấn Đan", avatar: "https://randomuser.me/api/portraits/men/33.jpg", online: false },
    { id: 4, name: "Tuấn Đan", avatar: "https://randomuser.me/api/portraits/men/34.jpg", online: true },
];

const StatusList = () => (
    <div className="flex items-center px-6 py-3 border-b border-[#E6F4F1]">
        <span className="text-xs text-gray-500 mr-4">Status</span>
        <div className="flex gap-2 flex-1">
            {statuses.map(s => (
                <div key={s.id} className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={s.avatar}
                            alt={s.name}
                            className="w-9 h-9 rounded-full object-cover border-2 border-[#22C55E]"
                        />
                        {s.online && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
                        )}
                    </div>
                </div>
            ))}
        </div>
        <button className="text-xs text-[#22C55E] font-semibold ml-2">View All</button>
    </div>
);

export default StatusList;
