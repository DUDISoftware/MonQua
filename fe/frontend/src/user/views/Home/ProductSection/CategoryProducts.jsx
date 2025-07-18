import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { getProductsByCategory } from "../../../../api/productApi";

const CategoryProducts = ({ category }) => {

  return (
    <section className="mb-10 w-full">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-[#2E5E31]">
        DANH MỤC PHỔ BIẾN
      </h2>
        <p className="text-center text-gray-500">Khám phá các danh mục món đồ được chia sẻ nhiều nhất trong cộng đồng</p>
    </section>
  );
};

export default CategoryProducts;
