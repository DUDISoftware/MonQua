
import React, { useState } from "react";
import { Typography, Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../../api/product.category.api.js";

const AddCategoryProduct = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        description: ""
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSnackbar({ open: false, message: '', severity: 'success' });
        try {
            await addCategory(form, token);
            setSnackbar({ open: true, message: "Thêm danh mục thành công!", severity: 'success' });
            setTimeout(() => navigate('/admin/category-products'), 1000);
        } catch (err) {
            setSnackbar({ open: true, message: "Thêm danh mục thất bại! " + (err?.response?.data?.error_text || ""), severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Thêm danh mục sản phẩm mới</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Tên danh mục"
                    name="name"
                    value={form.name}
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
                <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>Thêm danh mục</Button>
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

export default AddCategoryProduct;
