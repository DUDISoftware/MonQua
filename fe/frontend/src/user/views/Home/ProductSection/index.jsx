
import React, { useEffect, useState } from "react";
import ProductCategories from "./ProductCategories";
import CategoryProducts from "./CategoryProducts";
import { getCategories } from "../../../../api/product.category.api";

// Cho phép chọn nhiều danh mục để hiển thị sản phẩm
const ProductSection = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategories();
                // Chuẩn hóa dữ liệu trả về từ API
                const cats = (res.data || res.data?.data || []).map(cat => ({
                    id: cat._id,
                    name: cat.category_name || cat.name,
                    slug: cat.slug,
                }));
                setCategories(cats);
            } catch (err) {
                console.error("Lỗi khi lấy danh mục sản phẩm:", err.message);
            }
        };
        fetchCategories();
    }, []);

    // Xử lý chọn/bỏ chọn danh mục
    const handleSelectCategory = (cat) => {
        setSelectedCategories(prev => {
            if (prev.some(c => c.id === cat.id)) {
                // Nếu đã chọn thì bỏ chọn
                return prev.filter(c => c.id !== cat.id);
            } else {
                // Thêm vào danh sách chọn
                return [...prev, cat];
            }
        });
    };

    return (
        <section className="w-full py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Khám phá sản phẩm theo danh mục</h2>
            <ProductCategories
                categories={categories}
                selected={selectedCategories}
                onSelect={handleSelectCategory}
                multiSelect={true}
            />
            <div className="flex flex-col gap-8">
                {selectedCategories.length > 0 ? (
                    <CategoryProducts selectedCategories={selectedCategories} />
                ) : (
                    <p className="text-center text-gray-500">Chọn danh mục để xem sản phẩm.</p>
                )}
            </div>
        </section>
    );
};

export default ProductSection;
