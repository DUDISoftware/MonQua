import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { getProductById } from "../../../api/productApi";

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error("Lỗi khi lấy chi tiết sản phẩm:", err);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div className="text-center py-10">Đang tải chi tiết sản phẩm...</div>;

    return (
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
                <ProductBanner />
                <ProductCarousel image={product.image_url} />
                <ProductTitle title={product.title} />
                <ProductFeatures
                    status={product.status}
                    location={product.location}
                />
                <ProductDescription description={product.description} />
                <RelatedProductsList productId={product._id} />
                <Pagination />
            </div>
            <aside className="w-full md:w-80 flex-shrink-0">
               <GiverInfo user={{ ...product.user_id, productId: product._id }} />



                <ProductReviews productId={product._id} />
                <FeaturedPosts />
                <ProductTags tags={product.tags} />
            </aside>
        </div>
    );
};

export default ProductDetailPage;
