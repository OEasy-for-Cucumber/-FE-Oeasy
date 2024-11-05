import { useState } from "react";
import Chat from "./components/Chat";
import Vote from "./components/Vote";

function Votechat() {
  const [activeComponent, setActiveComponent] = useState<"vote" | "chat">("vote"); // 초기에는 Vote의 비율이 큼

  const handleVoteClick = () => {
    if (activeComponent !== "vote") {
      setActiveComponent("vote");
    }
  };

  const handleChatClick = () => {
    if (activeComponent !== "chat") {
      setActiveComponent("chat");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] overflow-hidden">
      <div
        className={`flex-shrink-0 ${activeComponent === "vote" ? "flex-[6]" : "flex-[2]"}`}
        onClick={handleVoteClick}
      >
        <Vote active={activeComponent} />
      </div>
      <div className="border-gray-900 border-[6px] w-full" />
      <div
        className={`flex-1 overflow-auto ${activeComponent === "chat" ? "flex-[8]" : "flex-[4]"}`}
        onClick={handleChatClick}
      >
        <Chat />
      </div>
    </div>
  );
}

export default Votechat;
