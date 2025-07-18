// Lấy danh sách bài viết
import React, { useEffect, useState } from "react";
import {
    Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Button, Snackbar, Alert
} from '@mui/material';
import { getPosts, deletePost } from "../../../api/post.api.js";
import { useNavigate } from "react-router-dom";

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        const fetchPosts = async () => {
            try {
                const data = await getPosts(token);
                const list = data.data || data.posts || data;
                setPosts(Array.isArray(list) ? list : []);
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải danh sách bài viết", severity: 'error' });
            }
        };
        fetchPosts();
    }, [token, navigate]);

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
            try {
                await deletePost(id, token);
                setPosts(posts.filter(p => p._id !== id));
                setSnackbar({ open: true, message: "Xóa thành công!", severity: 'success' });
            } catch (err) {
                setSnackbar({ open: true, message: "Xóa thất bại! " + (err?.response?.data?.error_text || ""), severity: 'error' });
            }
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>Danh sách các bài viết</Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table aria-label="bảng bài viết" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            {['STT', 'Tiêu đề', 'Nội dung', 'Danh mục', 'Trạng thái', 'Hành động'].map((header, idx) => (
                                <TableCell key={idx}>
                                    <Typography variant="subtitle2" fontWeight={600}>{header}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts && posts.length > 0 ? (
                            posts.map((post, idx) => (
                                <TableRow key={post._id || post.id}>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{idx + 1}</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{post.title}</Typography></TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {post.content && post.content.length > 50
                                                ? `${post.content.substring(0, 50)}...`
                                                : post.content}
                                        </Typography>
                                    </TableCell>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{post.category_id || (post.category?.name || 'Chưa phân loại')}</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{post.status}</Typography></TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="primary" size="small" onClick={() => navigate(`/admin/posts/${post._id || post.id}`)} sx={{ mr: 1 }}>Xem</Button>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => navigate(`/admin/posts/update/${post._id || post.id}`)} sx={{ mr: 1 }}>Sửa</Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(post._id || post.id)}>Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="subtitle1">Không có bài viết nào.</Typography>
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

export default PostsList;
