import React from "react";

const DeliveryMethod = ({ value, onChange, name }) => {
    const deliveryOptions = [
        { value: "giao_tan_tay", label: "Giao tận tay" },
        { value: "nguoi_nhan_den_lay", label: "Người nhận đến lấy" },
        { value: "gap_tai_tay", label: "Gặp tại tay" }
    ];

    return (
        <div>
            <label className="block font-semibold text-[#17805C] mb-1">Phương thức giao hàng</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-[#B9E5C9] rounded-full px-4 py-2"
            >
                {deliveryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DeliveryMethod;
