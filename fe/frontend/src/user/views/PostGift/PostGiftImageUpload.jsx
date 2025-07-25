import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";

const PostGiftImageUpload = ({ onImageSelect }) => {
  const inputRef = useRef();
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onImageSelect(file);

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block font-semibold text-[#17805C] mb-1">Ảnh Món Đồ</label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="px-4 py-2 bg-[#22C55E] text-white rounded-full font-semibold flex items-center gap-2"
          onClick={() => inputRef.current && inputRef.current.click()}
        >
          <FaCamera /> Chọn Tệp
        </button>
        <span className="text-xs text-gray-400">
          {fileName || "Không có tệp nào được chọn"}
        </span>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {preview && (
        <div className="mt-3">
          <img
            src={preview}
            alt="Preview"
            className="h-32 object-cover rounded-lg border border-[#B9E5C9]"
          />
        </div>
      )}

      <div className="text-[11px] text-gray-400 mt-1">
        Tối đa 5MB. Định dạng jpg, png.
      </div>
    </div>
  );
};

export default PostGiftImageUpload;
