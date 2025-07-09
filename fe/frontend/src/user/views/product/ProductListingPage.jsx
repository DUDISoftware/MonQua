import React, { useState, useEffect } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState("");

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
          location: item.location,
          category_id: item.category_id?._id,
          label:
            item.view_count > item.interested_count
              ? "Xem nhiều"
              : "Quan tâm nhiều",
        }));
        setProducts(mapped);
        setFiltered(mapped); // Ban đầu là tất cả
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err.message);
      }
    };

    fetchProducts();
  }, []);

  // Lọc theo danh mục mỗi khi category thay đổi
  useEffect(() => {
    if (!selectedCategory) {
      setFiltered(products);
    } else {
      const filteredByCat = products.filter(
        (p) => p.category_id === selectedCategory
      );
      setFiltered(filteredByCat);
    }
    setPage(1); // reset về trang đầu
  }, [selectedCategory, products]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginatedProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <ProductBanner />
        <SearchBar />
        <FilterBar onCategoryChange={setSelectedCategory} />
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
