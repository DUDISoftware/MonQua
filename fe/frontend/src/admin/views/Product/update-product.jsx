
import React, { useEffect, useState } from "react";
import {
    Typography, Box, TextField, Button, Snackbar, Alert, FormControl, InputLabel, MenuItem, Select
} from '@mui/material';
import { getProductById, updateProduct, getProvinces, getDistricts, getWards } from "../../../api/product.api.js";
import { getCategories } from "../../../api/product.category.api.js";
import { getUserById, getUsers } from "../../../api/user.api.js";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        category_id: "",
        description: "",
        image_url: "",
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
    const [users, setUsers] = useState([]);

    // Location states
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [specificAddress, setSpecificAddress] = useState("");

    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Fetch categories
        const fetchCategories = async () => {
            try {
                const data = await getCategories(token);
                const list = data.data || data.categories || data;
                setCategories(Array.isArray(list) ? list : []);
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải danh sách danh mục", severity: 'error' });
            }
        };

        // Fetch users
        const fetchUsers = async () => {
            try {
                const data = await getUsers(token);
                const list = data.data || data.users || data;
                setUsers(Array.isArray(list) ? list : []);
            } catch (err) {
                console.error("Không thể tải danh sách người dùng:", err);
                // Don't show error snackbar here to avoid multiple alerts
            }
        };

        // Fetch provinces
        const fetchProvinces = async () => {
            try {
                const data = await getProvinces(token);
                setProvinces(data.data || []);
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải danh sách tỉnh/thành", severity: 'error' });
            }
        };

        // Fetch product details
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id, token);
                const product = data.data?.[0] || data.data || data.product || data;
                setForm({
                    title: product.title || "",
                    category_id: product.category_id || product.category?._id || "",
                    description: product.description || "",
                    image_url: product.image_url || "",
                    user_id: product.user_id || "",
                    location: product.location || "",
                    label: product.label || "Mới",
                    is_heavy: !!product.is_heavy,
                    contact_phone: product.contact_phone || "",
                    contact_zalo: product.contact_zalo || "",
                    status: product.status || "pending",
                    delivery_method: product.delivery_method || "giao_tan_tay"
                });

                // Load location details if available
                if (product.location_details) {
                    setSelectedProvince(product.location_details.province_code || "");
                    setSelectedDistrict(product.location_details.district_code || "");
                    setSelectedWard(product.location_details.ward_code || "");
                    setSpecificAddress(product.location_details.specific_address || "");

                    // Load districts if province exists
                    if (product.location_details.province_code) {
                        try {
                            const districtData = await getDistricts(product.location_details.province_code, token);
                            setDistricts(districtData.data || []);
                        } catch (err) {
                            console.error("Không thể tải quận/huyện:", err);
                        }
                    }

                    // Load wards if district exists
                    if (product.location_details.district_code) {
                        try {
                            const wardData = await getWards(product.location_details.district_code, token);
                            setWards(wardData.data || []);
                        } catch (err) {
                            console.error("Không thể tải xã/phường:", err);
                        }
                    }
                }
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải thông tin sản phẩm", severity: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
        fetchUsers();
        fetchProvinces();
        fetchProduct();
    }, [id, token]);

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
            await updateProduct(id, formData, token);
            setSnackbar({ open: true, message: "Cập nhật thành công!", severity: 'success' });
            setTimeout(() => navigate(`/admin/products/${id}`), 1000);
        } catch (err) {
            setSnackbar({ open: true, message: "Cập nhật thất bại! " + (err?.response?.data?.error_text || ""), severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    if (loading) return <Typography>Đang tải...</Typography>;

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Cập nhật sản phẩm</Typography>
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

                <TextField fullWidth label="Vị trí" name="location" value={form.location} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Nhãn" name="label" value={form.label} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Số điện thoại liên hệ" name="contact_phone" value={form.contact_phone} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Zalo liên hệ" name="contact_zalo" value={form.contact_zalo} onChange={handleChange} sx={{ mb: 2 }} />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="user-label">Người đăng</InputLabel>
                    <Select
                        labelId="user-label"
                        id="user_id"
                        name="user_id"
                        value={form.user_id}
                        label="Người đăng"
                        onChange={handleChange}
                    >
                        {users.map((user) => (
                            <MenuItem key={user._id} value={user._id}>
                                {user.name} ({user.email})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="status-label">Trạng thái</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        name="status"
                        value={form.status}
                        label="Trạng thái"
                        onChange={handleChange}
                    >
                        <MenuItem value="pending">Đang chờ</MenuItem>
                        <MenuItem value="active">Đã duyệt</MenuItem>
                        <MenuItem value="given">Đã tặng</MenuItem>
                        <MenuItem value="hidden">Ẩn</MenuItem>
                    </Select>
                </FormControl>

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
                    {form.image_url && (
                        <Box mt={1}><img src={form.image_url} alt="Ảnh sản phẩm" style={{ maxWidth: 120, borderRadius: 8 }} /></Box>
                    )}
                </Box>
                <Box sx={{ mb: 2 }}>
                    <label>Ảnh phụ:</label>
                    <input type="file" accept="image/*" multiple onChange={handleSubImagesChange} />
                </Box>
                <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>Cập nhật</Button>
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

export default UpdateProduct;

