import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";

const ImageUpload = ({ onImageSelect, onSubImagesSelect, imageFile, subImages }) => {
    const mainImageRef = useRef();
    const subImagesRef = useRef();
    const [mainPreview, setMainPreview] = useState(null);
    const [subPreviews, setSubPreviews] = useState([]);
    const [error, setError] = useState("");

    const validateFile = (file) => {
        // Kiểm tra kích thước (5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return "Kích thước ảnh vượt quá 5MB. Vui lòng chọn ảnh nhỏ hơn.";
        }

        // Kiểm tra định dạng
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validTypes.includes(file.type)) {
            return "Chỉ chấp nhận các định dạng: JPG, PNG.";
        }

        return null; // Không có lỗi
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        setError("");

        if (file) {
            const validationError = validateFile(file);

            if (validationError) {
                setError(validationError);
                e.target.value = null;
                return;
            }

            onImageSelect(e);

            // Create a preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setMainPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setError("");

        // Validate each file
        for (const file of files) {
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                e.target.value = null;
                return;
            }
        }

        onSubImagesSelect(e);

        // Create previews
        const previews = [];
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                previews.push(reader.result);
                if (previews.length === files.length) {
                    setSubPreviews(previews);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block font-semibold text-[#17805C] mb-1">Ảnh chính *</label>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="px-4 py-2 bg-[#22C55E] text-white rounded-full font-semibold flex items-center gap-2"
                        onClick={() => mainImageRef.current && mainImageRef.current.click()}
                    >
                        <FaCamera /> Chọn ảnh chính
                    </button>
                    <span className="text-xs text-gray-400">
                        {imageFile ? imageFile.name : "Không có tệp nào được chọn"}
                    </span>
                    <input
                        ref={mainImageRef}
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={handleMainImageChange}
                        required
                    />
                </div>

                {mainPreview && (
                    <div className="mt-3">
                        <img
                            src={mainPreview}
                            alt="Main Preview"
                            className="h-32 object-cover rounded-lg border border-[#B9E5C9]"
                        />
                    </div>
                )}
            </div>

            <div className="mb-4">
                <label className="block font-semibold text-[#17805C] mb-1">Ảnh phụ</label>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-500 text-white rounded-full font-semibold flex items-center gap-2"
                        onClick={() => subImagesRef.current && subImagesRef.current.click()}
                    >
                        <FaCamera /> Chọn ảnh phụ
                    </button>
                    <span className="text-xs text-gray-400">
                        {subImages && subImages.length > 0 ? `${subImages.length} ảnh được chọn` : "Không có ảnh phụ"}
                    </span>
                    <input
                        ref={subImagesRef}
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png,image/jpg"
                        multiple
                        onChange={handleSubImagesChange}
                    />
                </div>

                {subPreviews.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                        {subPreviews.map((preview, index) => (
                            <img
                                key={index}
                                src={preview}
                                alt={`Sub Preview ${index + 1}`}
                                className="h-20 w-20 object-cover rounded-lg border border-[#B9E5C9]"
                            />
                        ))}
                    </div>
                )}
            </div>

            {error && (
                <div className="text-red-500 text-xs mt-1">
                    {error}
                </div>
            )}

            <div className="text-[11px] text-gray-400 mt-1">
                Tối đa 5MB mỗi ảnh. Định dạng jpg, png.
            </div>
        </div>
    );
};

export default ImageUpload;
