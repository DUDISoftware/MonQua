import React, { useState, useEffect } from "react";

const GiverInfo = ({ user, contactPhone, contactZalo, productId }) => {
    const [userProducts, setUserProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Debug logs
    console.log('GiverInfo render - user:', user);
    console.log('GiverInfo render - contactPhone:', contactPhone);
    console.log('GiverInfo render - contactZalo:', contactZalo);

    // Fetch thêm sản phẩm của user này (nếu cần)
    useEffect(() => {
        console.log("GiverInfo component loaded", {
            user,
            contactPhone,
            contactZalo,
            productId,
            userType: typeof user,
            userKeys: user ? Object.keys(user) : 'no user'
        });
        // Không fetch API để tránh lỗi
    }, [user?._id]);

    // Show debug info first
    if (!user) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex flex-col items-center">
                <div className="text-red-500 text-sm mb-2">DEBUG: No user data</div>
                <div className="text-gray-500">Đang tải thông tin người tặng...</div>
                <div className="text-xs mt-2">
                    contactPhone: {contactPhone || 'null'}<br />
                    contactZalo: {contactZalo || 'null'}
                </div>
            </div>
        );
    }

    // Handle both populated user object and user ID - improved logic
    let userData = user;
    if (typeof user === 'string') {
        // If user is just an ID string, we can't display it properly
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex flex-col items-center">
                <div className="text-red-500 text-sm mb-2">DEBUG: User is string ID</div>
                <div className="text-gray-500">Đang tải thông tin người tặng...</div>
                <div className="text-xs mt-2">User ID: {user}</div>
            </div>
        );
    } else if (user && user._id) {
        // User object with _id (this is the normal case)
        userData = user;
    } else if (user && user.user_id) {
        // In case user is wrapped in another object
        userData = user.user_id;
    }
    const displayPhone = contactPhone || userData.phone;
    const displayZalo = contactZalo || userData.phone; // Use contactZalo first, then fallback to phone

    const maskedPhone = displayPhone ?
        displayPhone.substring(0, 4) + " **** " + displayPhone.substring(displayPhone.length - 2) :
        "Chưa có SĐT";

    // Tính số sản phẩm khác (trừ sản phẩm hiện tại)
    const otherProductsCount = Math.max(0, (userProducts.length || 0) - 1);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex flex-col items-center">
            <img
                src={userData.avatar_url || "https://randomuser.me/api/portraits/women/44.jpg"}
                alt="Người tặng"
                className="w-20 h-20 rounded-full object-cover mb-2"
                onError={(e) => {
                    e.target.src = "https://randomuser.me/api/portraits/women/44.jpg";
                }}
            />
            <div className="font-semibold text-lg text-[#17805C] mb-0.5">
                {userData.name || userData.full_name || "Tên người dùng"}
            </div>


            {/* Contact buttons */}
            {displayPhone && !contactZalo && (
                <button
                    className="w-full bg-[#6EE7B7] text-[#17805C] font-bold text-lg py-3 rounded-2xl mb-3 transition hover:bg-[#5DD8A7]"
                    style={{ boxShadow: "0 2px 8px 0 #6EE7B733" }}
                    onClick={() => window.open(`tel:${displayPhone}`)}
                >
                    Gọi: {maskedPhone}
                </button>
            )}

            {/* Show combined button if phone and Zalo are the same */}
            {displayPhone && contactZalo && displayPhone === contactZalo && (
                <>
                    <button
                        className="w-full bg-[#6EE7B7] text-[#17805C] font-bold text-lg py-3 rounded-2xl mb-2 transition hover:bg-[#5DD8A7]"
                        style={{ boxShadow: "0 2px 8px 0 #6EE7B733" }}
                        onClick={() => window.open(`tel:${displayPhone}`)}
                    >
                        Gọi: {maskedPhone}
                    </button>
                    <button
                        className="w-full bg-blue-500 text-white font-bold text-lg py-3 rounded-2xl mb-3 transition hover:bg-blue-600"
                        onClick={() => window.open(`https://zalo.me/${displayPhone.replace(/\s/g, '')}`)}
                    >
                        Chat Zalo: {maskedPhone}
                    </button>
                </>
            )}

            {/* Show separate buttons if phone and Zalo are different */}
            {displayPhone && contactZalo && displayPhone !== contactZalo && (
                <>
                    <button
                        className="w-full bg-[#6EE7B7] text-[#17805C] font-bold text-lg py-3 rounded-2xl mb-2 transition hover:bg-[#5DD8A7]"
                        style={{ boxShadow: "0 2px 8px 0 #6EE7B733" }}
                        onClick={() => window.open(`tel:${displayPhone}`)}
                    >
                        Gọi: {maskedPhone}
                    </button>
                    <button
                        className="w-full bg-blue-500 text-white font-bold text-lg py-3 rounded-2xl mb-3 transition hover:bg-blue-600"
                        onClick={() => window.open(`https://zalo.me/${contactZalo.replace(/\s/g, '')}`)}
                    >
                        Chat Zalo: {contactZalo.substring(0, 4) + " **** " + contactZalo.substring(contactZalo.length - 2)}
                    </button>
                </>
            )}

            <button
                className="w-full bg-[#ECFDF5] text-[#17805C] font-semibold text-lg py-3 rounded-2xl border border-[#D1FAE5] transition hover:bg-[#D1FAE5]"
            >
                Chat với người tặng
            </button>
        </div>
    );
};

export default GiverInfo;
