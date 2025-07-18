import React, { useState, useEffect } from "react";
import PostEditorButton from "./PostEditor/PostEditorButton";
import CommunityTabs from "./Tabs/CommunityTabs";
import PostList from "./PostList/PostList";
import CommunityNotice from "./Sidebar/CommunityNotice";
import TopContributors from "./Sidebar/TopContributors";
import CommunityReviews from "./Sidebar/CommunityReviews";
import LatestPosts from "./Sidebar/LatestPosts";
import CommunityTags from "./Sidebar/CommunityTags";
import { getPosts, getPostsByCategory } from "../../../api/post.api.js";
import { getUsers } from "../../../api/User.api.js";
import { getPostCategories } from "../../../api/post.category.api.js";
import axios from "axios";

const CommunityPage = () => {
    // State management
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({});
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Lấy token nếu có
    const token = localStorage.getItem("token");

    // Kiểm tra người dùng đã đăng nhập chưa
    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);

    // Fetch users data - chỉ lấy khi có token
    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) {
                console.log("No token, skipping users fetch");
                return;
            }

            try {
                const response = await getUsers(token);
                const usersData = response.data || response.users || response;
                const usersMap = {};
                if (Array.isArray(usersData)) {
                    usersData.forEach(user => {
                        usersMap[user._id] = user;
                    });
                }
                setUsers(usersMap);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [token]);    // Fetch categories data - không cần token
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Không cần token để lấy danh sách categories
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/categories/list`);
                const categoriesData = response.data.data || response.data.categories || response.data || [];
                const categoriesMap = {};

                if (Array.isArray(categoriesData)) {
                    setCategories(categoriesData);
                    categoriesData.forEach(category => {
                        categoriesMap[category._id] = category;
                    });
                }

                // Store the mapping of categories
                sessionStorage.setItem("categoriesMap", JSON.stringify(categoriesMap));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Fetch posts data - không cần token
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                let response;
                // Nếu có categoryFilter, lọc bài viết theo danh mục
                if (categoryFilter) {
                    // Không cần token để lấy bài viết theo danh mục
                    response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/category/${categoryFilter}`);
                } else {
                    // Không cần token để lấy tất cả bài viết
                    response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/list`);
                }

                const postsData = response.data.data || response.data.posts || response.data || [];
                console.log("API response:", response);
                console.log("Posts data extracted:", postsData);

                // Làm giàu dữ liệu posts với thông tin tác giả và thời gian
                const enrichedPosts = Array.isArray(postsData) ? postsData.map(post => {
                    const user = users[post.user_id] || {};
                    const category = JSON.parse(sessionStorage.getItem("categoriesMap") || "{}")[post.category_id] || {};

                    // Nếu không có thông tin user (chưa đăng nhập), chỉ hiển thị User ID
                    return {
                        ...post,
                        author: user.name || `Người dùng #${post.user_id?.substring(0, 5) || "Unknown"}`,
                        authorAvatar: user.avatar,
                        categoryName: category.name || "Chưa phân loại",
                        time: new Date(post.created_at || Date.now()).toLocaleString()
                    };
                }) : [];

                console.log("Enriched posts:", enrichedPosts);
                setPosts(enrichedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Không thể tải bài viết. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [refresh, activeTab, categoryFilter, users]);

    // Không cần hàm này nữa vì đã sử dụng trực tiếp axios trong useEffect

    // Handle post creation
    const handlePostCreated = () => {
        setRefresh(prev => !prev);
    };

    return (
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
                {/* Hiển thị PostEditor kiểu Facebook cho tất cả người dùng */}
                <PostEditorButton
                    onPostCreated={handlePostCreated}
                    categories={categories}
                    isLoggedIn={isLoggedIn}
                />

                <CommunityTabs
                    active={activeTab}
                    setActive={setActiveTab}
                />
                <PostList
                    posts={posts}
                    loading={loading}
                    error={error}
                    activeTab={activeTab}
                    categoryFilter={categoryFilter}
                    isLoggedIn={isLoggedIn}
                />
            </div>
            <aside className="w-full md:w-80 flex-shrink-0">
                <CommunityNotice />
                <TopContributors />
                <CommunityReviews />
                <LatestPosts posts={posts.slice(0, 5)} />
                <CommunityTags
                    categories={categories}
                    setCategoryFilter={setCategoryFilter}
                />
            </aside>
        </div>
    );
};

export default CommunityPage;
