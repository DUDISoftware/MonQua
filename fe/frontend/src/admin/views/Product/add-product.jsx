
import React, { useState } from "react";
import {
    Typography, Box, TextField, Button, Snackbar, Alert
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../../api/product.api.js";

const AddProduct = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        price: "",
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
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const token = localStorage.getItem("token");

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
