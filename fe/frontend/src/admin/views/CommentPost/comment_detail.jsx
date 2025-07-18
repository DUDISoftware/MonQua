// Lấy chi tiết bình luận
import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import { getCommentById, deleteComment } from "../../../api/post.comment.api.js";

const CommentDetail = () => {
    const { id } = useParams();
    const [comment, setComment] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const data = await getCommentById(id, token);
                setComment(data.data || data.comment || data);
            } catch (error) {
                setSnackbar({ open: true, message: "Không thể tải chi tiết bình luận", severity: 'error' });
            }
        };
        fetchComment();
    }, [id, token]);

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
            try {
                await deleteComment(id, token);
                setSnackbar({ open: true, message: 'Xóa thành công!', severity: 'success' });
                setTimeout(() => navigate('/admin/comments'), 1000);
            } catch (error) {
                setSnackbar({ open: true, message: 'Xóa thất bại! ' + (error?.response?.data?.error_text || ""), severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    if (!comment) return <Typography>Đang tải...</Typography>;

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>Chi tiết bình luận</Typography>
            <Typography variant="subtitle1"><strong>Nội dung:</strong> {comment.content || comment.text}</Typography>
            <Typography variant="subtitle1"><strong>Người dùng:</strong> {comment.user_id || comment.user?.name || comment.user}</Typography>
            <Typography variant="subtitle1"><strong>Bài viết:</strong> {comment.post_id || comment.post?.title || 'N/A'}</Typography>
            <Typography variant="subtitle1"><strong>Bình luận cha:</strong> {comment.parent_id ? comment.parent_id : 'Không có (bình luận gốc)'}</Typography>
            <Typography variant="subtitle1"><strong>Trạng thái:</strong> {comment.status}</Typography>
            <Typography variant="subtitle1"><strong>Ngày tạo:</strong> {comment.created_at ? new Date(comment.created_at).toLocaleString() : ''}</Typography>
            <Typography variant="subtitle1"><strong>Ngày cập nhật:</strong> {comment.updated_at ? new Date(comment.updated_at).toLocaleString() : ''}</Typography>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2, mr: 2 }}>Xóa</Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/comments')} sx={{ mt: 2 }}>Quay lại</Button>
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

export default CommentDetail;
