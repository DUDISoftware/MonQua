import React from "react";

const PostGiftDeliveryMethod = ({ value, onChange }) => (
  <div>
    <label className="block font-semibold text-[#17805C] mb-1">Hình Thức Trao Đồ</label>
    <div className="flex gap-6">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="delivery"
          className="accent-[#22C55E]"
          value="giao_tan_tay"
          checked={value === "giao_tan_tay"}
          onChange={(e) => onChange(e.target.value)}
        />
        Giao Tận Tay
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="delivery"
          className="accent-[#22C55E]"
          value="nguoi_nhan_den_lay"
          checked={value === "nguoi_nhan_den_lay"}
          onChange={(e) => onChange(e.target.value)}
        />
        Người nhận đến lấy
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="delivery"
          className="accent-[#22C55E]"
          value="gap_tai_tay"
          checked={value === "gap_tai_tay"}
          onChange={(e) => onChange(e.target.value)}
        />
        Gặp Tại Tay
      </label>
    </div>
  </div>
);

export default PostGiftDeliveryMethod;
