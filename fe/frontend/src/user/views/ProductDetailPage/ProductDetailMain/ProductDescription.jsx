import React, { useState } from "react";

const ProductDescription = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 200;
    const shouldTruncate = description && description.length > maxLength;

    const displayText = shouldTruncate && !isExpanded
        ? description.substring(0, maxLength) + "..."
        : description;

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mô tả</h3>

            <div className="bg-gray-50 p-4 rounded-lg">
                {description ? (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            {displayText}
                        </p>

                        {shouldTruncate && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                            >
                                {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                            </button>
                        )}
                    </>
                ) : (
                    <p className="text-gray-500 italic">
                        Chưa có mô tả cho sản phẩm này.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductDescription;
