
import React, { useEffect, useState } from "react";
import { Typography, Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import { getCategoryById, updateCategory } from "../../../api/product.category.api.js";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCategoryProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        category_name: "",
        description: "",
        created_at: "",
        updated_at: ""
    });
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getCategoryById(id, token);
                const cat = data.data?.[0] || data.data || data.category || data;
                setForm({
                    category_name: cat.category_name || "",
                    description: cat.description || "",
                    slug: cat.slug || "",
                    created_at: cat.created_at || "",
                    updated_at: cat.updated_at || ""
                });
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải thông tin danh mục", severity: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [id, token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSnackbar({ open: false, message: '', severity: 'success' });
        try {
            await updateCategory(id, form, token);
            setSnackbar({ open: true, message: "Cập nhật thành công!", severity: 'success' });
            setTimeout(() => navigate(`/admin/category-products/${id}`), 1000);
        } catch (err) {
            setSnackbar({ open: true, message: "Cập nhật thất bại! " + (err?.response?.data?.error_text || ""), severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    if (loading) return <Typography>Đang tải...</Typography>;

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Cập nhật danh mục sản phẩm</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Tên danh mục"
                    name="category_name"
                    value={form.category_name}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Mô tả"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Slug"
                    name="slug"
                    value={form.slug || ""}
                    disabled
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Ngày tạo"
                    name="created_at"
                    value={form.created_at ? new Date(form.created_at).toLocaleString() : ''}
                    disabled
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Ngày cập nhật"
                    name="updated_at"
                    value={form.updated_at ? new Date(form.updated_at).toLocaleString() : ''}
                    disabled
                    sx={{ mb: 2 }}
                />
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

export default UpdateCategoryProduct;
