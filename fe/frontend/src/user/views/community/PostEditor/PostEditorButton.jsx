import React, { useState, useEffect } from "react";
import FacebookStylePostEditor from "./FacebookStylePostEditor";

const PostEditorButton = ({ onPostCreated, categories = [], isLoggedIn }) => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const userInfo = {
        name: localStorage.getItem("userName") || "Bạn",
        avatar: localStorage.getItem("userAvatar") || "",
    };

    // Set default category if available
    useEffect(() => {
        if (categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]._id);
        }
    }, [categories, selectedCategory]);

    const openEditor = () => {
        setIsEditorOpen(true);
    };

    const closeEditor = () => {
        setIsEditorOpen(false);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#E6F4E6] flex items-center justify-center font-bold text-[#22C55E] mr-3">
                    {isLoggedIn ? (userInfo.name[0] || "U") : "G"}
                </div>
                <div
                    onClick={openEditor}
                    className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-gray-500 cursor-pointer hover:bg-gray-100"
                >
                    {isLoggedIn ? `${userInfo.name} ơi, bạn đang nghĩ gì thế?` : "Bạn muốn chia sẻ điều gì?"}
                </div>
            </div>



            <div className="flex mt-3 border-t border-gray-100 pt-3">
                <button
                    onClick={openEditor}
                    className="flex-1 flex justify-center items-center gap-2 py-1 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    Video trực tiếp
                </button>
                <button
                    onClick={openEditor}
                    className="flex-1 flex justify-center items-center gap-2 py-1 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    Ảnh/video
                </button>
                <button
                    onClick={openEditor}
                    className="flex-1 flex justify-center items-center gap-2 py-1 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    Thước phim
                </button>
            </div>

            <FacebookStylePostEditor
                isOpen={isEditorOpen}
                onClose={closeEditor}
                onPostCreated={onPostCreated}
                categories={categories}
                isLoggedIn={isLoggedIn}
                initialCategory={selectedCategory}
            />
        </div>
    );
};

export default PostEditorButton;
