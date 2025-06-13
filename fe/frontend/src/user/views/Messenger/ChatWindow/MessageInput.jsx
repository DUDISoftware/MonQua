import React, { useState } from "react";
import { FaPaperclip, FaSmile, FaPaperPlane, FaMicrophone } from "react-icons/fa";

const MessageInput = () => {
    const [value, setValue] = useState("");
    return (
        <div className="flex items-center gap-2 border-t border-[#E6F4F1] px-6 py-4 bg-[#F6FCFA]">
            <button className="text-[#22C55E] text-lg">
                <FaPaperclip />
            </button>
            <button className="text-[#22C55E] text-lg">
                <FaSmile />
            </button>
            <input
                className="flex-1 px-4 py-2 rounded-full border border-[#E6F4F1] bg-white focus:outline-none"
                placeholder="Write your message..."
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <button className="text-[#22C55E] text-lg">
                <FaMicrophone />
            </button>
            <button className="bg-[#22C55E] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#16a34a] transition flex items-center">
                <FaPaperPlane />
            </button>
        </div>
    );
};

export default MessageInput;
