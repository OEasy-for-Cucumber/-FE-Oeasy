import { useState } from "react";
import Chat from "./components/Chat";
import Vote from "./components/Vote";
import useWebActive from "../../hooks/useWebActive";

function Votechat() {
  const [active, setActive] = useState<"vote" | "chat">("vote");
  const webActive = useWebActive();

  const handleVoteClick = () => {
    if (!webActive && active !== "vote") {
      setActive("vote");
    }
  };

  const handleChatClick = () => {
    if (!webActive && active !== "chat") {
      setActive("chat");
    }
  };

  return (
    <div className="flex flex-col xl:flex-row xl:justify-center xl:items-center h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] overflow-hidden transition-all duration-500 ease-in-out">
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          active === "vote" ? "h-[40%] xl:h-auto" : "h-[20%] xl:h-auto"
        }`}
        onClick={handleVoteClick}
      >
        <Vote active={active} />
      </div>
      <div className="border-grayoe-900 border-[6px] w-full xl:hidden" />
      <div
        className={`flex transition-all duration-500 ease-in-out overflow-auto ${
          active === "chat" ? "h-[80%] xl:h-full" : "h-[60%] xl:h-full"
        }`}
        onClick={handleChatClick}
      >
        <Chat />
      </div>
    </div>
  );
}

export default Votechat;
