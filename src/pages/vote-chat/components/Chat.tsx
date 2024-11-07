import { useEffect, useRef, useState } from "react";
import sendIcon from "../../../../public/icons/send.png";
import profileImage from "../../../../public/img/귀여운행복오이.png";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, username: "현아", content: "오이 짱조아 룰루 랄라", profileImg: profileImage },
    { id: 2, username: "수미", content: "으 오이 개극혐", profileImg: profileImage },
    { id: 3, username: "현경", content: "오이 짱귀엽다 우헤헤", profileImg: profileImage },
    { id: 4, username: "진수", content: "오이를 사랑하게 된 것 같아 cucumber lover😍", profileImg: profileImage },
    { id: 5, username: "현빈", content: "오이 요리 제발 해드세요", profileImg: profileImage },
    { id: 6, username: "샛별", content: "새벽이보다 오이를 더 사랑해", profileImg: profileImage }
  ]);

  const [isComposing, setComposing] = useState(false);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        username: "현아",
        content: message,
        profileImg: profileImage
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative flex flex-col h-auto pt-[16px] xl:w-[488px] xl:h-[686px]">
      <div className="flex flex-col px-[16px]  overflow-y-auto gap-4">
        {messages.map((chat) => (
          <div key={chat.id} className="flex items-start">
            <img src={chat.profileImg} alt="Profile" className="w-10 h-10 rounded-full mr-[8px] border border-white" />
            <div className="flex flex-col gap-[4px]">
              <p className="font-semibold">{chat.username}</p>
              <div className="relative bg-[url('/img/speechBubble.png')] bg-no-repeat bg-cover rounded-r-lg  max-w-[280px] min-w-[20px] w-auto">
                <p className="text-white font-b2-regular break-words px-[12px] py-[8px] whitespace-pre-wrap">
                  {chat.content}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="sticky w-full h-[52px] flex justify-center items-center px-[16px] py-[8px] bg-gray-800 bottom-0 left-0 right-0">
        <div className="relative w-[340px]">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setComposing(true)}
            onCompositionEnd={() => setComposing(false)}
            placeholder="메시지를 입력해주세요"
            className="w-full h-[36px] p-2 pl-[24px] pr-[54px] rounded-[999px] focus:outline-none bg-grayoe-400 placeholder-grayoe-200"
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
