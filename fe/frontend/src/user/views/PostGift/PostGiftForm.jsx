import React from "react";
import CategorySelect from "./components/CategorySelect";
import ConditionSelect from "./components/ConditionSelect";
import DeliveryMethod from "./components/DeliveryMethod";
import ImageUpload from "./components/ImageUpload";
import LocationSelect from "./components/LocationSelect";

const PostGiftForm = ({
  form,
  imageFile,
  subImages,
  categories,
  snackbar,
  // Location props (mới)
  provinces,
  districts,
  wards,
  selectedProvince,
  selectedDistrict,
  selectedWard,
  specificAddress,
  // Handlers
  handleChange,
  handleImageChange,
  handleSubImagesChange,
  handleSubmit,
  handleCloseSnackbar,
  handleProvinceChange,
  handleDistrictChange,
  handleWardChange,
  handleSpecificAddressChange,
  token
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#B9E5C9] p-4 sm:p-6 md:p-8 shadow-sm">
      {snackbar.open && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${snackbar.severity === 'error'
          ? 'bg-red-100 text-red-700'
          : 'bg-green-100 text-green-700'
          }`}>
          {snackbar.message}
          <button
            onClick={handleCloseSnackbar}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-6">
        <div>
          <label className="block font-semibold text-[#17805C] mb-1">Tên món đồ *</label>
          <input
            className="w-full border border-[#B9E5C9] rounded-full px-4 py-2 placeholder:text-gray-400"
            placeholder="VD: Quần áo, đồ chơi,...."
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <CategorySelect
          value={form.category_id}
          onChange={handleChange}
          categories={categories}
          name="category_id"
        />

        <div>
          <label className="block font-semibold text-[#17805C] mb-1">Mô tả chi tiết</label>
          <textarea
            className="w-full border border-[#B9E5C9] rounded-2xl px-4 py-2 min-h-[80px] placeholder:text-gray-400"
            placeholder="Mô tả về món đồ, lý do tặng, lưu ý khi nhận..."
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <LocationSelect
          provinces={provinces}
          districts={districts}
          wards={wards}
          selectedProvince={selectedProvince}
          selectedDistrict={selectedDistrict}
          selectedWard={selectedWard}
          specificAddress={specificAddress}
          onProvinceChange={handleProvinceChange}
          onDistrictChange={handleDistrictChange}
          onWardChange={handleWardChange}
          onSpecificAddressChange={handleSpecificAddressChange}
          onLocationChange={(location) => handleChange({ target: { name: 'location', value: location } })}
        />

        <ConditionSelect
          value={form.label}
          onChange={handleChange}
          name="label"
        />

        <div>
          <label className="block font-semibold text-[#17805C] mb-1">Số điện thoại liên hệ *</label>
          <input
            className="w-full border border-[#B9E5C9] rounded-full px-4 py-2 placeholder:text-gray-400"
            placeholder="Số điện thoại"
            name="contact_phone"
            value={form.contact_phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-[#17805C] mb-1">Zalo liên hệ</label>
          <input
            className="w-full border border-[#B9E5C9] rounded-full px-4 py-2 placeholder:text-gray-400"
            placeholder="Zalo (nếu có)"
            name="contact_zalo"
            value={form.contact_zalo}
            onChange={handleChange}
          />
        </div>

        <DeliveryMethod
          value={form.delivery_method}
          onChange={handleChange}
          name="delivery_method"
        />

        <div className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            id="is_heavy"
            name="is_heavy"
            checked={form.is_heavy}
            onChange={handleChange}
            className="accent-[#22C55E]"
          />
          <label htmlFor="is_heavy" className="text-gray-700">
            Đồ nặng (cần nhiều người vận chuyển)
          </label>
        </div>

        <ImageUpload
          onImageSelect={handleImageChange}
          onSubImagesSelect={handleSubImagesChange}
          imageFile={imageFile}
          subImages={subImages}
        />

        <button
          className="bg-[#22C55E] text-white px-8 py-2 rounded-full font-semibold hover:bg-[#16a34a] transition mt-4 self-center disabled:opacity-50 disabled:bg-gray-400"
          type="submit"
          disabled={!token}
        >
          Đăng Tin
        </button>

        {!token && (
          <div className="text-center text-red-500 text-sm">
            Vui lòng <a href="/login" className="underline">đăng nhập</a> để đăng tin!
          </div>
        )}
      </form>
    </div>
  );
};

export default PostGiftForm;
