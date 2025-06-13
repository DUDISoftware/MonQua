import React, { useState, useRef, useEffect } from "react";

const AdminProfileMenu = ({ user }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        if (open) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    return (
        <div className="relative" ref={ref}>
            <button
                className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#22C55E] bg-white hover:bg-[#F6F6F6] transition"
                onClick={() => setOpen((v) => !v)}
            >
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="font-semibold text-[#17805C]">{user.name}</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
                    <path d="M5 8l5 5 5-5" stroke="#17805C" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700">{user.email}</div>
                    <hr />
                    <button className="w-full text-left px-4 py-2 hover:bg-[#F6F6F6] text-[#222]">Hồ sơ</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-[#F6F6F6] text-[#222]">Đổi mật khẩu</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-[#F6F6F6] text-[#222]">Đăng xuất</button>
                </div>
            )}
        </div>
    );
};

export default AdminProfileMenu;
