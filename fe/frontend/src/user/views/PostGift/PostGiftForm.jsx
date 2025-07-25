import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostGiftCategorySelect from "./PostGiftCategorySelect";
import PostGiftConditionSelect from "./PostGiftConditionSelect";
import PostGiftLocationSelect from "./PostGiftLocationSelect";
import PostGiftDeliveryMethod from "./PostGiftDeliveryMethod";
import PostGiftImageUpload from "./PostGiftImageUpload";
import { addProduct } from "../../../api/product.api";

const PostGiftForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [contactPhone, setContactPhone] = useState(localStorage.getItem("phone") || "");
  const [contactZalo, setContactZalo] = useState("");
  const [isHeavy, setIsHeavy] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [quality, setQuality] = useState("new"); // Mặc định là new
  const [deliveryMethod, setDeliveryMethod] = useState("giao_tan_tay");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!userId || !title || !categoryId || !imageFile) {
      setError("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_id", categoryId);
    formData.append("user_id", userId);
    formData.append("location", location);
    formData.append("contact_phone", contactPhone);
    formData.append("contact_zalo", contactZalo);
    formData.append("is_heavy", isHeavy);
    formData.append("label", quality); // Chuyển quality thành label để phù hợp với backend
    formData.append("delivery_method", deliveryMethod);
    formData.append("status", "pending"); // Trạng thái mặc định khi tạo sản phẩm mới

    // Thêm ảnh chính
    if (imageFile) {
      formData.append("image_url", imageFile);
    }

    try {
      const response = await addProduct(formData, token);
      console.log("Đăng tin thành công:", response);
      setSuccess(true);
    } catch (err) {
      console.error("Lỗi khi đăng sản phẩm:", err);
      setError(err.response?.data?.error_text || "Đăng tin thất bại, vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-[#B9E5C9] p-8 flex flex-col gap-6 shadow-sm"
    >
      <div className="text-xl font-bold text-[#17805C] mb-2">Đăng tin tặng đồ</div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm">
          Đăng tin thành công! Đang chuyển hướng về trang chủ...
        </div>
      )}

      <div>
        <label className="block font-semibold text-[#17805C] mb-1">Tên món đồ</label>
        <input
          className="w-full border border-[#B9E5C9] rounded-full px-4 py-2 placeholder:text-gray-400"
          placeholder="VD: Quần áo, đồ chơi,...."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold text-[#17805C] mb-1">Mô Tả Chi Tiết</label>
        <textarea
          className="w-full border border-[#B9E5C9] rounded-2xl px-4 py-2 min-h-[80px] placeholder:text-gray-400"
          placeholder="Mô tả về món đồ, lý do tặng, lưu ý khi nhận..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <PostGiftCategorySelect value={categoryId} onChange={setCategoryId} />
        </div>
        <div className="flex-1">
          <PostGiftConditionSelect value={quality} onChange={setQuality} />
        </div>
      </div>

      <PostGiftLocationSelect value={location} onChange={setLocation} />
      <PostGiftDeliveryMethod value={deliveryMethod} onChange={setDeliveryMethod} />

      <div className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          id="isHeavy"
          checked={isHeavy}
          onChange={(e) => setIsHeavy(e.target.checked)}
          className="accent-[#22C55E]"
        />
        <label htmlFor="isHeavy" className="text-gray-700">
          Đồ nặng (cần nhiều người vận chuyển)
        </label>
      </div>

      <div>
        <label className="block font-semibold text-[#17805C] mb-1">Thông tin liên hệ</label>
        <input
          className="w-full border border-[#B9E5C9] rounded-full px-4 py-2 mb-2 placeholder:text-gray-400"
          placeholder="Số điện thoại"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <input
          className="w-full border border-[#B9E5C9] rounded-full px-4 py-2 placeholder:text-gray-400"
          placeholder="Zalo (nếu khác số điện thoại)"
          value={contactZalo}
          onChange={(e) => setContactZalo(e.target.value)}
        />
      </div>

      <PostGiftImageUpload onImageSelect={setImageFile} />

      <button
        className="bg-[#22C55E] text-white px-8 py-2 rounded-full font-semibold hover:bg-[#16a34a] transition mt-4 self-center disabled:opacity-50 disabled:bg-gray-400"
        type="submit"
        disabled={loading || success || !token}
      >
        {loading ? "Đang xử lý..." : "Đăng Tin"}
      </button>

      {!token && (
        <div className="text-center text-red-500 text-sm">
          Vui lòng <a href="/login" className="underline">đăng nhập</a> để đăng tin!
        </div>
      )}
    </form>
  );
};

export default PostGiftForm;
