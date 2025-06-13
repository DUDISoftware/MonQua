import React, { useState } from "react";
import ProductItem from "./ProductItem";

const products = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: "Áo sơ mi nam",
    image: "https://cdn.sstatic.net/Img/home/illo-freegifts.png",
    status: "Còn mới 90%",
    desc: "Cổ gài sạch sẽ.",
    location: "Q1, TPHCM",
    label: i % 2 === 0 ? "Sẵn sàng" : "Mới",
}));

const ProductList = () => {
    const [selected, setSelected] = useState(1);
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductItem
                    key={product.id}
                    product={product}
                    active={selected === product.id}
                    onClick={() => setSelected(product.id)}
                />
            ))}
        </div>
    );
};

export default ProductList;
