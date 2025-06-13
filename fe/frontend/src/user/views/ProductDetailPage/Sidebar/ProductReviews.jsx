import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
    {
        name: "Nguyễn Văn A",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        content: "Nhận được áo rất đẹp, cảm ơn bạn tặng nhiều!",
        rating: 5,
    },
];

const ProductReviews = () => (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <h3 className="font-bold text-lg mb-4">Câu chuyện người nhận</h3>
        {reviews.map((review, idx) => (
            <div key={idx} className="mb-4 last:mb-0">
                <div className="flex items-center mb-2">
                    <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full mr-2" />
                    <span className="font-medium">{review.name}</span>
                    <span className="flex ml-2">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={i < review.rating ? "text-yellow-400" : "text-gray-200"}
                                size={12}
                            />
                        ))}
                    </span>
                </div>
                <div className="text-gray-600 text-sm">{review.content}</div>
            </div>
        ))}
    </div>
);

export default ProductReviews;
