import React, { useState } from "react";
import ProductBanner from "./Banner/ProductBanner";
import SearchBar from "./SearchFilter/SearchBar";
import FilterBar from "./SearchFilter/FilterBar";
import ProductList from "./ProductList/ProductList";
import ProductReviews from "./Sidebar/ProductReviews";
import FeaturedPosts from "./Sidebar/FeaturedPosts";
import ProductTags from "./Sidebar/ProductTags";
import Pagination from "./Pagination/Pagination";

const demoProducts = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: "Áo sơ mi nam",
    image: "https://cdn.sstatic.net/Img/home/illo-freegifts.png",
    status: "Còn mới 90%",
    desc: "Cổ gài sạch sẽ.",
    location: "Q1, TPHCM",
    label: i % 2 === 0 ? "Sẵn sàng" : "Mới",
}));

const ProductListingPage = () => {
    const [page, setPage] = useState(1);

    return (
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
                <ProductBanner />
                <SearchBar />
                <FilterBar />
                <ProductList products={demoProducts.slice((page - 1) * 10, page * 10)} />
                <Pagination current={page} total={Math.ceil(demoProducts.length / 10)} onChange={setPage} />
            </div>
            <aside className="w-full md:w-80 flex-shrink-0">
                <ProductReviews />
                <FeaturedPosts />
                <ProductTags />
            </aside>
        </div>
    );
};

export default ProductListingPage;
