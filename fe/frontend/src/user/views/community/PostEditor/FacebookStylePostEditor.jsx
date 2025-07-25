import React, { useState, useEffect, useRef } from "react";
import { addPost } from "../../../../api/post.api.js";
import { getUserById } from "../../../../api/user.api";
import "./FacebookPostEditor.css";

const FacebookStylePostEditor = ({ isOpen, onClose, onPostCreated, categories = [], isLoggedIn, initialCategory = "" }) => {
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [step, setStep] = useState(1); // 1: initial form, 2: preview/details
    const fileInputRef = useRef(null);
    const modalRef = useRef(null);
    const textareaRef = useRef(null);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // Handle clicks outside the modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        // Only add the event listener if the modal is open
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            // Focus the textarea when modal opens
            if (textareaRef.current) {
                textareaRef.current.focus();
            }
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Fetch user info
    useEffect(() => {
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

        // Use initialCategory or set default category if available
        if (initialCategory && initialCategory !== selectedCategory) {
            setSelectedCategory(initialCategory);
        } else if (categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]._id);
        }
    }, [userId, token, categories, selectedCategory, initialCategory]);

    // Update category when initialCategory changes
    useEffect(() => {
        if (initialCategory && initialCategory !== selectedCategory) {
            setSelectedCategory(initialCategory);
        }
    }, [initialCategory]);

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

    const handleNext = () => {
        if (!selectedCategory && categories.length > 0) {
            setError("Vui lòng chọn danh mục cho bài viết");
            return;
        }

        if (content.trim() || images.length > 0) {
            setStep(2);
            setError(""); // Clear any errors when moving to next step
        } else {
            setError("Vui lòng nhập nội dung hoặc thêm hình ảnh");
        }
    };

    const handleSubmit = async () => {
        if (!isLoggedIn || !token) {
            setError("Bạn cần đăng nhập để đăng bài");
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
            setStep(1);
            onClose();
        } catch (error) {
            setError("Đăng bài thất bại. Vui lòng thử lại sau.");
            console.error("Error submitting post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 fb-post-editor-overlay">
            <div
                ref={modalRef}
                className="bg-white rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-xl fb-post-editor"
            >
                {/* Modal Header */}
                <div className="border-b border-gray-200 p-4 relative">
                    <h2 className="text-xl font-semibold text-center">
                        {step === 1 ? "Tạo bài viết" : "Xác nhận bài viết"}
                    </h2>
                    {step === 1 ? (
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    ) : (
                        <button
                            onClick={() => setStep(1)}
                            className="absolute left-4 top-4 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                    )}
                </div>

                {step === 1 ? (
                    /* Step 1: Content Input */
                    <div className="p-4">
                        {/* User Info */}
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#E6F4E6] flex items-center justify-center font-bold text-[#22C55E] mr-3">
                                {isLoggedIn ? (userInfo?.name?.[0] || "U") : "G"}
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold">{isLoggedIn ? (userInfo?.name || "Bạn") : "Khách"}</div>
                                <div className="flex gap-2">
                                    <button className="text-xs bg-gray-100 px-2 py-1 rounded-md flex items-center">
                                        <span>Chỉ mình tôi</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </button>

                                    {/* Category indicator */}
                                    {selectedCategory && categories.length > 0 && (
                                        <div className="text-xs bg-[#E6F4E6] text-[#22C55E] px-2 py-1 rounded-md">
                                            {categories.find(cat => cat._id === selectedCategory)?.name || "Danh mục"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Content Input */}
                        <textarea
                            ref={textareaRef}
                            className="w-full outline-none p-3 mb-3 resize-none text-lg placeholder-gray-400 min-h-[120px] focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-20 rounded-lg transition-all"
                            placeholder={`${isLoggedIn ? userInfo?.name || "Tuấn Dan" : "Khách"} ơi, bạn đang nghĩ gì thế?`}
                            value={content}
                            onChange={handleContentChange}
                        />

                        {/* Image Preview */}
                        {previewImages.length > 0 && (
                            <div className={`mb-4 ${previewImages.length === 1 ? 'w-full' : 'grid grid-cols-2 gap-2'}`}>
                                {previewImages.map((preview, index) => (
                                    <div key={index} className="relative rounded-lg overflow-hidden">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index}`}
                                            className="w-full object-cover max-h-80"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-gray-800 bg-opacity-60 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Category Selection - Enhanced with Tailwind */}
                        {categories.length > 0 && (
                            <div className="mb-4 border border-gray-100 rounded-lg p-3 bg-gray-50">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-[#E6F4E6] flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z"></path>
                                                <path d="M6 13v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4"></path>
                                                <path d="M6 9V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"></path>
                                            </svg>
                                        </div>
                                        <div className="font-medium text-gray-700">Danh mục bài viết</div>
                                    </div>
                                    {!selectedCategory && (
                                        <div className="px-2 py-1 bg-red-50 text-xs font-medium text-red-500 rounded">Vui lòng chọn</div>
                                    )}
                                </div>

                                {/* Category Pills */}
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(category => (
                                        <button
                                            key={category._id}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category._id
                                                ? 'bg-[#22C55E] text-white shadow-sm ring-2 ring-[#22C55E] ring-opacity-50'
                                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-[#E6F4E6] hover:border-[#22C55E]'
                                                }`}
                                            onClick={() => setSelectedCategory(category._id)}
                                        >
                                            {selectedCategory === category._id && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-1 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            )}
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="border border-gray-200 rounded-lg p-3 mb-4 bg-gray-50">
                            <div className="font-medium mb-3 text-gray-700">Thêm vào bài viết của bạn</div>
                            <div className="flex gap-3 justify-around">
                                <button
                                    onClick={triggerFileInput}
                                    className="flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all w-full"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#E6F4E6] flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">Ảnh/Video</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all w-full">
                                    <div className="w-8 h-8 rounded-full bg-[#E6F4E6] flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                            <line x1="9" y1="9" x2="9.01" y2="9" />
                                            <line x1="15" y1="9" x2="15.01" y2="9" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">Cảm xúc</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all w-full">
                                    <div className="w-8 h-8 rounded-full bg-[#E6F4E6] flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">Vị trí</span>
                                </button>
                            </div>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                        />

                        {error && <div className="text-red-500 mb-3 text-sm font-medium flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            {error}
                        </div>}

                        {/* Next Button */}
                        <button
                            className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-sm ${(content.trim() || images.length > 0) && selectedCategory
                                ? 'bg-[#22C55E] hover:bg-[#16a34a] shadow-[#22C55E]/20'
                                : 'bg-[#22C55E]/70 cursor-not-allowed'
                                }`}
                            onClick={handleNext}
                        >
                            Tiếp theo
                        </button>
                    </div>
                ) : (
                    /* Step 2: Preview & Details */
                    <div className="p-4">
                        <div className="mb-4">
                            {/* Content Preview */}
                            <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 rounded-full bg-[#E6F4E6] flex items-center justify-center font-bold text-[#22C55E] mr-3">
                                        {isLoggedIn ? (userInfo?.name?.[0] || "U") : "G"}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold">{isLoggedIn ? (userInfo?.name || "Bạn") : "Khách"}</div>
                                        <div className="text-xs text-gray-500">Ngay bây giờ · Chỉ mình tôi</div>
                                    </div>
                                </div>

                                <p className="whitespace-pre-wrap text-gray-800 mb-3">{content}</p>

                                {previewImages.length > 0 && (
                                    <div className={`rounded-lg overflow-hidden border border-gray-100 ${previewImages.length === 1
                                        ? 'w-full'
                                        : previewImages.length === 2
                                            ? 'grid grid-cols-2 gap-1'
                                            : previewImages.length === 3
                                                ? 'grid grid-cols-3 gap-1'
                                                : 'grid grid-cols-2 gap-1'
                                        }`}>
                                        {previewImages.map((preview, index) => (
                                            <img
                                                key={index}
                                                src={preview}
                                                alt={`Preview ${index}`}
                                                className="w-full object-cover aspect-square"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Display selected category */}
                            {selectedCategory && categories.length > 0 && (
                                <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-[#E6F4E6] flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z"></path>
                                                <path d="M6 13v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4"></path>
                                                <path d="M6 9V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"></path>
                                            </svg>
                                        </div>
                                        <div className="font-medium text-gray-700">Danh mục bài viết:</div>
                                        <div className="bg-[#22C55E] text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {categories.find(cat => cat._id === selectedCategory)?.name || "Danh mục"}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {error && <div className="text-red-500 mb-3 text-sm font-medium flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            {error}
                        </div>}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                                onClick={() => setStep(1)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="19" y1="12" x2="5" y2="12"></line>
                                    <polyline points="12 19 5 12 12 5"></polyline>
                                </svg>
                                Quay lại
                            </button>
                            <button
                                className={`flex-1 py-3 rounded-lg font-semibold text-white transition-all shadow-sm flex items-center justify-center gap-2 ${isSubmitting
                                    ? 'bg-[#22C55E]/70 cursor-not-allowed'
                                    : 'bg-[#22C55E] hover:bg-[#16a34a] shadow-[#22C55E]/20'
                                    }`}
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang đăng bài...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 2L11 13"></path>
                                            <path d="M22 2L15 22 11 13 2 9 22 2z"></path>
                                        </svg>
                                        Đăng bài
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FacebookStylePostEditor;
