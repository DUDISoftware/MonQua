import React, { useState } from "react";
import UserCard from "./UserCard/UserCard";
import ProductList from "./ProductList/ProductList";
import ProfileAdBanner from "./Sidebar/ProfileAdBanner";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-72 flex-shrink-0">
                <UserCard />
                <ProfileAdBanner />
            </aside>
            <main className="flex-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                    <div className="text-lg font-bold text-[#17805C] mb-4">Thông Tin Người Đăng</div>
                    <ProductList activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
