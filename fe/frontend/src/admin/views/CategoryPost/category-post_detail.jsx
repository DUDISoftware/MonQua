
import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostCategoryById, deletePostCategory } from '../../../api/post.category.api.js';

const CategoryPostDetail = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getPostCategoryById(id, token);
                const cat = data.data?.[0] || data.data || data.category || data;
                setCategory(cat);
            } catch (error) {
                setSnackbar({ open: true, message: 'Không thể tải thông tin danh mục', severity: 'error' });
            }
        };
        fetchCategory();
    }, [id, token]);

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            try {
                await deletePostCategory(id, token);
                setSnackbar({ open: true, message: 'Xóa thành công!', severity: 'success' });
                setTimeout(() => navigate('/admin/category-posts'), 1000);
            } catch (error) {
                setSnackbar({ open: true, message: 'Xóa thất bại! ' + (error?.response?.data?.error_text || ""), severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    if (!category) return <Typography>Đang tải...</Typography>;

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>Chi tiết danh mục bài viết</Typography>
            <Typography variant="subtitle1"><strong>Tên:</strong> {category.name}</Typography>
            <Typography variant="subtitle1"><strong>Mô tả:</strong> {category.description}</Typography>
            <Button variant="contained" color="secondary" onClick={() => navigate(`/admin/category-posts/update/${id}`)} sx={{ mt: 2, mr: 2 }}>Sửa</Button>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2, mr: 2 }}>Xóa</Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/category-posts')} sx={{ mt: 2 }}>Quay lại</Button>
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

export default CategoryPostDetail;
