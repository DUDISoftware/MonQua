
import React, { useEffect, useState } from "react";
import { Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Button, Snackbar, Alert } from '@mui/material';
import { getCategories, deleteCategory } from "../../../api/product.category.api.js";
import { useNavigate } from "react-router-dom";

const CategoryProductsList = () => {
    const [categories, setCategories] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        const fetchCategories = async () => {
            try {
                const data = await getCategories(token);
                const list = data.data || data.categories || data;
                setCategories(Array.isArray(list) ? list : []);
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải danh sách danh mục", severity: 'error' });
            }
        };
        fetchCategories();
    }, [token, navigate]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            try {
                await deleteCategory(id, token);
                setCategories(categories.filter(c => c._id !== id));
                setSnackbar({ open: true, message: "Xóa thành công!", severity: 'success' });
            } catch (err) {
                setSnackbar({ open: true, message: "Xóa thất bại! " + (err?.response?.data?.error_text || ""), severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Danh sách các danh mục sản phẩm</Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table aria-label="bảng danh mục" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            {['STT', 'Tên', 'Mô tả', 'Hành động'].map((header, idx) => (
                                <TableCell key={idx}>
                                    <Typography variant="subtitle2" fontWeight={600}>{header}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories && categories.length > 0 ? (
                            categories.map((cat, idx) => (
                                <TableRow key={cat._id}>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{idx + 1}</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{cat.name}</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{cat.description}</Typography></TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="primary" size="small" onClick={() => navigate(`/admin/category-products/${cat._id}`)} sx={{ mr: 1 }}>Xem</Button>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => navigate(`/admin/category-products/update/${cat._id}`)} sx={{ mr: 1 }}>Sửa</Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(cat._id)}>Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography variant="subtitle1">Không có danh mục nào.</Typography>
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

export default CategoryProductsList;
