import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import sendIcon from "../../../../public/icons/send.png";
import aioeIcon from "../../../../public/img/chat_aioe.png";
import instance from "../../../api/axios";
import { useUserStore } from "../../../zustand/authStore";
import { useNavigate } from "react-router-dom";

type Message = {
  sender: "user" | "bot";
  content: string;
};

function AiOe() {
  const [aiOe, setAiOe] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMes, setUserMes] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const savedMessages = localStorage.getItem("aiOeMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("aiOeMessages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const aiOeStart = async () => {
    if (!user) {
      alert("로그인 후 이용해주세요");
      navigate("/login");
      return;
    }
    try {
      const res = await instance.post("/aioe/start");
      console.log(res);
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.warn("401 에러 무시: 이미 연결 상태임");
        setAiOe(true);
      } else {
        console.error("AI 연결 실패:", error);
      }
    }

    setAiOe(true);
  };

  const addMessage = (sender: "user" | "bot", content: string) => {
    setMessages((prevMessages) => [...prevMessages, { sender, content }]);
  };

  const handleSendMessage = async () => {
    const currentMessage = userMes;

    if (!userMes.trim()) return;

    addMessage("user", currentMessage);
    setUserMes("");

    try {
      const res = await instance.post("/aioe/question", {
        question: currentMessage
      });

      const botResponse = res.data.message || "응답을 가져올 수 없습니다.";
      addMessage("bot", botResponse);
      console.log("챗봇 응답:", botResponse);

      setUserMes("");
    } catch (error) {
      console.error("메시지 전송 중 오류 발생:", error);
      addMessage("bot", "오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <button
        className="fixed right-[calc(50%-236px)] xl:right-[80px] bottom-[72px] xl:bottom-[80px] z-10 w-[40px] h-[40px] xl:w-[56px] xl:h-[56px] bg-aioe_icon rounded-xl xl:rounded-2xl bg-greenoe-50 bg-28px xl:bg-36px bg-no-repeat bg-aioe"
        onClick={aiOeStart}
      />
      {aiOe &&
        ReactDOM.createPortal(
          <div className="fixed right-[calc(50%-260px)] xl:right-[80px] bottom-0 xl:bottom-[152px] w-full min-w-[360px] max-w-[520px] h-screen xl:w-[390px] xl:h-[600px] bg-grayoe-950 z-50 xl:rounded-2xl">
            <div className="w-full h-[56px] flex justify-center items-center mb-6 relative">
              <div className="font-b2-semibold">AI OE</div>
              <button className="absolute right-[24px] " onClick={() => setAiOe(false)}>
                <img src="/public/icons/Icon.png" alt="닫기 버튼" />
              </button>
            </div>

            <div className="h-[calc(100vh-132px)] xl:h-[468px] px-6 overflow-y-auto">
              <div className="flex justify-start">
                <img src={aioeIcon} alt="ai oe Profile" className="w-10 h-10 rounded-full mr-2" />
                <div className="flex flex-col gap-1 max-w-[180px] min-w-[20px]">
                  <p className="font-semibold">AI OE</p>
                  <div className="bg-grayoe-600 rounded-r-xl rounded-bl-xl px-3 py-2 text-white break-words whitespace-pre-wrap">
                    안녕하세오이?
                    <br />
                    저는 AI 오이입니다오이! 오이에 관련된 질문을 해주세오이! 🥒
                  </div>
                </div>
              </div>
              {messages?.map((mes, index) => (
                <div key={index} className="mb-4">
                  {mes.sender === "user" ? (
                    <div>
                      <div className="flex justify-end">
                        <div className="flex flex-col gap-1 max-w-[180px] min-w-[20px]">
                          <div className="bg-grayoe-600 rounded-l-xl rounded-br-xl px-3 py-2 text-white break-words whitespace-pre-wrap">
                            {mes.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-start">
                        <img src={aioeIcon} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                        <div className="flex flex-col gap-1 max-w-[180px] min-w-[20px]">
                          <p className="font-semibold">AI OE</p>
                          <div className="bg-grayoe-600 rounded-r-xl rounded-bl-xl px-3 py-2 text-white break-words whitespace-pre-wrap">
                            {mes.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="sticky w-full h-[52px] flex justify-center items-center px-4 py-2 bg-grayoe-800 bottom-0 xl:rounded-b-2xl">
              <div className="relative w-full xl:w-full">
                <input
                  type="text"
                  placeholder="메시지를 입력해주세요"
                  value={userMes}
                  onChange={(e) => {
                    setUserMes(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isComposing) handleSendMessage();
                  }}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => setIsComposing(false)}
                  className="w-full h-9 p-2 pl-6 pr-14 rounded-full focus:outline-none bg-grayoe-400 placeholder-grayoe-200"
                />
                <button
                  className="absolute right-1 top-1 bottom-1 w-11 h-7 bg-greenoe-600 text-white rounded-full flex items-center justify-center"
                  onClick={handleSendMessage}
                >
                  <img src={sendIcon} alt="Send" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default AiOe;
