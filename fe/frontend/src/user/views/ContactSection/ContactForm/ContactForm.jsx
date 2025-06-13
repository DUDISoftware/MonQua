import React, { useState } from "react";

const ContactForm = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 2000);
        // Xử lý gửi form ở đây (API, email, ...)
    };

    return (
        <form className="bg-white rounded-xl shadow-product p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <h3 className="font-bold text-xl mb-2 text-black">Liên hệ với chúng tôi</h3>
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none"
                placeholder="Họ và tên"
            />
            <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none"
                placeholder="Email"
            />
            <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none"
                placeholder="Nội dung liên hệ"
            />
            <button
                type="submit"
                className="bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition"
            >
                Gửi liên hệ
            </button>
            {sent && <div className="text-green-600 text-sm mt-2">Đã gửi liên hệ!</div>}
        </form>
    );
};

export default ContactForm;
