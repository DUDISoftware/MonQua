
import React from "react";
import ProductItem from "../ProductItem/ProductItem";


const ProductList = ({ products = [] }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map(product => (
            <ProductItem key={product.id} product={product} />
        ))}
    </div>
);

export default ProductList;
