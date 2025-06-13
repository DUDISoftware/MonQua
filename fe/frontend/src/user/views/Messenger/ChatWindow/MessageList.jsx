import React, { useRef, useEffect } from "react";
import MessageItem from "./MessageItem";

const messages = [
    { id: 1, fromMe: false, content: "Chào Anh", time: "07:42 AM", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, fromMe: false, content: "Anh ơi tuyển người làm ko ạ", time: "07:42 AM", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, fromMe: false, content: "có trợ cấp lộp ko ạ", time: "07:42 AM", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 4, fromMe: true, content: "Em hỏi đi", time: "07:43 AM" },
    { id: 5, fromMe: true, content: "Có tuyển mà ko trợ cấp nhé", time: "07:43 AM" },
    { id: 6, fromMe: false, content: "okii ạ", time: "07:44 AM", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
];

const bgPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' fill='%23F6FCFA'/%3E%3Cpath d='M20 0V40M0 20H40' stroke='%23E6F4F1' stroke-width='1'/%3E%3C/svg%3E")`;

const MessageList = () => {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, []);
    return (
        <div
            ref={ref}
            className="flex-1 overflow-y-auto px-8 py-6"
            style={{
                background: bgPattern,
                backgroundRepeat: "repeat",
                backgroundSize: "40px 40px",
            }}
        >
            {messages.map(msg => (
                <MessageItem key={msg.id} message={msg} />
            ))}
        </div>
    );
};

export default MessageList;
