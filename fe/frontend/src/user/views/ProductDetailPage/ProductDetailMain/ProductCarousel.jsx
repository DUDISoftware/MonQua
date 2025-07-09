import React, { useState } from "react";

const ProductCarousel = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  if (!image) return null;

  return (
    <>
      {/* Ảnh sản phẩm nhỏ */}
      <div className="w-full mb-6 flex justify-center">
        <div
          className="relative w-[300px] h-[200px] overflow-hidden border border-gray-300 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          onClick={() => setShowModal(true)}
          style={{ cursor: "zoom-in" }}
        >
          <img
            src={image}
            alt="Ảnh sản phẩm"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Modal hiển thị ảnh lớn */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <img
            src={image}
            alt="Ảnh to"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl border border-white"
          />
        </div>
      )}
    </>
  );
};

export default ProductCarousel;
