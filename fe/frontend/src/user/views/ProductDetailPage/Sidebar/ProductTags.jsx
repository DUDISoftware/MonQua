import React from "react";

const defaultTags = ["Quần áo", "Sách", "Đồ chơi", "Gia dụng", "Điện tử", "Cây cảnh"];

const ProductTags = ({ categoryName, categories = [], product = null }) => {
    // Lấy category name từ product nếu có
    const productCategoryName = product?.category_id?.category_name ||
        categories.find(cat => cat._id === (product?.category_id?._id || product?.category_id))?.category_name ||
        categoryName;

    // Lấy tên các category từ API, nếu không có thì dùng tags mặc định
    const categoryTags = categories.length > 0 ?
        categories.map(cat => cat.category_name) :
        defaultTags;

    // Nếu có category từ sản phẩm, đưa nó lên đầu
    const tagsToShow = productCategoryName ?
        [productCategoryName, ...categoryTags.filter(tag => tag !== productCategoryName).slice(0, 5)] :
        categoryTags.slice(0, 6);

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-lg mb-4">Tags liên quan</h3>
            <div className="flex flex-wrap gap-2">
                {tagsToShow.map((tag, idx) => (
                    <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${idx === 0 && productCategoryName ?
                            'bg-[#22C55E] text-white' :
                            'bg-[#E6F4E6] text-[#22C55E] hover:bg-[#22C55E] hover:text-white'
                            }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProductTags;
