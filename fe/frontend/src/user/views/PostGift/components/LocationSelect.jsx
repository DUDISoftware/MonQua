import React, { useEffect } from "react";

const LocationSelect = ({
    provinces,
    districts,
    wards,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    specificAddress,
    onProvinceChange,
    onDistrictChange,
    onWardChange,
    onSpecificAddressChange,
    onLocationChange
}) => {
    // Tự động tạo full address khi location thay đổi
    useEffect(() => {
        if (onLocationChange && (selectedProvince || selectedDistrict || selectedWard || specificAddress)) {
            const provinceName = provinces.find(p => p.code === parseInt(selectedProvince))?.name || "";
            const districtName = districts.find(d => d.code === parseInt(selectedDistrict))?.name || "";
            const wardName = wards.find(w => w.code === parseInt(selectedWard))?.name || "";

            const locationParts = [];
            if (specificAddress) locationParts.push(specificAddress);
            if (wardName) locationParts.push(wardName);
            if (districtName) locationParts.push(districtName);
            if (provinceName) locationParts.push(provinceName);

            const fullLocation = locationParts.filter(Boolean).join(', ');
            onLocationChange(fullLocation);
        }
    }, [selectedProvince, selectedDistrict, selectedWard, specificAddress, provinces, districts, wards, onLocationChange]);

    return (
        <div>
            <label className="block font-semibold text-[#17805C] mb-1">Khu Vực</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <div className="md:col-span-1">
                    <select
                        className="border border-[#B9E5C9] rounded-full px-3 py-2 w-full"
                        value={selectedProvince}
                        onChange={(e) => onProvinceChange(e.target.value)}
                    >
                        <option value="">Tỉnh/Thành</option>
                        {provinces.map((province) => (
                            <option key={province.code} value={province.code}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-1">
                    <select
                        className="border border-[#B9E5C9] rounded-full px-3 py-2 w-full"
                        value={selectedDistrict}
                        onChange={(e) => onDistrictChange(e.target.value)}
                        disabled={!selectedProvince}
                    >
                        <option value="">Quận/Huyện</option>
                        {districts.map((district) => (
                            <option key={district.code} value={district.code}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-1">
                    <select
                        className="border border-[#B9E5C9] rounded-full px-3 py-2 w-full"
                        value={selectedWard}
                        onChange={(e) => onWardChange(e.target.value)}
                        disabled={!selectedDistrict}
                    >
                        <option value="">Xã/Phường</option>
                        {wards.map((ward) => (
                            <option key={ward.code} value={ward.code}>
                                {ward.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <input
                value={specificAddress}
                onChange={(e) => onSpecificAddressChange(e.target.value)}
                className="w-full border border-[#B9E5C9] rounded-full px-4 py-2"
                placeholder="Số nhà, tên đường..."
            />
        </div>
    );
};

export default LocationSelect;
