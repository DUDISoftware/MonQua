import React, { useState, useEffect } from "react";

const PostGiftLocationSelect = ({ value, onChange }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [address, setAddress] = useState(value || "");

    // Fetch provinces on component mount
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch("https://provinces.open-api.vn/api/p/");
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.error("Lỗi khi tải tỉnh/thành:", error);
            }
        };
        fetchProvinces();
    }, []);

    // Fetch districts when province changes
    useEffect(() => {
        const fetchDistricts = async () => {
            if (!selectedProvince) {
                setDistricts([]);
                return;
            }
            try {
                const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`);
                const data = await response.json();
                setDistricts(data.districts || []);
            } catch (error) {
                console.error("Lỗi khi tải quận/huyện:", error);
            }
        };
        fetchDistricts();
    }, [selectedProvince]);

    // Fetch wards when district changes
    useEffect(() => {
        const fetchWards = async () => {
            if (!selectedDistrict) {
                setWards([]);
                return;
            }
            try {
                const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`);
                const data = await response.json();
                setWards(data.wards || []);
            } catch (error) {
                console.error("Lỗi khi tải phường/xã:", error);
            }
        };
        fetchWards();
    }, [selectedDistrict]);

    // Update the full address when components change
    useEffect(() => {
        const provinceName = provinces.find(p => p.code === selectedProvince)?.name || "";
        const districtName = districts.find(d => d.code === selectedDistrict)?.name || "";
        const wardName = wards.find(w => w.code === selectedWard)?.name || "";

        const locationParts = [address];

        if (wardName) locationParts.unshift(wardName);
        if (districtName) locationParts.unshift(districtName);
        if (provinceName) locationParts.unshift(provinceName);

        const fullLocation = locationParts.filter(Boolean).join(", ");
        onChange(fullLocation);
    }, [selectedProvince, selectedDistrict, selectedWard, address, onChange, provinces, districts, wards]);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    return (
        <div>
            <label className="block font-semibold text-[#17805C] mb-1">Khu Vực</label>
            <div className="flex gap-2 mb-2">
                <select
                    className="border border-[#B9E5C9] rounded-full px-3 py-2 flex-1"
                    value={selectedProvince}
                    onChange={(e) => {
                        setSelectedProvince(e.target.value);
                        setSelectedDistrict("");
                        setSelectedWard("");
                    }}
                >
                    <option value="">Tỉnh/Thành</option>
                    {provinces.map((province) => (
                        <option key={province.code} value={province.code}>
                            {province.name}
                        </option>
                    ))}
                </select>
                <select
                    className="border border-[#B9E5C9] rounded-full px-3 py-2 flex-1"
                    value={selectedDistrict}
                    onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setSelectedWard("");
                    }}
                    disabled={!selectedProvince}
                >
                    <option value="">Quận/Huyện</option>
                    {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                            {district.name}
                        </option>
                    ))}
                </select>
                <select
                    className="border border-[#B9E5C9] rounded-full px-3 py-2 flex-1"
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
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
            <input
                value={address}
                onChange={handleAddressChange}
                className="w-full border border-[#B9E5C9] rounded-full px-4 py-2"
                placeholder="Số nhà, tên đường..."
            />
        </div>
    );
};

export default PostGiftLocationSelect;