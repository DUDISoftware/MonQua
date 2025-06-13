import React from "react";

const BannerSection = () => (
    <section className="w-full bg-white rounded-2xl overflow-hidden mb-8 flex flex-col md:flex-row items-center px-0 md:px-0 py-0 min-h-[220px] border border-gray-200">
        <div className="flex-1 flex flex-col justify-center items-start px-6 py-8 md:py-12 md:px-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                Tặng món đồ cũ, trao đi
                <br />
                yêu thương mới
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-4">
                Lan tỏa niềm vui từ những điều nhỏ bé
                <br />
                Chia sẻ những món đồ không dùng đến với cộng đồng. Miễn phí, nhanh chóng, đầy nhân văn
            </p>
        </div>
        <div className="flex-1 flex justify-center items-center bg-[#E6F4E6] min-h-[180px] md:min-h-[220px]">
            <img
                src="https://cdn.sstatic.net/Img/home/illo-freegifts.png"
                alt="Banner"
                className="h-40 md:h-52 object-contain"
            />
        </div>
    </section>
);

export default BannerSection;
