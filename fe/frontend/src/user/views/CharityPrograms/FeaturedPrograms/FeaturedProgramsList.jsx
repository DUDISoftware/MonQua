import React from "react";
import FeaturedProgramCard from "./FeaturedProgramCard";

const programs = [
    {
        id: 1,
        title: "Chung tay quyên góp áo ấm cho trẻ em vùng cao",
        image: "https://i.imgur.com/4M34hi2.png",
        desc: "Gửi tặng áo ấm, chăn, đồ dùng học tập cho các em nhỏ vùng cao trước mùa đông giá rét.",
    },
    {
        id: 2,
        title: "Chung tay quyên góp áo ấm cho trẻ em vùng cao",
        image: "https://i.imgur.com/4M34hi2.png",
        desc: "Gửi tặng áo ấm, chăn, đồ dùng học tập cho các em nhỏ vùng cao trước mùa đông giá rét.",
    },
    {
        id: 3,
        title: "Chung tay quyên góp áo ấm cho trẻ em vùng cao",
        image: "https://i.imgur.com/4M34hi2.png",
        desc: "Gửi tặng áo ấm, chăn, đồ dùng học tập cho các em nhỏ vùng cao trước mùa đông giá rét.",
    },
];

const FeaturedProgramsList = () => (
    <section className="mb-8 w-full">
        <div className="font-semibold text-base text-[#17805C] mb-2">
            Các chương trình nổi bật
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map(program => (
                <FeaturedProgramCard key={program.id} program={program} />
            ))}
        </div>
    </section>
);

export default FeaturedProgramsList;
