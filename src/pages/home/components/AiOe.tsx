import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { AxiosError } from "axios";
import sendIcon from "../../../../public/icons/send.png";
import InfoIcon from "../../../../public/icons/InfoSquare.png";
import Down from "../../../../public/icons/ArrowDown.png";
import Up from "../../../../public/icons/ArrowUp.png";
import aioeIcon from "../../../../public/img/chat_aioe.png";
import loading from "../../../../public/icons/loading.png";
import instance from "../../../api/axios";
import { useUserStore } from "../../../zustand/authStore";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

type Message = {
  sender: "user" | "bot";
  content: string;
  isLoading?: boolean;
};

type QuestionResponse = {
  message: string;
};

type ErrorResponse = {
  message?: string;
};

function AiOe() {
  const [aiOe, setAiOe] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMes, setUserMes] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleBtn = () => {
    setIsExpanded((prev) => !prev);
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
      await instance.post("/aioe/start");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setAiOe(true);
      } else {
        console.error("AI 연결 실패:", error);
      }
    }

    setAiOe(true);
  };

  const addMessage = (sender: "user" | "bot", content: string, isLoading: boolean = false) => {
    setMessages((prevMessages) => [...prevMessages, { sender, content, isLoading }]);
  };

  const sendMessageMutation = useMutation<QuestionResponse, AxiosError<ErrorResponse>, string>({
    mutationFn: async (message: string) => {
      const res = await instance.post<QuestionResponse>("/aioe/question", {
        question: message
      });
      return res.data;
    },
    onMutate: (message) => {
      addMessage("user", message);
      addMessage("bot", "", true);
      setUserMes("");
    },
    onSuccess: (data) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg.isLoading ? { ...msg, content: data.message, isLoading: false } : msg))
      );
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "죄송하지만 오이와 관련된 질문만 답변할 수 있어오이!🥒";
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.filter((msg) => {
          if (!msg || typeof msg.isLoading !== "boolean") return true;
          return !msg.isLoading;
        });
        return updatedMessages;
      });
      addMessage("bot", errorMessage);
    }
  });

  const handleSendMessage = () => {
    if (userMes.trim()) {
      sendMessageMutation.mutate(userMes);
    }
  };

  return (
    <>
      <button
        className="fixed right-[10%] xl:right-[80px] bottom-[72px] xl:bottom-[80px] z-10 w-[40px] h-[40px] xl:w-[56px] xl:h-[56px] bg-aioe_icon rounded-xl xl:rounded-2xl bg-greenoe-50 bg-28px xl:bg-36px bg-no-repeat bg-aioe"
        onClick={aiOeStart}
      />
      {aiOe &&
        ReactDOM.createPortal(
          <div className="fixed left-1/2 xl:left-auto transform xl:transform-none -translate-x-1/2 xl:right-[80px] bottom-0 xl:bottom-[152px] w-full min-w-[360px] max-w-[520px] h-screen xl:w-[390px] xl:h-[600px] bg-grayoe-950 z-50 xl:rounded-2xl scroll-mx-0">
            <div className="w-full h-[56px] flex justify-center items-center mb-6 relative">
              <div className="font-b2-semibold">AI OE</div>
              <button className="absolute right-[24px] " onClick={() => setAiOe(false)}>
                <img src="/icons/Icon.png" alt="닫기 버튼" />
              </button>
            </div>

            <div className="h-[calc(100vh-132px)] xl:h-[468px] px-6 overflow-y-auto">
              <div
                className={`${isExpanded ? "rounded-t-md" : " rounded-md"} flex flex-row justify-between items-center bg-grayoe-800 h-[36px] p-2 mt-4`}
              >
                <img src={InfoIcon} alt="aioe 공지" className="w-[20px] h-[20px]" />
                <div className="w-full mx-[10px] font-b2-regular">
                  AI 챗봇 사용법<span className={`${isExpanded ? "hidden" : "inline-block"}`}>...</span>
                </div>
                <button onClick={toggleBtn}>
                  <img src={isExpanded ? Up : Down} alt="aioe 열기 버튼" className="w-[20px] h-[20px]" />
                </button>
              </div>

              {isExpanded && (
                <div className="bg-grayoe-800 font-b2-regular rounded-b-md pl-[38px] indent-1 pb-2">
                  <p>1. "오이" 키워드 포함 필수</p>
                  <p>2. 100글자 이내로 질문 가능</p>
                </div>
              )}

              <div className="flex justify-start mt-4">
                <img src={aioeIcon} alt="ai oe Profile" className="w-10 h-10 rounded-full mr-2" />
                <div className="flex flex-col gap-1 max-w-[180px] min-w-[20px]">
                  <p className="font-semibold">AI OE</p>
                  <div className="bg-grayoe-600 rounded-r-xl rounded-bl-xl px-3 py-2 text-white break-words whitespace-pre-wrap mb-4">
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
                            {mes.isLoading ? <img src={loading} className="w-[30px] h-[20px]" /> : mes.content}
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
