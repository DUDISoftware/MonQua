import React from "react";

const ProfileForm = () => (
    <form className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col gap-4 w-full max-w-2xl shadow-sm">
        <div className="text-xl font-bold text-[#17805C] mb-2">Hồ sơ cá nhân</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block font-semibold text-[#17805C] mb-1">Họ Tên</label>
                <input className="w-full border border-gray-200 rounded-full px-4 py-2" placeholder="Trịnh Tuấn Đan" />
            </div>
            <div>
                <label className="block font-semibold text-[#17805C] mb-1">Số Điện Thoại</label>
                <input className="w-full border border-gray-200 rounded-full px-4 py-2" placeholder="Nhập số điện thoại..." />
            </div>
            <div>
                <label className="block font-semibold text-[#17805C] mb-1">Gmail</label>
                <input className="w-full border border-gray-200 rounded-full px-4 py-2" placeholder="Nhập email..." />
            </div>
            <div>
                <label className="block font-semibold text-[#17805C] mb-1">Giới Tính</label>
                <input className="w-full border border-gray-200 rounded-full px-4 py-2" placeholder="Nam/Nữ/Khác" />
            </div>
            <div className="col-span-2 flex gap-3">
                <div className="flex-1">
                    <label className="block font-semibold text-[#17805C] mb-1">Ngày sinh</label>
                    <div className="flex gap-2">
                        <select className="border border-gray-200 rounded-full px-3 py-2 flex-1">
                            <option>Ngày</option>
                        </select>
                        <select className="border border-gray-200 rounded-full px-3 py-2 flex-1">
                            <option>Tháng</option>
                        </select>
                        <select className="border border-gray-200 rounded-full px-3 py-2 flex-1">
                            <option>Năm</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                <label className="block font-semibold text-[#17805C] mb-1">Địa chỉ</label>
                <div className="flex gap-2 mb-2">
                    <select className="border border-gray-200 rounded-full px-3 py-2 flex-1">
                        <option>Tỉnh/Thành</option>
                    </select>
                    <select className="border border-gray-200 rounded-full px-3 py-2 flex-1">
                        <option>Quận/Huyện</option>
                    </select>
                    <select className="border border-gray-200 rounded-full px-3 py-2 flex-1">
                        <option>Phường/Xã</option>
                    </select>
                </div>
                <input className="w-full border border-gray-200 rounded-full px-4 py-2" placeholder="Địa chỉ chi tiết" />
            </div>
            <div>
                <label className="block font-semibold text-[#17805C] mb-1">Mật Khẩu</label>
                <input type="password" className="w-full border border-gray-200 rounded-full px-4 py-2" placeholder="Nhập mật khẩu..." />
            </div>
            <div>
                <label className="block font-semibold text-[#17805C] mb-1">Nhập Mật Khẩu</label>
                <input type="password" className="w-full border border-gray-200 rounded-full px-4 py-2" placeholder="Nhập lại mật khẩu..." />
            </div>
        </div>
        <button className="bg-[#22C55E] text-white px-8 py-2 rounded-full font-semibold hover:bg-[#16a34a] transition mt-4 self-center">
            Lưu Thay Đổi
        </button>
    </form>
);

export default ProfileForm;
