// Lấy chi tiết bài viết
import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, deletePost } from "../../../api/post.api.js";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id, token);
                setPost(data.data || data.post || data);
            } catch (error) {
                setSnackbar({ open: true, message: "Không thể tải chi tiết bài viết", severity: 'error' });
            }
        };
        fetchPost();
    }, [id, token]);

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
            try {
                await deletePost(id, token);
                setSnackbar({ open: true, message: 'Xóa thành công!', severity: 'success' });
                setTimeout(() => navigate('/admin/posts'), 1000);
            } catch (error) {
                setSnackbar({ open: true, message: 'Xóa thất bại! ' + (error?.response?.data?.error_text || ""), severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    if (!post) return <Typography>Đang tải...</Typography>;

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>Chi tiết bài viết</Typography>
            <Typography variant="subtitle1"><strong>Tiêu đề:</strong> {post.title}</Typography>
            <Typography variant="subtitle1"><strong>Nội dung:</strong> {post.content}</Typography>
            <Typography variant="subtitle1"><strong>Danh mục:</strong> {post.category_id || (post.category?.name || 'Chưa phân loại')}</Typography>
            <Typography variant="subtitle1"><strong>Người đăng:</strong> {post.user_id || post.user?.name || post.user}</Typography>
            <Typography variant="subtitle1"><strong>Trạng thái:</strong> {post.status}</Typography>
            <Typography variant="subtitle1"><strong>Ngày tạo:</strong> {post.created_at ? new Date(post.created_at).toLocaleString() : ''}</Typography>
            <Typography variant="subtitle1"><strong>Ngày cập nhật:</strong> {post.updated_at ? new Date(post.updated_at).toLocaleString() : ''}</Typography>

            {post.image_urls && post.image_urls.length > 0 && (
                <Box mt={2}>
                    <Typography variant="subtitle1"><strong>Hình ảnh:</strong></Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
                        {post.image_urls.map((url, idx) => (
                            <img key={idx} src={url} alt={`Ảnh ${idx + 1}`} style={{ maxWidth: 180, borderRadius: 8 }} />
                        ))}
                    </Box>
                </Box>
            )}
            <Button variant="contained" color="secondary" onClick={() => navigate(`/admin/posts/update/${id}`)} sx={{ mt: 2, mr: 2 }}>Sửa</Button>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2, mr: 2 }}>Xóa</Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/posts')} sx={{ mt: 2 }}>Quay lại</Button>
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

export default PostDetail;
