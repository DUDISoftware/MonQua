import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../../api/UserApi";
import MonQuaNhoImg from "../../assets/MonQuaNho.png";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        try {
            const result = await loginUser(form);   
            // Lưu token và thông tin user vào localStorage
            localStorage.setItem("token", result.token);
            localStorage.setItem("role", result.user.role);
            localStorage.setItem("user_id", result.user.id);
            localStorage.setItem("fullname", result.user.fullname);
            if (result.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch {
            setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        }
    };

    return (
        <div className="min-h-screen flex" style={{ background: "#F6F6F6" }}>
            {/* Left: Login Form */}
            <div className="flex flex-1 items-center justify-center">
                <div
                    className="w-full max-w-[370px] bg-white rounded-[16px] shadow-[0_2px_8px_0_rgba(0,0,0,0.07)] px-8 py-10"
                    style={{ minHeight: 500 }}
                >
                    <div className="mb-1 text-center text-[28px] font-bold" style={{ color: "#43B02A", fontFamily: "inherit" }}>
                        Món Quà Nhỏ
                    </div>
                    <div className="mb-6 text-center text-[18px] font-semibold" style={{ color: "#43B02A" }}>
                        Đăng nhập
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="email"
                            type="text"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-[8px] border border-[#D9D9D9] bg-white focus:outline-none focus:border-[#43B02A] text-base shadow-sm"
                            placeholder="Tên đăng nhập hoặc Email"
                            style={{ color: "#222", fontSize: 16 }}
                        />
                        <div className="relative">
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-[8px] border border-[#D9D9D9] bg-white focus:outline-none focus:border-[#43B02A] text-base shadow-sm"
                                placeholder="Mật Khẩu"
                                style={{ color: "#222", fontSize: 16 }}
                            />
                            {/* Eye icon có thể thêm sau nếu muốn */}
                        </div>
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        <button
                            type="submit"
                            className="w-full py-2 rounded-[8px] font-semibold text-base"
                            style={{
                                background: "#43B02A",
                                color: "#fff",
                                boxShadow: "0 2px 4px 0 rgba(67,176,42,0.10)"
                            }}
                        >
                            Đăng Nhập
                        </button>
                    </form>
                    <div className="flex justify-center gap-2 mt-4 mb-2">
                        <button
                            type="button"
                            className="flex-1 py-2 rounded-[20px] font-semibold text-white"
                            style={{
                                background: "#EA4335",
                                fontSize: 15,
                                minWidth: 110
                            }}
                        >
                            Google
                        </button>
                        <button
                            type="button"
                            className="flex-1 py-2 rounded-[20px] font-semibold text-white"
                            style={{
                                background: "#1877F3",
                                fontSize: 15,
                                minWidth: 110
                            }}
                        >
                            Facebook
                        </button>
                    </div>
                    <div className="text-center text-[15px] mt-2">
                        <span style={{ color: "#222" }}>Chưa có tài khoản? </span>
                        <Link to="/register" className="font-semibold" style={{ color: "#43B02A" }}>
                            Đăng ký ngay
                        </Link>
                    </div>
                    <div className="text-center mt-2">
                        <Link to="/" className="text-[15px]" style={{ color: "#43B02A" }}>
                            Trở về trang chủ
                        </Link>
                    </div>
                </div>
            </div>
            {/* Right: Illustration */}
            <div
                className="hidden md:flex flex-1 flex-col items-center justify-center"
                style={{ background: "#DDF3E4" }}
            >
                <img
                    src={MonQuaNhoImg}
                    alt="MonQuaNho"
                    className="w-[320px] h-auto object-contain mb-4"
                    draggable={false}
                />
            </div>
        </div>
    );
};

export default Login;
