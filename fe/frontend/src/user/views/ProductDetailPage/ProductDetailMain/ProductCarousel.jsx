import React, { useState } from "react";

const ProductCarousel = ({ image, subImages = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [];
  if (image) allImages.push(image);
  if (subImages && subImages.length > 0) allImages.push(...subImages);

  const currentImage = allImages[currentImageIndex] || "https://via.placeholder.com/400x300?text=Không+có+ảnh";

  const nextImage = () => {
    if (allImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (allImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  return (
    <div className="mb-6">
      {/* Main Image */}
      <div className="relative group">
        <div
          className="w-full h-80 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <img
            src={currentImage}
            alt="Ảnh sản phẩm"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x300?text=Lỗi+tải+ảnh";
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 bg-white px-3 py-1 rounded text-sm font-medium">
              Nhấn để xem lớn
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Image Counter */}
      {allImages.length > 1 && (
        <div className="text-center mt-3">
          <span className="text-sm text-gray-500">
            {currentImageIndex + 1} / {allImages.length}
          </span>
        </div>
      )}

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {allImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Ảnh ${index + 1}`}
              className={`w-16 h-16 object-cover rounded cursor-pointer flex-shrink-0 ${currentImageIndex === index ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'
                }`}
              onClick={() => setCurrentImageIndex(index)}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/64x64?text=Lỗi";
              }}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={currentImage}
              alt="Ảnh lớn"
              className="max-w-full max-h-[90vh] rounded"
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
