import { useState, useEffect } from 'react';

export const useLocation = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [location, setLocation] = useState("");

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [address, setAddress] = useState("");

    // Fetch provinces on mount
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
        try {
            const provinceName = provinces.find(p => p.code === parseInt(selectedProvince))?.name || "";
            const districtName = districts.find(d => d.code === parseInt(selectedDistrict))?.name || "";
            const wardName = wards.find(w => w.code === parseInt(selectedWard))?.name || "";

            const locationParts = [address];

            if (wardName) locationParts.unshift(wardName);
            if (districtName) locationParts.unshift(districtName);
            if (provinceName) locationParts.unshift(provinceName);

            const fullLocation = locationParts.filter(Boolean).join(", ");
            setLocation(fullLocation);
        } catch (error) {
            console.error("Lỗi khi cập nhật địa chỉ đầy đủ:", error);
        }
    }, [selectedProvince, selectedDistrict, selectedWard, address, provinces, districts, wards]);

    const handleProvinceChange = (provinceCode) => {
        setSelectedProvince(provinceCode);
        setSelectedDistrict("");
        setSelectedWard("");
    };

    const handleDistrictChange = (districtCode) => {
        setSelectedDistrict(districtCode);
        setSelectedWard("");
    };

    const handleWardChange = (wardCode) => {
        setSelectedWard(wardCode);
    };

    const handleAddressChange = (newAddress) => {
        setAddress(newAddress);
    };

    return {
        provinces,
        districts,
        wards,
        location,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        address,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange,
        handleAddressChange
    };
};
