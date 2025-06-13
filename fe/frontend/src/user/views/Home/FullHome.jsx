import React from "react";
import BannerSection from "./Banner/BannerSection";
import SearchBar from "./SearchFilter/SearchBar";
import FilterBar from "./SearchFilter/FilterBar";
import PopularProducts from "./ProductSection/PopularProducts";
import CategoryProducts from "./ProductSection/CategoryProducts";
import ProductCategories from "./ProductSection/ProductCategories";
import HowItWorks from "./HowItWorks/HowItWorks";
import WhyUs from "./WhyUs/WhyUs";
import CustomerReviews from "./CustomerReviews/CustomerReviews";
import CallToAction from "./CallToAction/CallToAction";

const FullHome = () => (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col items-center">
        <BannerSection />
        <SearchBar />
        <FilterBar />
        <PopularProducts />
        <CategoryProducts />
        <ProductCategories />
        <HowItWorks />
        <WhyUs />
        <CustomerReviews />
        <CallToAction />
    </div>
);

export default FullHome;
