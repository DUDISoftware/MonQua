import React from "react";

const BannerSection = () => (
    <section className="w-full bg-[#E6F4E6] rounded-2xl overflow-hidden mb-8 flex flex-col md:flex-row items-center px-6 py-10">
        <div className="flex-1 flex flex-col justify-center items-start">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#17805C] mb-4">
                Chương trình thiện nguyện
            </h1>
            <p className="text-lg text-gray-700 mb-2">
                Cùng chung tay lan tỏa yêu thương, giúp đỡ cộng đồng qua các chương trình thiện nguyện nổi bật.
            </p>
        </div>
        <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
            <img
                src="https://cdn.sstatic.net/Img/home/illo-freegifts.png"
                alt="Charity Banner"
                className="h-40 md:h-56 object-contain"
            />
        </div>
    </section>
);

export default BannerSection;
