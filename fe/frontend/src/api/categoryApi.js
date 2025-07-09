import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}/categories`);
    return res.data;
  } catch (err) {
    console.error("Lỗi khi lấy danh mục:", err.message);
    return [];
  }
};
