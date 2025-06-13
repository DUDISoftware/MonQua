import React from "react";
import BannerSection from "./Banner/BannerSection";
import FeaturedProgramsList from "./FeaturedPrograms/FeaturedProgramsList";
import HowToDonate from "./HowToDonate/HowToDonate";
import PopularProgramsList from "./PopularPrograms/PopularProgramsList";

const CharityProgramsPage = () => (
    <div className="min-h-screen bg-[#E6F4E6] py-8 px-2 flex flex-col items-center">
        <div className="w-full max-w-4xl">
            <BannerSection />
            <FeaturedProgramsList />
            <HowToDonate />
            <PopularProgramsList />
        </div>
    </div>
);

export default CharityProgramsPage;
