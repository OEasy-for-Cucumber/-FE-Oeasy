import { useState } from "react";
import Chat from "./components/Chat";
import Vote from "./components/Vote";

function Votechat() {
  const [active, setActive] = useState<"vote" | "chat">("vote");

  const handleVoteClick = () => {
    if (active !== "vote") {
      setActive("vote");
    }
  };

  const handleChatClick = () => {
    if (active !== "chat") {
      setActive("chat");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] overflow-hidden transition-all duration-500 ease-in-out">
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden`}
        style={{ height: active === "vote" ? "50%" : "20%" }}
        onClick={handleVoteClick}
      >
        <Vote active={active} />
      </div>
      <div className="border-gray-900 border-[6px] w-full" />
      <div
        className={`flex-1 transition-all duration-500 ease-in-out overflow-auto`}
        style={{ height: active === "chat" ? "80%" : "50%" }}
        onClick={handleChatClick}
      >
        <Chat />
      </div>
    </div>
  );
}

export default Votechat;
