import React from "react";

const reviews = [
    { name: "Nguyễn Văn A", content: "Nhờ cộng đồng mình đã nhận được nhiều món đồ hữu ích." },
    { name: "Trần Thị B", content: "Cảm ơn mọi người đã chia sẻ, mình rất vui khi nhận được sách cho con." },
];

const CommunityReviews = () => (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <h3 className="font-bold text-lg mb-4">Câu chuyện người nhận</h3>
        {reviews.map((r, idx) => (
            <div key={idx} className="mb-3 last:mb-0">
                <div className="font-semibold">{r.name}</div>
                <div className="text-gray-600 text-sm">{r.content}</div>
            </div>
        ))}
    </div>
);

export default CommunityReviews;
