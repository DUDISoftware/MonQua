import React, { useState, useEffect } from "react";

// Mock data for now - có thể thay thế bằng API call thực tế
const defaultReviews = [
    {
        name: "Nguyễn Văn A",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        content: "Nhận được áo rất đẹp, cảm ơn bạn tặng nhiều!",
        rating: 5,
    },
];

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState(defaultReviews);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!productId) return;

            try {
                setLoading(true);
                // TODO: Implement API call để lấy reviews/comments cho sản phẩm
                // const response = await getProductReviews(productId);
                // if (response.error === 0) {
                //     setReviews(response.data || defaultReviews);
                // }
            } catch (error) {
                console.warn("Không thể lấy đánh giá:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
            <h3 className="font-bold text-lg mb-4">Câu chuyện người nhận</h3>
            {loading ? (
                <div className="text-center py-4 text-gray-500">Đang tải...</div>
            ) : (
                reviews.map((review, idx) => (
                    <div key={idx} className="mb-4 last:mb-0">
                        <div className="flex items-center mb-2">
                            <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full mr-2" />
                            <span className="font-medium">{review.name}</span>
                            <span className="flex ml-2">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-xs ${i < review.rating ? "text-yellow-400" : "text-gray-200"}`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </span>
                        </div>
                        <div className="text-gray-600 text-sm">{review.content}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductReviews;
