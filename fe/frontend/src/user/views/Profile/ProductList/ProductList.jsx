
import React, { useState } from "react";
import ProductItem from "./ProductItem";
import ProfileTabs from "../Tabs/ProfileTabs";

const ProductList = ({ activeTab, onTabChange, products = [], categories = [] }) => {
    const [selected, setSelected] = useState(null);

    // Đếm số lượng theo trạng thái
    const total = products.length;
    const activeCount = products.filter(p => p.status === "active" || p.status === "pending").length;
    const givenCount = products.filter(p => p.status === "given").length;
    const counts = { total, active: activeCount, given: givenCount };

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
                        key={product.id}
                        product={product}
                        active={selected === product.id}
                        onClick={() => setSelected(product.id)}
                    />
                ))}
            </div>
        </>
    );
};

export default ProductList;
