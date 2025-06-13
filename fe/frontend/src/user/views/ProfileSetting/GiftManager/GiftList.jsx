import React from "react";
import GiftItem from "./GiftItem";

const gifts = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: "Áo khoác nữ",
    image: "https://cdn.sstatic.net/Img/home/illo-freegifts.png",
    status: i % 2 === 0 ? "Đã tặng" : "Đã nhận",
    desc: "Áo khoác giữ ấm, còn mới 90%",
    time: "2 ngày trước",
    location: "Q1, TPHCM",
}));

const GiftList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gifts.map(gift => (
            <GiftItem key={gift.id} gift={gift} />
        ))}
    </div>
);

export default GiftList;
