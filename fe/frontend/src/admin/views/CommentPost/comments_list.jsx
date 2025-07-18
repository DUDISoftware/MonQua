// Lấy danh sách bình luận
import React, { useEffect, useState } from "react";
import {
    Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Button, Snackbar, Alert
} from '@mui/material';
import { getCommentsByPostId, deleteComment } from "../../../api/post.comment.api.js";
import { useNavigate } from "react-router-dom";

const CommentsList = () => {
    const [comments, setComments] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        // Giả sử lấy bình luận của bài viết đầu tiên (hoặc cần truyền postId từ props/router)
        const postId = "all"; // hoặc truyền postId phù hợp
        const fetchComments = async () => {
            try {
                const data = await getCommentsByPostId(postId, token);
                const list = data.data || data.comments || data;
                setComments(Array.isArray(list) ? list : []);
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải danh sách bình luận", severity: 'error' });
            }
        };
        fetchComments();
    }, [token, navigate]);

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
            try {
                await deleteComment(id, token);
                setComments(comments.filter(c => c._id !== id));
                setSnackbar({ open: true, message: "Xóa thành công!", severity: 'success' });
            } catch (err) {
                setSnackbar({ open: true, message: "Xóa thất bại! " + (err?.response?.data?.error_text || ""), severity: 'error' });
            }
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Danh sách các bình luận</Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table aria-label="bảng bình luận" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            {['STT', 'Nội dung', 'Người dùng', 'Bài viết', 'Hành động'].map((header, idx) => (
                                <TableCell key={idx}>
                                    <Typography variant="subtitle2" fontWeight={600}>{header}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments && comments.length > 0 ? (
                            comments.map((comment, idx) => (
                                <TableRow key={comment._id || comment.id}>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{idx + 1}</Typography></TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {(comment.content || comment.text) && (comment.content || comment.text).length > 50
                                                ? `${(comment.content || comment.text).substring(0, 50)}...`
                                                : (comment.content || comment.text)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{comment.user_id || comment.user?.name || comment.user}</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{comment.post_id || comment.post?.title || 'N/A'}</Typography></TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="primary" size="small" onClick={() => navigate(`/admin/comments/${comment._id || comment.id}`)} sx={{ mr: 1 }}>Xem</Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(comment._id || comment.id)}>Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="subtitle1">Không có bình luận nào.</Typography>
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

export default CommentsList;
