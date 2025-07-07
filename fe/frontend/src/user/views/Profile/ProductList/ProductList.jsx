import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { getProductsByUser } from "../../../../api/productApi";
import ProfileTabs from "../Tabs/ProfileTabs";

const ProductList = ({ activeTab, onTabChange }) => {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(null);
    const [counts, setCounts] = useState({ total: 0, active: 0, given: 0 });

    useEffect(() => {
        const fetchUserProducts = async () => {
            const userId = localStorage.getItem("user_id");
            if (!userId) return;

            try {
                const data = await getProductsByUser(userId);
                setProducts(data);

                // Đếm số lượng theo trạng thái
                const total = data.length;
                const activeCount = data.filter(p => p.status === "active" || p.status === "pending").length;
                const givenCount = data.filter(p => p.status === "given").length;
                setCounts({ total, active: activeCount, given: givenCount });
            } catch (err) {
                console.error("Lỗi khi lấy sản phẩm người dùng:", err);
            }
        };

        fetchUserProducts();
    }, []);

    const filterByStatus = (product) => {
        switch (activeTab) {
            case 0: return true;
            case 1: return product.status === "active" || product.status === "pending";
            case 2: return product.status === "given";
            default: return true;
        }
    };

    const filteredProducts = products.filter(filterByStatus);

    return (
        <>
            <ProfileTabs
                active={activeTab}
                onChangeTab={onTabChange}
                counts={counts}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductItem
                        key={product._id}
                        product={{
                            id: product._id,
                            name: product.title,
                            image: product.image_url,
                            status: product.status,
                            desc: product.description,
                            location: product.location,
                            label:
                                product.status === "active"
                                    ? "Hiển thị"
                                    : product.status === "pending"
                                        ? "Chờ duyệt"
                                        : "Đã tặng",
                        }}
                        active={selected === product._id}
                        onClick={() => setSelected(product._id)}
                    />
                ))}
            </div>
        </>
    );
};

export default ProductList;
