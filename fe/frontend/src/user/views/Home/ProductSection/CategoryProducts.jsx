import React from "react";
import ProductList from "./ProductList";

const products = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 11,
    name: "Áo sơ mi nam",
    image: "https://cdn.sstatic.net/Img/home/illo-freegifts.png",
    status: "Còn mới 90%",
    desc: "Cổ gài sạch sẽ.",
    location: "Q1, TPHCM",
    label: i % 2 === 0 ? "Sẵn sàng" : "Mới",
}));

const CategoryProducts = () => (
    <section className="mb-10 w-full">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Danh mục Quần Áo</h2>
        <ProductList products={products} />
    </section>
);

export default CategoryProducts;
