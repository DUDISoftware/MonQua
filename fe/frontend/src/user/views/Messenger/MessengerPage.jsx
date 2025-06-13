import React from "react";
import UserProfileCard from "./Sidebar/UserProfileCard";
import StatusList from "./Sidebar/StatusList";
import ChatList from "./Sidebar/ChatList";
import ChatHeader from "./ChatWindow/ChatHeader";
import MessageList from "./ChatWindow/MessageList";
import MessageInput from "./ChatWindow/MessageInput";

const MessengerPage = () => (
    <div className="min-h-screen w-full bg-[#E6F4F1] flex items-center justify-center py-4">
        <div className="w-full max-w-6xl h-[80vh] flex rounded-2xl overflow-hidden shadow-lg bg-transparent">
            <aside className="w-[340px] bg-white h-full flex-shrink-0 flex flex-col border-r border-[#E6F4F1]">
                <UserProfileCard />
                <StatusList />
                <ChatList />
            </aside>
            <div className="flex-1 flex flex-col bg-[#F6FCFA] h-full">
                <ChatHeader />
                <MessageList />
                <MessageInput />
            </div>
        </div>
    </div>
);

export default MessengerPage;
