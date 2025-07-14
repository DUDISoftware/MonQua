import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../views/Home/FullHome";
import Login from "../views/Authorization/login";
import Register from "../views/Authorization/register";
import Roadmap from "../views/Roadmap/Roadmap";
import FullContactSection from "../views/ContactSection/FullContactSection";
import ProductListingPage from "../views/product/ProductListingPage";
import ProductDetailPage from "../views/ProductDetailPage/ProductDetailPage";
import CommunityPage from "../views/community/CommunityPage";
import MessengerPage from "../views/Messenger/MessengerPage";
import ProfilePage from "../views/Profile/ProfilePage";
import ProfileSettingPage from "../views/ProfileSetting/ProfileSettingPage";
import CharityProgramsPage from "../views/CharityPrograms/CharityProgramsPage";
import PostGiftPage from "../views/PostGift/index";
import UserProfilePage from "../views/UserProfile/UserProfilePage";

const Layout = () => (
    <>
        <Header />
        <main className="min-h-[70vh] flex flex-col justify-center w-full max-w-full px-2 sm:px-4">
            <Outlet />
        </main>
        <Footer />
    </>
);

// Layout không có Header/Footer cho login/register
const AuthLayout = () => (
    <main className="min-h-screen w-full max-w-full">
        <Outlet />
    </main>
);

const RouterUser = () => (
    <Routes>
        {/* Auth routes: không có header/footer */}
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>
        {/* Main layout: có header/footer */}
        <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* Thêm các route khác ở đây */}
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/contact" element={<FullContactSection />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/messenger" element={<MessengerPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/setting" element={<ProfileSettingPage />} />
            <Route path="/programs" element={<CharityProgramsPage />} />
            <Route path="/post-gift" element={<PostGiftPage />} />
            <Route path="/user/:userId" element={<UserProfilePage />} />

        </Route>
    </Routes>
);

export default RouterUser;