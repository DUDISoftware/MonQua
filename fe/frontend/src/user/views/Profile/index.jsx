
import React, { useState, useEffect } from "react";
import UserCard from "./UserCard/UserCard";
import ProductList from "./ProductList/ProductList";
import ProfileAdBanner from "./Sidebar/ProfileAdBanner";
import { getProductsByUser } from "../../../api/product.api";
import { getCategories } from "../../../api/product.category.api";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem("user_id");
            if (!userId) return;
            try {
                const productsRes = await getProductsByUser(userId);
                const mappedProducts = (productsRes.data || []).map(item => ({
                    id: item._id,
                    name: item.title,
                    image: item.image_url,
                    status: item.status,
                    desc: item.description,
                    location: item.location,
                    label: item.label || (item.status === "active" ? "Hiển thị" : item.status === "pending" ? "Chờ duyệt" : "Đã tặng"),
                }));
                setProducts(mappedProducts);
                const categoriesRes = await getCategories();
                const mappedCategories = (categoriesRes.data || []).map(cat => ({
                    id: cat._id,
                    name: cat.name,
                    slug: cat.slug,
                }));
                setCategories(mappedCategories);
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-72 flex-shrink-0">
                <UserCard />
                <ProfileAdBanner />
            </aside>
            <main className="flex-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                    <div className="text-lg font-bold text-[#17805C] mb-4">Thông Tin Người Đăng</div>
                    <ProductList
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        products={products}
                        categories={categories}
                    />
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
