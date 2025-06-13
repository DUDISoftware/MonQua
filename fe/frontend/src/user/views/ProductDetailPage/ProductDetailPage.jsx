import React from "react";
import ProductBanner from "./Banner/ProductBanner";
import ProductCarousel from "./ProductDetailMain/ProductCarousel";
import ProductTitle from "./ProductDetailMain/ProductTitle";
import ProductFeatures from "./ProductDetailMain/ProductFeatures";
import ProductDescription from "./ProductDetailMain/ProductDescription";
import RelatedProductsList from "./RelatedProducts/RelatedProductsList";
import Pagination from "./Pagination/Pagination";
import GiverInfo from "./Sidebar/GiverInfo";
import ProductReviews from "./Sidebar/ProductReviews";
import FeaturedPosts from "./Sidebar/FeaturedPosts";
import ProductTags from "./Sidebar/ProductTags";

const ProductDetailPage = () => (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
            <ProductBanner />
            <ProductCarousel />
            <ProductTitle />
            <ProductFeatures />
            <ProductDescription />
            <RelatedProductsList />
            <Pagination />
        </div>
        <aside className="w-full md:w-80 flex-shrink-0">
            <GiverInfo />
            <ProductReviews />
            <FeaturedPosts />
            <ProductTags />
        </aside>
    </div>
);

export default ProductDetailPage;
