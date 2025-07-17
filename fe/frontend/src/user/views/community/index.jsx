import React from "react";
import PostEditor from "./PostEditor/PostEditor";
import CommunityTabs from "./Tabs/CommunityTabs";
import PostList from "./PostList/PostList";
import CommunityNotice from "./Sidebar/CommunityNotice";
import TopContributors from "./Sidebar/TopContributors";
import CommunityReviews from "./Sidebar/CommunityReviews";
import LatestPosts from "./Sidebar/LatestPosts";
import CommunityTags from "./Sidebar/CommunityTags";

const CommunityPage = () => (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
            <PostEditor />
            <CommunityTabs />
            <PostList />
        </div>
        <aside className="w-full md:w-80 flex-shrink-0">
            <CommunityNotice />
            <TopContributors />
            <CommunityReviews />
            <LatestPosts />
            <CommunityTags />
        </aside>
    </div>
);

export default CommunityPage;
