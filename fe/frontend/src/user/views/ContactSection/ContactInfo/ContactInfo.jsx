import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactInfo = () => (
    <div className="bg-white rounded-xl shadow-product p-6 flex flex-col gap-4">
        <h3 className="font-bold text-xl mb-2 text-black">Thông tin liên hệ</h3>
        <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-xl mt-1 text-pink-500" />
            <span>232 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu, Quận 3, TP.HCM</span>
        </div>
        <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-xl text-green-500" />
            <span>0318776997</span>
        </div>
        <div className="flex items-center gap-3">
            <FaEnvelope className="text-xl text-blue-500" />
            <span>dudisoftware@gmail.com</span>
        </div>
    </div>
);

export default ContactInfo;
