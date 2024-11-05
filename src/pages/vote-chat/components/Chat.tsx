import { useState } from "react";
import sendIcon from "../../../assets/send.png";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen border border-white">
      <div className="flex-1 p-4 overflow-y-auto">
        {" "}
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <p className="p-2 bg-gray-200 rounded-md">{msg}</p>
          </div>
        ))}
      </div>

      <div className="h-[52px] flex justify-center items-center px-[16px] py-[8px] bg-gray-800 fixed bottom-0 left-0 right-0">
        <div className="relative w-[328px]">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력해주세요"
            className="w-full h-[36px] p-2 pl-[24px] pr-[54px] rounded-[999px] focus:outline-none bg-grayoe-400 placeholder-grayoe-200 placeholder-"
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-1 top-1 bottom-1 w-[44px] h-[28px] bg-greenoe-600 text-white rounded-[999px] flex items-center justify-center"
          >
            <img src={sendIcon} alt="Send" className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
