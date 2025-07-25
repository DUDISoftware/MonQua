// Tạo bài viết mới
import React, { useState, useEffect } from "react";
import {
    Typography, Box, TextField, Button, Snackbar, Alert, MenuItem, FormControl, Select, InputLabel
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { addPost } from "../../../api/post.api.js";
import { getPostCategories } from "../../../api/post.category.api.js";

const AddPost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        content: "",
        category_id: "",
        status: "active",
        image_url: []
    });
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getPostCategories(token);
                const list = data.data || data.categories || data;
                setCategories(Array.isArray(list) ? list : []);
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải danh sách danh mục", severity: 'error' });
            }
        };
        fetchCategories();
    }, [token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImagesChange = (e) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSnackbar({ open: false, message: '', severity: 'success' });
        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                if (key !== 'image_url') {
                    formData.append(key, form[key]);
                }
            });

            if (images.length > 0) {
                images.forEach((file) => {
                    formData.append('image_url', file);
                });
            }

            await addPost(formData, token);
            setSnackbar({ open: true, message: "Thêm bài viết thành công", severity: 'success' });
            setTimeout(() => navigate('/admin/posts'), 1000);
        } catch (error) {
            setSnackbar({ open: true, message: "Thêm bài viết thất bại: " + (error?.response?.data?.error_text || ""), severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Thêm bài viết mới</Typography>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <TextField
                    fullWidth
                    label="Nội dung bài viết"
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="category-label">Danh mục</InputLabel>
                    <Select
                        labelId="category-label"
                        label="Danh mục"
                        name="category_id"
                        value={form.category_id}
                        onChange={handleChange}
                        required
                    >
                        {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                                {category.name || category.category_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="status-label">Trạng thái</InputLabel>
                    <Select
                        labelId="status-label"
                        label="Trạng thái"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Hình ảnh bài viết</Typography>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImagesChange}
                    />
                </Box>
                <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>Thêm bài viết</Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/posts')}>Quay lại</Button>
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

export default AddPost;
