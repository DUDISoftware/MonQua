
import React, { useEffect, useState } from "react";
import {
    Typography, Box, TextField, Button, Snackbar, Alert
} from '@mui/material';
import { getProductById, updateProduct, getProductsByCategory } from "../../../api/product.api.js";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        price: "",
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
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id, token);
                const product = data.data?.[0] || data.data || data.product || data;
                setForm({
                    title: product.title || "",
                    price: product.price || "",
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
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải thông tin sản phẩm", severity: 'error' });
            } finally {
                setLoading(false);
            }
        };
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSnackbar({ open: false, message: '', severity: 'success' });
        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });
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
                <TextField fullWidth label="Giá" name="price" value={form.price} onChange={handleChange} required type="number" sx={{ mb: 2 }} />
                <TextField fullWidth label="Danh mục ID" name="category_id" value={form.category_id} onChange={handleChange} required sx={{ mb: 2 }} />
                <TextField fullWidth label="Mô tả" name="description" value={form.description} onChange={handleChange} multiline rows={3} sx={{ mb: 2 }} />
                <TextField fullWidth label="Vị trí" name="location" value={form.location} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Nhãn" name="label" value={form.label} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Số điện thoại liên hệ" name="contact_phone" value={form.contact_phone} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Zalo liên hệ" name="contact_zalo" value={form.contact_zalo} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="User ID" name="user_id" value={form.user_id} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Trạng thái" name="status" value={form.status} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Phương thức giao hàng" name="delivery_method" value={form.delivery_method} onChange={handleChange} sx={{ mb: 2 }} />
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
