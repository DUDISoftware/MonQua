import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Homeadmin from "../views/Homeadmin";

// Dummy pages for example (replace with real admin pages)
const Users = () => <div>Quản lý người dùng</div>;
const Products = () => <div>Quản lý sản phẩm</div>;
const Orders = () => <div>Quản lý đơn hàng</div>;
const Settings = () => <div>Cài đặt hệ thống</div>;
const NotFound = () => <div>404 - Không tìm thấy trang</div>;

const Routeradmin = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<Homeadmin />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/products" element={<Products />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default Routeradmin;
