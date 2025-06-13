import React from "react";
import AdminHeader from "./header/AdminHeader";
import AdminSidebar from "./sidebar/AdminSidebar";
import AdminFooter from "./footer/AdminFooter";

const AdminLayout = ({ children }) => (
    <div className="min-h-screen flex flex-col bg-[#F6F6F6]">
        <AdminHeader />
        <div className="flex flex-1">
            <AdminSidebar />
            <main className="flex-1 p-6">{children}</main>
        </div>
        <AdminFooter />
    </div>
);

export default AdminLayout;
