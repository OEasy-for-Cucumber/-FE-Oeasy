import Chat from "./components/Chat";
import Vote from "./components/Vote";

function Votechat() {
  return (
    <div className="flex flex-col h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] overflow-hidden">
      <div className="flex-shrink-0">
        <Vote />
      </div>
      <div className="flex-1 overflow-auto">
        <Chat />
      </div>
    </div>
  );
}

export default Votechat;
