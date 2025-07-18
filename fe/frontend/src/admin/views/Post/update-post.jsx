// Cập nhật/Chỉnh sửa bài viết
import React, { useEffect, useState } from "react";
import {
    Typography, Box, TextField, Button, Snackbar, Alert, MenuItem, FormControl, Select, InputLabel
} from '@mui/material';
import { getPostById, updatePost } from "../../../api/post.api.js";
import { getPostCategories } from "../../../api/post.category.api.js";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        content: "",
        category_id: "",
        status: "active",
        image_urls: []
    });
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
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

        const fetchPost = async () => {
            try {
                const data = await getPostById(id, token);
                const post = data.data || data.post || data;
                setForm({
                    title: post.title || "",
                    content: post.content || "",
                    category_id: post.category_id || "",
                    status: post.status || "active",
                    image_urls: post.image_urls || []
                });
            } catch (error) {
                setSnackbar({ open: true, message: "Không thể tải dữ liệu bài viết", severity: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
        fetchPost();
    }, [id, token]);

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
                if (key !== 'image_urls') {
                    formData.append(key, form[key]);
                }
            });

            if (images.length > 0) {
                images.forEach((file) => {
                    formData.append('image_urls', file);
                });
            }

            await updatePost(id, formData, token);
            setSnackbar({ open: true, message: "Cập nhật bài viết thành công", severity: 'success' });
            setTimeout(() => navigate(`/admin/posts/${id}`), 1000);
        } catch (error) {
            setSnackbar({ open: true, message: "Cập nhật bài viết thất bại: " + (error?.response?.data?.error_text || ""), severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    if (loading) return <Typography>Đang tải...</Typography>;

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>Cập nhật bài viết</Typography>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <TextField
                    fullWidth
                    label="Tiêu đề"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Nội dung"
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
                                {category.name}
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
                {form.image_urls && form.image_urls.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>Hình ảnh hiện tại</Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {form.image_urls.map((url, idx) => (
                                <img key={idx} src={url} alt={`Ảnh ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover' }} />
                            ))}
                        </Box>
                    </Box>
                )}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Thay đổi hình ảnh</Typography>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImagesChange}
                    />
                </Box>
                <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>Cập nhật</Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/posts')} sx={{ mr: 2 }}>Quay lại</Button>
                <Button variant="outlined" color="error" onClick={() => navigate(`/admin/posts/${id}`)}>Hủy</Button>
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

export default UpdatePost;
