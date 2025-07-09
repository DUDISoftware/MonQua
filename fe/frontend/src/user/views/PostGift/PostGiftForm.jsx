import React, { useState } from "react";
import axios from "axios";
import PostGiftCategorySelect from "./PostGiftCategorySelect";
import PostGiftConditionSelect from "./PostGiftConditionSelect";
import PostGiftLocationSelect from "./PostGiftLocationSelect";
import PostGiftDeliveryMethod from "./PostGiftDeliveryMethod";
import PostGiftImageUpload from "./PostGiftImageUpload";

const PostGiftForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [contactPhone, setContactPhone] = useState(localStorage.getItem("phone") || "");
  const [contactZalo, setContactZalo] = useState("");
  const [isHeavy, setIsHeavy] = useState(false);
  const [imageFile, setImageFile] = useState(null);
const [deliveryMethod, setDeliveryMethod] = useState("giao_tan_tay");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user_id");

    if (!user_id || !title || !categoryId || !imageFile) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_id", categoryId);
    formData.append("location", location);
    formData.append("contact_phone", contactPhone);
    formData.append("contact_zalo", contactZalo);
    formData.append("is_heavy", isHeavy);
    formData.append("image", imageFile); // tên field phải đúng như backend `uploadImage.single("image")`
formData.append("delivery_method", deliveryMethod);

    try {
      const res = await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Đăng tin thành công!");
      console.log(res.data);
    } catch (err) {
      console.error("Lỗi khi đăng sản phẩm:", err);
      alert("Đăng tin thất bại!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-[#B9E5C9] p-8 flex flex-col gap-6 shadow-sm"
    >
      <div className="text-xl font-bold text-[#17805C] mb-2">Đăng tin tặng đồ</div>

      <div>
        <label className="block font-semibold text-[#17805C] mb-1">Tên món đồ</label>
        <input
          className="w-full border border-[#B9E5C9] rounded-full px-4 py-2 placeholder:text-gray-400"
          placeholder="VD: Quần áo, đồ chơi,...."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          <PostGiftConditionSelect />
        </div>
      </div>

      <PostGiftLocationSelect value={location} onChange={setLocation} />
    <PostGiftDeliveryMethod value={deliveryMethod} onChange={setDeliveryMethod} />

      <PostGiftImageUpload onImageSelect={setImageFile} />

      <button
        className="bg-[#22C55E] text-white px-8 py-2 rounded-full font-semibold hover:bg-[#16a34a] transition mt-4 self-center"
        type="submit"
      >
        Đăng Tin
      </button>
    </form>
  );
};

export default PostGiftForm;
