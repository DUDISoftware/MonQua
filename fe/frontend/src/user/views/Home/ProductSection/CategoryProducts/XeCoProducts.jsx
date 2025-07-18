import React, { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";
import { getProductsByCategory } from "../../../../../api/product.api";

const XeCoProducts = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!category?.id) return;
        setLoading(true);
        const fetch = async () => {
            try {
                const res = await getProductsByCategory(category.id);
                const data = res.data || res;
                const mapped = (Array.isArray(data) ? data : []).map((item) => ({
                    id: item._id,
                    name: item.title,
                    image: item.image_url,
                    status: item.status,
                    desc: item.description,
                    location: item.location,
                    label: item.label || (item.status === "active" ? "Hiển thị" : item.status === "pending" ? "Chờ duyệt" : "Đã tặng"),
                }));
                setProducts(mapped);
            } catch (err) {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [category]);

    if (!category) return null;

    return (
        <section className="mb-10 w-full">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Danh mục: {category.name}</h2>
            {loading ? (
                <p className="text-center text-gray-500">Đang tải sản phẩm...</p>
            ) : products.length > 0 ? (
                <ProductList products={products} />
            ) : (
                <p className="text-center text-gray-500">Không có sản phẩm nào.</p>
            )}
        </section>
    );
};

export default XeCoProducts;
