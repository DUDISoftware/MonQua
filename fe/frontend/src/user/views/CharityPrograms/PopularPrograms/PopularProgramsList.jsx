import React from "react";
import PopularProgramCard from "./PopularProgramCard";

const programs = [
    {
        id: 1,
        title: "Quyên góp quần áo phổ biến",
        image: "https://i.imgur.com/4M34hi2.png",
        desc: "Nhận quần áo, giày dép, chăn màn còn sử dụng tốt để gửi tới các vùng khó khăn.",
        highlight: false,
    },
    {
        id: 2,
        title: "Quyên góp vật phẩm phổ biến",
        image: "https://i.imgur.com/4M34hi2.png",
        desc: "Đồ dùng học tập, sách vở, đồ chơi, vật dụng cá nhân còn mới.",
        highlight: false,
    },
    {
        id: 3,
        title: "Quyên góp vật phẩm phổ biến",
        image: "https://i.imgur.com/4M34hi2.png",
        desc: "Đồ dùng học tập, sách vở, đồ chơi, vật dụng cá nhân còn mới.",
        highlight: false,
    },
    {
        id: 4,
        title: "Quyên góp quần áo phổ biến",
        image: "https://i.imgur.com/4M34hi2.png",
        desc: "Nhận quần áo, giày dép, chăn màn còn sử dụng tốt để gửi tới các vùng khó khăn.",
        highlight: true,
    },
    {
        id: 5,
        title: "Quyên góp vật phẩm phổ biến",
        image: "https://i.imgur.com/4M34hi2.png",
        desc: "Đồ dùng học tập, sách vở, đồ chơi, vật dụng cá nhân còn mới.",
        highlight: true,
    },
    {
        id: 6,
        title: "Quyên góp vật phẩm phổ biến",
        image: "https://i.imgur.com/4M34hi2.png",
        desc: "Đồ dùng học tập, sách vở, đồ chơi, vật dụng cá nhân còn mới.",
        highlight: true,
    },
];

const PopularProgramsList = () => (
    <section className="mb-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map(program => (
                <PopularProgramCard key={program.id} program={program} />
            ))}
        </div>
    </section>
);

export default PopularProgramsList;
