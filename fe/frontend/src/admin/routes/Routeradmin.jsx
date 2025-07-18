import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Homeadmin from "../views/Homeadmin";
import UsersList from "../views/User/users_list";
import UserDetail from "../views/User/user_detail";
import UpdateUser from "../views/User/update-user";
// CategoryPost
import AddCategoryPost from "../views/CategoryPost/add-category-post";
import CategoryPostsList from "../views/CategoryPost/category-posts_list";
import CategoryPostDetail from "../views/CategoryPost/category-post_detail";
import UpdateCategoryPost from "../views/CategoryPost/update-category-post";
// Post
import AddPost from "../views/Post/add-post";
import PostsList from "../views/Post/posts_list";
import PostDetail from "../views/Post/post_detail";
import UpdatePost from "../views/Post/update-post";
// Comment
import CommentsList from "../views/CommentPost/comments_list";
import CommentDetail from "../views/CommentPost/comment_detail";

// CategoryProduct
import AddCategoryProduct from "../views/CategoryProduct/add-category-product";
import CategoryProductsList from "../views/CategoryProduct/category-products_list";
import CategoryProductDetail from "../views/CategoryProduct/category-product_detail";
import UpdateCategoryProduct from "../views/CategoryProduct/update-category-product";

// Product
import AddProduct from "../views/Product/add-product";
import ProductDetail from "../views/Product/product_detail";
import ProductsList from "../views/Product/products_list";
import UpdateProduct from "../views/Product/update-product";


// Dummy pages for example (replace with real admin pages)
const Orders = () => <div>Quản lý đơn hàng</div>;
const Settings = () => <div>Cài đặt hệ thống</div>;
const NotFound = () => <div>404 - Không tìm thấy trang</div>;

const Routeradmin = () => (
    <Routes>
        {/* Redirect /admin sang /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Homeadmin />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/users/:id" element={<UserDetail />} />
            <Route path="/admin/users/update/:id" element={<UpdateUser />} />
            {/* CategoryPost routes */}
            <Route path="/admin/category-posts/add" element={<AddCategoryPost />} />
            <Route path="/admin/category-posts" element={<CategoryPostsList />} />
            <Route path="/admin/category-posts/:id" element={<CategoryPostDetail />} />
            <Route path="/admin/category-posts/update/:id" element={<UpdateCategoryPost />} />

            {/* Post routes */}
            <Route path="/admin/posts/add" element={<AddPost />} />
            <Route path="/admin/posts" element={<PostsList />} />
            <Route path="/admin/posts/:id" element={<PostDetail />} />
            <Route path="/admin/posts/update/:id" element={<UpdatePost />} />

            {/* Comment routes */}
            <Route path="/admin/comments" element={<CommentsList />} />
            <Route path="/admin/comments/:id" element={<CommentDetail />} />

            {/* CategoryProduct routes */}
            <Route path="/admin/category-products/add" element={<AddCategoryProduct />} />
            <Route path="/admin/category-products" element={<CategoryProductsList />} />
            <Route path="/admin/category-products/:id" element={<CategoryProductDetail />} />
            <Route path="/admin/category-products/update/:id" element={<UpdateCategoryProduct />} />

            {/* Danh sách sản phẩm */}
            <Route path="/admin/products" element={<ProductsList />} />
            <Route path="/admin/products/add" element={<AddProduct />} />
            <Route path="/admin/products/:id" element={<ProductDetail />} />
            <Route path="/admin/products/update/:id" element={<UpdateProduct />} />

            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
);

export default Routeradmin;

