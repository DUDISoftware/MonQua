import React, { useState, useEffect } from "react";
import ProductBanner from "./Banner/ProductBanner.jsx";
import SearchBar from "./SearchFilter/SearchBar.jsx";
import FilterBar from "./SearchFilter/FilterBar.jsx";
import ProductList from "./ProductList/ProductList.jsx";
import ProductReviews from "./Sidebar/ProductReviews.jsx";
import FeaturedPosts from "./Sidebar/FeaturedPosts.jsx";
import ProductTags from "./Sidebar/ProductTags.jsx";
import Pagination from "./Pagination/Pagination.jsx";
import { getProducts } from "../../../api/product.api.js";
import { getProductsByCategory } from "../../../api/product.api.js";
import { getCategories } from "../../../api/product.category.api.js";

const PAGE_SIZE = 12;

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res;
        if (selectedCategory) {
          res = await getProductsByCategory(selectedCategory);
        } else {
          res = await getProducts();
        }
        const data = res.data || [];
        const mapped = data.map((item) => ({
          id: item._id,
          name: item.title,
          image: item.image_url,
          status: item.status,
          desc: item.description,
          location: item.location, category_id: item.category_id?._id,
          label: item.label || (item.status === "active" ? "Hiển thị" : item.status === "pending" ? "Chờ duyệt" : "Đã tặng"),
        }));
        setProducts(mapped);
        setFiltered(mapped);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        const mapped = (res.data || []).map(cat => ({
          id: cat._id,
          name: cat.name,
          slug: cat.slug,
        }));
        setCategories(mapped);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [selectedCategory]);

  // Lọc theo danh mục mỗi khi category thay đổi
  useEffect(() => {
    setPage(1);
  }, [filtered]);

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
