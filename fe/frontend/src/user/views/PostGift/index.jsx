import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, getProvinces, getDistricts, getWards } from "../../../api/product.api.js";
import { getCategories } from "../../../api/product.category.api.js";
import PostGiftForm from "./PostGiftForm";

const PostGift = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        category_id: "",
        description: "",
        user_id: localStorage.getItem("user_id") || "",
        location: "",
        label: "Mới",
        is_heavy: false,
        contact_phone: localStorage.getItem("phone") || "",
        contact_zalo: "",
        status: "pending",
        delivery_method: "giao_tan_tay"
    });
    const [imageFile, setImageFile] = useState(null);
    const [subImages, setSubImages] = useState([]);
    const [categories, setCategories] = useState([]);

    // Location states (giống admin)
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [specificAddress, setSpecificAddress] = useState("");

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories(token);
                const list = data.data || data.categories || data;
                setCategories(Array.isArray(list) ? list : []);
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải danh sách danh mục", severity: 'error' });
            }
        };

        const fetchProvinces = async () => {
            try {
                const data = await getProvinces(token);
                setProvinces(data.data || []);
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải danh sách tỉnh/thành", severity: 'error' });
            }
        };

        fetchCategories();
        fetchProvinces();
    }, [token]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubImagesChange = (e) => {
        if (e.target.files) {
            setSubImages(Array.from(e.target.files));
        }
    };

    // Location handlers (giống admin)
    const handleProvinceChange = async (provinceCode) => {
        setSelectedProvince(provinceCode);
        setSelectedDistrict("");
        setSelectedWard("");
        setDistricts([]);
        setWards([]);

        if (provinceCode) {
            try {
                const data = await getDistricts(provinceCode, token);
                setDistricts(data.data || []);
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải danh sách quận/huyện", severity: 'error' });
            }
        }
    };

    const handleDistrictChange = async (districtCode) => {
        setSelectedDistrict(districtCode);
        setSelectedWard("");
        setWards([]);

        if (districtCode) {
            try {
                const data = await getWards(districtCode, token);
                setWards(data.data || []);
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải danh sách xã/phường", severity: 'error' });
            }
        }
    };

    const handleWardChange = (wardCode) => {
        setSelectedWard(wardCode);
    };

    const handleSpecificAddressChange = (address) => {
        setSpecificAddress(address);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSnackbar({ open: false, message: '', severity: 'success' });

        if (!token || !form.user_id) {
            setSnackbar({ open: true, message: "Bạn cần đăng nhập để đăng món đồ!", severity: 'error' });
            return;
        }

        // Validation cơ bản
        if (!form.title.trim()) {
            setSnackbar({ open: true, message: "Vui lòng nhập tên món đồ!", severity: 'error' });
            return;
        }

        if (!form.category_id) {
            setSnackbar({ open: true, message: "Vui lòng chọn danh mục!", severity: 'error' });
            return;
        }

        // Validation địa chỉ - Kiểm tra location mới hoặc cũ
        if (!form.location && !selectedProvince && !specificAddress) {
            setSnackbar({ open: true, message: "Vui lòng chọn địa chỉ!", severity: 'error' });
            return;
        }

        if (!imageFile) {
            setSnackbar({ open: true, message: "Vui lòng chọn ảnh chính!", severity: 'error' });
            return;
        }

        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });

            // Thêm location data (giống admin)
            if (selectedProvince || selectedDistrict || selectedWard || specificAddress) {
                const locationData = {
                    selectedProvince,
                    selectedDistrict,
                    selectedWard,
                    address: specificAddress
                };
                formData.append('location_data', JSON.stringify(locationData));
            }

            if (imageFile) {
                formData.append("image_url", imageFile);
            }
            if (subImages.length > 0) {
                subImages.forEach((file, idx) => {
                    formData.append(`sub_images_urls`, file);
                });
            }
            await addProduct(formData, token);
            setSnackbar({ open: true, message: "Thêm sản phẩm thành công!", severity: 'success' });
            setTimeout(() => navigate('/products'), 2000);
        } catch (err) {
            setSnackbar({ open: true, message: "Thêm sản phẩm thất bại! " + (err?.response?.data?.error_text || ""), severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    return (
        <div className="min-h-screen bg-[#E6F4E6] flex items-center justify-center py-4 sm:py-6 md:py-9 px-2 sm:px-4">
            <div className="w-full max-w-xl mx-auto">
                <h1 className="text-xl sm:text-2xl font-bold text-[#17805C] text-center mb-4 sm:mb-6">Đăng Tin Tặng Đồ</h1>

                <PostGiftForm
                    form={form}
                    imageFile={imageFile}
                    subImages={subImages}
                    categories={categories}
                    snackbar={snackbar}
                    // Location props (mới)
                    provinces={provinces}
                    districts={districts}
                    wards={wards}
                    selectedProvince={selectedProvince}
                    selectedDistrict={selectedDistrict}
                    selectedWard={selectedWard}
                    specificAddress={specificAddress}
                    // Handlers
                    handleChange={handleChange}
                    handleImageChange={handleImageChange}
                    handleSubImagesChange={handleSubImagesChange}
                    handleSubmit={handleSubmit}
                    handleCloseSnackbar={handleCloseSnackbar}
                    handleProvinceChange={handleProvinceChange}
                    handleDistrictChange={handleDistrictChange}
                    handleWardChange={handleWardChange}
                    handleSpecificAddressChange={handleSpecificAddressChange}
                    token={token}
                />
            </div>
        </div>
    );
};

export default PostGift;
