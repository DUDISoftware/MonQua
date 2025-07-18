
import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, deleteProduct } from '../../../api/product.api.js';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id, token);
                const prod = data.data?.[0] || data.data || data.product || data;
                setProduct(prod);
            } catch (error) {
                setSnackbar({ open: true, message: 'Không thể tải thông tin sản phẩm', severity: 'error' });
            }
        };
        fetchProduct();
    }, [id, token]);

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await deleteProduct(id, token);
                setSnackbar({ open: true, message: 'Xóa thành công!', severity: 'success' });
                setTimeout(() => navigate('/admin/products'), 1000);
            } catch (error) {
                setSnackbar({ open: true, message: 'Xóa thất bại! ' + (error?.response?.data?.error_text || ""), severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    if (!product) return <Typography>Đang tải...</Typography>;

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>Chi tiết sản phẩm</Typography>
            <Typography variant="subtitle1"><strong>Tên:</strong> {product.title}</Typography>
            <Typography variant="subtitle1"><strong>Slug:</strong> {product.slug}</Typography>
            <Typography variant="subtitle1"><strong>Giá:</strong> {product.price}</Typography>
            <Typography variant="subtitle1"><strong>Danh mục:</strong> {product.category_id || (product.category?.name || product.category)}</Typography>
            <Typography variant="subtitle1"><strong>Mô tả:</strong> {product.description}</Typography>
            <Typography variant="subtitle1"><strong>Vị trí:</strong> {product.location}</Typography>
            <Typography variant="subtitle1"><strong>Nhãn:</strong> {product.label}</Typography>
            <Typography variant="subtitle1"><strong>Hàng nặng:</strong> {product.is_heavy ? 'Có' : 'Không'}</Typography>
            <Typography variant="subtitle1"><strong>Số điện thoại liên hệ:</strong> {product.contact_phone}</Typography>
            <Typography variant="subtitle1"><strong>Zalo liên hệ:</strong> {product.contact_zalo}</Typography>
            <Typography variant="subtitle1"><strong>User ID:</strong> {product.user_id}</Typography>
            <Typography variant="subtitle1"><strong>Trạng thái:</strong> {product.status}</Typography>
            <Typography variant="subtitle1"><strong>Phương thức giao hàng:</strong> {product.delivery_method}</Typography>
            <Typography variant="subtitle1"><strong>Lượt xem:</strong> {product.view_count}</Typography>
            <Typography variant="subtitle1"><strong>Lượt quan tâm:</strong> {product.interested_count}</Typography>
            <Typography variant="subtitle1"><strong>Ngày tạo:</strong> {product.created_at ? new Date(product.created_at).toLocaleString() : ''}</Typography>
            <Typography variant="subtitle1"><strong>Ngày cập nhật:</strong> {product.updated_at ? new Date(product.updated_at).toLocaleString() : ''}</Typography>
            {product.image_url && (
                <Box mt={2}><img src={product.image_url} alt="Ảnh sản phẩm" style={{ maxWidth: 180, borderRadius: 8 }} /></Box>
            )}
            {product.sub_images_urls && product.sub_images_urls.length > 0 && (
                <Box mt={2}>
                    <Typography variant="subtitle1"><strong>Ảnh phụ:</strong></Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {product.sub_images_urls.map((url, idx) => (
                            <img key={idx} src={url} alt={`Ảnh phụ ${idx + 1}`} style={{ maxWidth: 100, borderRadius: 8 }} />
                        ))}
                    </Box>
                </Box>
            )}
            <Button variant="contained" color="secondary" onClick={() => navigate(`/admin/products/update/${id}`)} sx={{ mt: 2, mr: 2 }}>Sửa</Button>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2, mr: 2 }}>Xóa</Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/products')} sx={{ mt: 2 }}>Quay lại</Button>
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

export default ProductDetail;
