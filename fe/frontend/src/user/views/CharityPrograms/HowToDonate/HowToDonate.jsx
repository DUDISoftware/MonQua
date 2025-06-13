import React from "react";
import { FaCamera, FaClipboardList, FaGift, FaShareAlt } from "react-icons/fa";

const steps = [
    {
        icon: <FaClipboardList className="text-white text-lg" />,
        title: "1. Chọn chương trình phù hợp",
        desc: "Xem danh sách chương trình, chọn chương trình bạn muốn tham gia.",
    },
    {
        icon: <FaCamera className="text-white text-lg" />,
        title: "2. Chuẩn bị vật phẩm quyên góp",
        desc: "Đóng gói vật phẩm sạch sẽ, ghi chú rõ ràng nếu cần.",
    },
    {
        icon: <FaGift className="text-white text-lg" />,
        title: "3. Gửi vật phẩm",
        desc: "Gửi trực tiếp tại điểm tiếp nhận hoặc liên hệ tổ chức thiện nguyện vận hành hỗ trợ vận chuyển.",
    },
    {
        icon: <FaShareAlt className="text-white text-lg" />,
        title: "4. Lan tỏa thông điệp",
        desc: "Chia sẻ chương trình lên mạng xã hội để nhiều người cùng hưởng ứng.",
    },
];

const HowToDonate = () => (
    <section className="w-full flex flex-col items-center mb-8">
        <h2 className="text-lg md:text-xl font-bold text-[#17805C] mb-4 text-center">
            Cách Thức Quyên Góp
        </h2>
        <div className="w-full flex justify-center">
            <div className="bg-white rounded-xl border border-[#B9E5C9] p-6 flex flex-col gap-4 w-full max-w-2xl">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#22C55E] flex items-center justify-center mt-1">
                            {step.icon}
                        </div>
                        <div>
                            <div className="font-semibold text-sm mb-1">{step.title}</div>
                            <div className="text-xs text-gray-500">{step.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default HowToDonate;
