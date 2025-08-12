
import React, { useState, useEffect } from "react";
import {
    Typography, Box, TextField, Button, Snackbar, Alert, FormControl, InputLabel, MenuItem, Select
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { addProduct, getProvinces, getDistricts, getWards } from "../../../api/product.api.js";
import { getCategories } from "../../../api/product.category.api.js";

const AddProduct = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        category_id: "",
        description: "",
        user_id: "",
        location: "",
        label: "Mới",
        is_heavy: false,
        contact_phone: "",
        contact_zalo: "",
        status: "pending",
        delivery_method: "giao_tan_tay"
    });
    const [imageFile, setImageFile] = useState(null);
    const [subImages, setSubImages] = useState([]);
    const [categories, setCategories] = useState([]);

    // Location states
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
        setForm({ ...form, [e.target.name]: e.target.value });
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

    // Location handlers
    const handleProvinceChange = async (e) => {
        const provinceCode = e.target.value;
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

    const handleDistrictChange = async (e) => {
        const districtCode = e.target.value;
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

    const handleWardChange = (e) => {
        setSelectedWard(e.target.value);
    };

    const handleSpecificAddressChange = (e) => {
        setSpecificAddress(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSnackbar({ open: false, message: '', severity: 'success' });
        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });

            // Thêm location data
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
            setTimeout(() => navigate('/admin/products'), 1000);
        } catch (err) {
            setSnackbar({ open: true, message: "Thêm sản phẩm thất bại! " + (err?.response?.data?.error_text || ""), severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Thêm sản phẩm mới</Typography>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <TextField fullWidth label="Tên sản phẩm" name="title" value={form.title} onChange={handleChange} required sx={{ mb: 2 }} />
                <FormControl fullWidth sx={{ mb: 2 }} required>
                    <InputLabel id="category-label">Danh mục sản phẩm</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category_id"
                        name="category_id"
                        value={form.category_id}
                        label="Danh mục sản phẩm"
                        onChange={handleChange}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                                {category.category_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField fullWidth label="Mô tả" name="description" value={form.description} onChange={handleChange} multiline rows={3} sx={{ mb: 2 }} />

                {/* Location Section */}
                <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>Thông tin địa chỉ</Typography>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="province-label">Tỉnh/Thành phố</InputLabel>
                    <Select
                        labelId="province-label"
                        value={selectedProvince}
                        label="Tỉnh/Thành phố"
                        onChange={handleProvinceChange}
                    >
                        <MenuItem value="">-- Chọn tỉnh/thành phố --</MenuItem>
                        {provinces.map((province) => (
                            <MenuItem key={province.code} value={province.code}>
                                {province.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }} disabled={!selectedProvince}>
                    <InputLabel id="district-label">Quận/Huyện</InputLabel>
                    <Select
                        labelId="district-label"
                        value={selectedDistrict}
                        label="Quận/Huyện"
                        onChange={handleDistrictChange}
                    >
                        <MenuItem value="">-- Chọn quận/huyện --</MenuItem>
                        {districts.map((district) => (
                            <MenuItem key={district.code} value={district.code}>
                                {district.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }} disabled={!selectedDistrict}>
                    <InputLabel id="ward-label">Xã/Phường</InputLabel>
                    <Select
                        labelId="ward-label"
                        value={selectedWard}
                        label="Xã/Phường"
                        onChange={handleWardChange}
                    >
                        <MenuItem value="">-- Chọn xã/phường --</MenuItem>
                        {wards.map((ward) => (
                            <MenuItem key={ward.code} value={ward.code}>
                                {ward.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Địa chỉ cụ thể (số nhà, tên đường)"
                    value={specificAddress}
                    onChange={handleSpecificAddressChange}
                    sx={{ mb: 2 }}
                    placeholder="Ví dụ: 123 Nguyễn Văn A"
                />

                <TextField fullWidth label="Nhãn" name="label" value={form.label} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Số điện thoại liên hệ" name="contact_phone" value={form.contact_phone} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Zalo liên hệ" name="contact_zalo" value={form.contact_zalo} onChange={handleChange} sx={{ mb: 2 }} />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="delivery-label">Phương thức giao hàng</InputLabel>
                    <Select
                        labelId="delivery-label"
                        id="delivery_method"
                        name="delivery_method"
                        value={form.delivery_method}
                        label="Phương thức giao hàng"
                        onChange={handleChange}
                    >
                        <MenuItem value="giao_tan_tay">Giao tận tay</MenuItem>
                        <MenuItem value="nguoi_nhan_den_lay">Người nhận đến lấy</MenuItem>
                        <MenuItem value="gap_tai_tay">Gặp tại tay</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{ mb: 2 }}>
                    <label>Hàng nặng:</label>
                    <input type="checkbox" name="is_heavy" checked={form.is_heavy} onChange={e => setForm({ ...form, is_heavy: e.target.checked })} />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <label>Ảnh chính:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <label>Ảnh phụ:</label>
                    <input type="file" accept="image/*" multiple onChange={handleSubImagesChange} />
                </Box>
                <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>Thêm sản phẩm</Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>Quay lại</Button>
            </form>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
};

export default AddProduct;
