import React, { useState, useEffect, useRef } from "react";
import { addPost } from "../../../../api/post.api.js";
import { getUserById } from "../../../../api/user.api";

const PostEditor = ({ onPostCreated, categories = [], isLoggedIn }) => {
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const fileInputRef = useRef(null);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        // Fetch user info
        if (userId && token) {
            const fetchUserInfo = async () => {
                try {
                    const response = await getUserById(userId, token);
                    setUserInfo(response.data || response);
                } catch (error) {
                    console.error("Error fetching user info:", error);
                }
            };
            fetchUserInfo();
        }

        // Set default category if available
        if (categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]._id);
        }
    }, [userId, token, categories, selectedCategory]);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImages(prev => [...prev, ...filesArray]);

            // Create image previews
            const newPreviewImages = filesArray.map(file => URL.createObjectURL(file));
            setPreviewImages(prev => [...prev, ...newPreviewImages]);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        URL.revokeObjectURL(previewImages[index]); // Clean up
        setPreviewImages(previewImages.filter((_, i) => i !== index));
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async () => {
        // Kiểm tra đăng nhập trước khi đăng bài
        if (!isLoggedIn || !token) {
            setError("Bạn cần đăng nhập để đăng bài");
            // Hiển thị thông báo đăng nhập
            const confirmLogin = window.confirm("Bạn cần đăng nhập để đăng bài. Chuyển đến trang đăng nhập?");
            if (confirmLogin) {
                window.location.href = "/login";
            }
            return;
        }

        if (!content.trim() && images.length === 0) {
            setError("Vui lòng nhập nội dung hoặc thêm hình ảnh");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("content", content);
            formData.append("category_id", selectedCategory);
            formData.append("status", "active");

            if (images.length > 0) {
                images.forEach(image => {
                    formData.append("image_url", image);
                });
            }

            const response = await addPost(formData, token);

            // Call the parent callback when post is created
            if (onPostCreated) onPostCreated();

            // Reset form
            setContent("");
            setImages([]);
            setPreviewImages([]);
        } catch (error) {
            setError("Đăng bài thất bại. Vui lòng thử lại sau.");
            console.error("Error submitting post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-[#E6F4E6] flex items-center justify-center font-bold text-[#22C55E] mr-3">
                    {isLoggedIn ? (userInfo?.name?.[0] || "U") : "G"}
                </div>
                <div className="font-semibold">{isLoggedIn ? (userInfo?.name || "Bạn") : "Khách"}</div>
            </div>
            <textarea
                className="w-full border border-gray-200 rounded-lg p-3 mb-3 resize-none"
                rows={3}
                placeholder="Chia sẻ cảm nghĩ, hình ảnh hoặc video với cộng đồng..."
                value={content}
                onChange={handleContentChange}
            />

            {previewImages.length > 0 && (
                <div className="mb-3 grid grid-cols-3 gap-2">
                    {previewImages.map((preview, index) => (
                        <div key={index} className="relative">
                            <img
                                src={preview}
                                alt={`Preview ${index}`}
                                className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {categories.length > 0 && (
                <div className="mb-3">
                    <select
                        className="w-full border border-gray-200 rounded-lg p-2"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {error && <div className="text-red-500 mb-3 text-sm">{error}</div>}

            <div className="flex gap-3">
                <button
                    className="bg-[#22C55E] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#16a34a] transition"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Đang đăng..." : isLoggedIn ? "Đăng bài" : "Đăng bài"}
                </button>
                <button
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                    onClick={triggerFileInput}
                >
                    Ảnh
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default PostEditor;
