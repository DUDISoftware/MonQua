
import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById, deleteCategory } from '../../../api/product.category.api.js';

const CategoryProductDetail = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getCategoryById(id, token);
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
                await deleteCategory(id, token);
                setSnackbar({ open: true, message: 'Xóa thành công!', severity: 'success' });
                setTimeout(() => navigate('/admin/category-products'), 1000);
            } catch (error) {
                setSnackbar({ open: true, message: 'Xóa thất bại! ' + (error?.response?.data?.error_text || ""), severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    if (!category) return <Typography>Đang tải...</Typography>;

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>Chi tiết danh mục sản phẩm</Typography>
            <Typography variant="subtitle1"><strong>Tên:</strong> {category.name || category.category_name}</Typography>
            <Typography variant="subtitle1"><strong>Slug:</strong> {category.slug}</Typography>
            <Typography variant="subtitle1"><strong>Mô tả:</strong> {category.description}</Typography>
            <Typography variant="subtitle1"><strong>Ngày tạo:</strong> {category.created_at ? new Date(category.created_at).toLocaleString() : ''}</Typography>
            <Typography variant="subtitle1"><strong>Ngày cập nhật:</strong> {category.updated_at ? new Date(category.updated_at).toLocaleString() : ''}</Typography>
            <Button variant="contained" color="secondary" onClick={() => navigate(`/admin/category-products/update/${id}`)} sx={{ mt: 2, mr: 2 }}>Sửa</Button>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2, mr: 2 }}>Xóa</Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/category-products')} sx={{ mt: 2 }}>Quay lại</Button>
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

export default CategoryProductDetail;
