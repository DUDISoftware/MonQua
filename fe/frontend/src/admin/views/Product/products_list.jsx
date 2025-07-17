import React, { useEffect, useState } from "react";
import {
    Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Button, Snackbar, Alert
} from '@mui/material';
import { getProducts, deleteProduct } from "../../../api/product.api.js";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        const fetchProducts = async () => {
            try {
                const data = await getProducts(token);
                const list = data.data || data.products || data;
                setProducts(Array.isArray(list) ? list : []);
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải danh sách sản phẩm", severity: 'error' });
            }
        };
        fetchProducts();
    }, [token, navigate]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await deleteProduct(id, token);
                setProducts(products.filter(p => p._id !== id));
                setSnackbar({ open: true, message: "Xóa thành công!", severity: 'success' });
            } catch (err) {
                setSnackbar({ open: true, message: "Xóa thất bại! " + (err?.response?.data?.error_text || ""), severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Danh sách sản phẩm</Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table aria-label="bảng sản phẩm" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            {['STT', 'Tên', 'Giá', 'Danh mục', 'Hành động'].map((header, idx) => (
                                <TableCell key={idx}>
                                    <Typography variant="subtitle2" fontWeight={600}>{header}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products && products.length > 0 ? (
                            products.map((product, idx) => (
                                <TableRow key={product._id}>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{idx + 1}</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{product.title}</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{product.price}</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{product.category_id || (product.category?.name || product.category)}</Typography></TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="primary" size="small" onClick={() => navigate(`/admin/products/${product._id}`)} sx={{ mr: 1 }}>Xem</Button>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => navigate(`/admin/products/update/${product._id}`)} sx={{ mr: 1 }}>Sửa</Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(product._id)}>Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="subtitle1">Không có sản phẩm nào.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
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

export default ProductsList;
