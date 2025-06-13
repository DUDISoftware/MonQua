import React from "react";
import NavGroup from "./NavGroup";
import NavItem from "./NavItem";

const SidebarMenu = () => (
    <nav className="flex-1 px-4 py-2">
        <NavItem to="/admin/dashboard" icon="🏠" label="Dashboard" />
        <NavGroup label="Quản lý" icon="📦">
            <NavItem to="/admin/users" label="Người dùng" icon="👤" />
            <NavItem to="/admin/products" label="Sản phẩm" icon="🎁" />
            <NavItem to="/admin/orders" label="Đơn hàng" icon="📝" />
        </NavGroup>
        <NavItem to="/admin/settings" icon="⚙️" label="Cài đặt" />
    </nav>
);

export default SidebarMenu;
