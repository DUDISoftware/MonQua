import React from "react";
import ProfileSidebar from "./Sidebar/ProfileSidebar";
import ProfileForm from "./ProfileForm/ProfileForm";

const ProfileSettingPage = () => (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-80 flex-shrink-0">
            <ProfileSidebar />
        </aside>
        <main className="flex-1 flex justify-center">
            <ProfileForm />
        </main>
    </div>
);

export default ProfileSettingPage;
