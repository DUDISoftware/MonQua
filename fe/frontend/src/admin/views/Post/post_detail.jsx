// Lấy chi tiết bài viết
import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, deletePost } from "../../../api/post.api.js";
import { getPostCategories } from "../../../api/post.category.api.js";
import { getUserById } from "../../../api/user.api.js";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch categories
        const fetchCategories = async () => {
            try {
                const data = await getPostCategories(token);
                const list = data.data || data.categories || data;
                setCategories(Array.isArray(list) ? list : []);
            } catch (error) {
                setSnackbar({ open: true, message: "Không thể tải danh sách danh mục", severity: 'error' });
            }
        };

        // Fetch post details
        const fetchPost = async () => {
            try {
                const data = await getPostById(id, token);
                const postData = data.data || data.post || data;
                setPost(postData);

                // Fetch user information if post has user_id
                if (postData.user_id) {
                    try {
                        const userData = await getUserById(postData.user_id, token);
                        setUser(userData.data?.[0] || userData.data || userData);
                    } catch (userError) {
                        console.error('Error fetching user:', userError);
                    }
                }
            } catch (error) {
                setSnackbar({ open: true, message: "Không thể tải chi tiết bài viết", severity: 'error' });
            }
        };

        fetchCategories();
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
            <Typography variant="subtitle1"><strong>Nội dung:</strong> {post.content}</Typography>
            <Typography variant="subtitle1"><strong>Danh mục:</strong> {
                categories.find(cat => cat._id === post.category_id)?.name ||
                post.category?.name ||
                post.category_id ||
                'Chưa phân loại'
            }</Typography>
            <Typography variant="subtitle1"><strong>Người đăng:</strong> {user ? `${user.name} (${user.email})` : post.user_id}</Typography>
            <Typography variant="subtitle1"><strong>Trạng thái:</strong> {post.status}</Typography>
            <Typography variant="subtitle1"><strong>Ngày tạo:</strong> {post.created_at ? new Date(post.created_at).toLocaleString() : ''}</Typography>
            <Typography variant="subtitle1"><strong>Ngày cập nhật:</strong> {post.updated_at ? new Date(post.updated_at).toLocaleString() : ''}</Typography>

            {post.image_url && (Array.isArray(post.image_url) ? post.image_url.length > 0 : post.image_url) && (
                <Box mt={2}>
                    <Typography variant="subtitle1"><strong>Hình ảnh:</strong></Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
                        {(Array.isArray(post.image_url) ? post.image_url : [post.image_url]).map((url, idx) => (
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
