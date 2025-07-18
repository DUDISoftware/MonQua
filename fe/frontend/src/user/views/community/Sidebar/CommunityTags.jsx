import React from "react";

const CommunityTags = ({ categories, setCategoryFilter }) => {
    const handleTagClick = (categoryId) => {
        setCategoryFilter(prevId => prevId === categoryId ? null : categoryId);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-lg mb-4">Tags cộng đồng</h3>
            <div className="flex flex-wrap gap-2">
                {categories && categories.length > 0 ? (
                    categories.map((category) => (
                        <span
                            key={category._id}
                            className="bg-[#E6F4E6] text-[#22C55E] px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-[#22C55E] hover:text-white transition-colors"
                            onClick={() => handleTagClick(category._id)}
                        >
                            {category.name}
                        </span>
                    ))
                ) : (
                    <span className="text-gray-500 text-sm">Chưa có tags</span>
                )}
            </div>
        </div>
    );
};

export default CommunityTags;
