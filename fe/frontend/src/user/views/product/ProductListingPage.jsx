import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import ProductBanner from "./Banner/ProductBanner";
import SearchBar from "./SearchFilter/SearchBar";
import FilterBar from "./SearchFilter/FilterBar";
import ProductList from "./ProductList/ProductList";
import ProductReviews from "./Sidebar/ProductReviews";
import FeaturedPosts from "./Sidebar/FeaturedPosts";
import ProductTags from "./Sidebar/ProductTags";
import Pagination from "./Pagination/Pagination";
import { getAllProducts } from "../../../api/productApi";

const PAGE_SIZE = 12;

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);

  const [selectedQuality, setSelectedQuality] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation(); // theo dõi URL
  const categoryFromURL = searchParams.get("category") || "";

  // Fetch sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        const mapped = res.map((item) => ({
          id: item._id,
          name: item.title,
          image: item.image_url,
          status: item.status,
          desc: item.description,
          quality: item.quality,
          location: item.location,
          category_id: item.category_id?._id,
          label:
            item.view_count > item.interested_count
              ? "Xem nhiều"
              : "Quan tâm nhiều",
        }));
        setProducts(mapped);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err.message);
      }
    };

    fetchProducts();
  }, []);

  // Lọc lại khi URL thay đổi hoặc quality thay đổi
  useEffect(() => {
    let temp = [...products];

    if (categoryFromURL) {
      temp = temp.filter((p) => p.category_id === categoryFromURL);
    }

    if (selectedQuality) {
      temp = temp.filter((p) => p.quality === selectedQuality);
    }

    setFiltered(temp);
    setPage(1);
  }, [location, selectedQuality, products]); // 👈 re-run khi URL đổi

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginatedProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Hàm xử lý thay đổi danh mục
  const handleCategoryChange = (catId) => {
    const params = new URLSearchParams(searchParams);
    if (catId) {
      params.set("category", catId);
    } else {
      params.delete("category");
    }
    setSearchParams(params); // tự động update URL và re-render
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <ProductBanner />
        <SearchBar />
        <FilterBar
          onCategoryChange={handleCategoryChange}
          onQualityChange={setSelectedQuality}
          selectedCategory={categoryFromURL}
          selectedQuality={selectedQuality}
        />
        <ProductList products={paginatedProducts} />
        {totalPages > 1 && (
          <Pagination current={page} total={totalPages} onChange={setPage} />
        )}
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
