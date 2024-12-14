import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import sendIcon from "@/assets/icons/send.webp";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/zustand/authStore";
import useAlert from "@/hooks/useAlert";

type Message = {
  id: string | number;
  nickname: string;
  content: string;
  profileImg: string;
};

interface ChatProps {
  chattingList: { id: number; content: string; profileImg: string; nickname: string }[];
}

function Chat({ chattingList }: ChatProps) {
  if (typeof global === "undefined") {
    window.global = window;
  }

  const [client, setClient] = useState<Client | null>(null);
  const [message, setMessage] = useState("");
  const user = useUserStore((state) => state.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isComposing, setComposing] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const DEFAULT_PROFILE_IMG = "@/assets/img/defaultProfile.webp";
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    setMessages((prevMessages) => [
      ...chattingList
        .slice()
        .reverse()
        .map((msg) => ({
          id: msg.id,
          nickname: msg.nickname,
          content: msg.content,
          profileImg: msg.profileImg || DEFAULT_PROFILE_IMG
        })),
      ...prevMessages
    ]);
  }, [chattingList]);

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS(import.meta.env.VITE_APP_WS_URL),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    stompClient.onConnect = () => {
      stompClient.subscribe("/topic/message", (msg) => {
        try {
          const receivedMessage = JSON.parse(msg.body);

          const { id = uuidv4(), profileImg = "", nickname = "익명", content = "" } = receivedMessage;

          const newMessage = {
            id,
            nickname,
            content,
            profileImg: profileImg || DEFAULT_PROFILE_IMG
          };

          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } catch (error) {
          console.error("메세지 불러오는데 오류가 생겼습니다", error);
        }
      });
      setClient(stompClient);
    };

    stompClient.onDisconnect = () => {
      setClient(null);
    };

    stompClient.activate();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({
          block: "end" // 하단 정렬
        });
      }
    };
    scrollToBottom();
    const handleResize = () => scrollToBottom();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [messages]);

  const handleSendMessage = () => {
    if (!user) {
      showAlert({ message: "로그인 후 이용해주세요" });
      navigate("/login");
      return;
    }
    if (client && message.trim()) {
      client.publish({
        destination: "/app/message",
        body: JSON.stringify({
          userPk: user.memberPk,
          content: message
        })
      });

      setMessage("");
    } else {
      console.log("Client is not connected");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col justify-between w-full xl:w-[488px] xl:h-[686px] xl:my-auto xl:bg-grayoe-900 xl:rounded-2xl ">
      <div className="relative pt-4 mx-4 xl:mx-0">
        <div className="flex flex-col xl:px-4 xl:h-[634px] overflow-y-auto scrollbar-hidden gap-4  ">
          {messages.map((msg, index) =>
            msg.nickname === user?.nickname ? (
              <div key={`${msg.id}-${index}`} className="flex justify-end items-start">
                <div className="flex flex-col items-end gap-1 max-w-[280px] min-w-[20px]">
                  <p className="font-semibold">{msg.nickname}</p>
                  <div className="bg-grayoe-600 rounded-l-xl rounded-br-xl px-3 py-2 text-white break-words whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
                <img src={msg.profileImg} alt="Profile" className="w-10 h-10 rounded-full ml-2" />
              </div>
            ) : (
              <div key={`${msg.id}-${index}`} className="flex justify-start items-start">
                <img src={msg.profileImg} alt="Profile" className="w-10 h-10 rounded-full mr-2 " />
                <div className="flex flex-col gap-1 max-w-[280px] min-w-[20px]">
                  <p className="font-semibold">{msg.nickname}</p>
                  <div className="bg-grayoe-600 rounded-r-xl rounded-bl-xl px-3 py-2 text-white break-words whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
              </div>
            )
          )}
          <div ref={messageEndRef} />
        </div>
      </div>
      <div className="sticky w-full h-[52px] flex justify-center items-center px-4 py-2 bg-grayoe-800 bottom-0 xl:rounded-b-2xl">
        <div className="relative w-full xl:w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setComposing(true)}
            onCompositionEnd={() => setComposing(false)}
            placeholder="메시지를 입력해주세요"
            className="w-full h-9 p-2 pl-6 pr-14 rounded-full focus:outline-none bg-grayoe-400 placeholder-grayoe-200"
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-1 top-1 bottom-1 w-11 h-7 bg-greenoe-600 text-white rounded-full flex items-center justify-center"
          >
            <img src={sendIcon} alt="Send" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
