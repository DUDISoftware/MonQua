import React from "react";
import ChatListItem from "./ChatListItem";

const chats = [
    {
        id: 1,
        name: "Josephin water",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        lastMessage: "Typing...",
        time: "23/10/25",
        unread: 0,
        typing: true,
    },
    {
        id: 2,
        name: "Mari",
        avatar: "https://randomuser.me/api/portraits/women/46.jpg",
        lastMessage: "❤️ Làm quen giữ mình nè",
        time: "JUST NOW",
        unread: 1,
    },
    {
        id: 3,
        name: "Tuấn Đan",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        lastMessage: "ok anh oi ...",
        time: "23/10/25",
        unread: 0,
    },
    {
        id: 4,
        name: "Tấn Dũng",
        avatar: "https://randomuser.me/api/portraits/men/35.jpg",
        lastMessage: "Chúc 1 ngày tốt lành! 😊",
        time: "Yesterday",
        unread: 0,
    },
    {
        id: 5,
        name: "Tuấn Dũng",
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        lastMessage: "Yêu mọi người",
        time: "18/10/2025",
        unread: 0,
    },
    {
        id: 6,
        name: "KW",
        avatar: "",
        lastMessage: "ok ai di",
        time: "18/10/2025",
        unread: 0,
    },
    {
        id: 7,
        name: "Jesus Watson",
        avatar: "",
        lastMessage: "ok ai di",
        time: "18/10/2025",
        unread: 0,
    },
    {
        id: 8,
        name: "Peter",
        avatar: "",
        lastMessage: "Cảm ơn ạ :p",
        time: "18/10/2025",
        unread: 0,
    },
];

const ChatList = () => (
    <div className="flex-1 overflow-y-auto px-2 py-2">
        <div className="text-xs text-gray-500 px-2 mb-2">Message (10)</div>
        <div className="flex flex-col gap-1">
            {chats.map(chat => (
                <ChatListItem key={chat.id} chat={chat} />
            ))}
        </div>
    </div>
);

export default ChatList;
