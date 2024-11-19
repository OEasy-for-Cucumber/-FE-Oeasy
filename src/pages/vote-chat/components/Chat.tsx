import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import sendIcon from "../../../../public/icons/send.png";
import profileImage from "../../../../public/img/cuteOE.png";
import { useUserStore } from "../../../zustand/authStore";

function Chat() {
  if (typeof global === "undefined") {
    window.global = window; // 브라우저 환경에서 `global`이 없는 경우 `window`로 설정
  }
  const [client, setClient] = useState<Client | null>(null);
  const [message, setMessage] = useState("");
  const user = useUserStore((state) => state.user);
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
    // WebSocket 클라이언트 설정
    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://54.180.153.36:8080/ws"), // Spring Boot 서버의 WebSocket 엔드포인트
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    stompClient.onConnect = () => {
      console.log("Connected to WebSocket");

      // 메시지 구독
      stompClient.subscribe("/topic/messages", (msg) => {
        const receivedMessage = JSON.parse(msg.body);
        receivedMessage.id = uuidv4();
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
      setClient(stompClient);
    };

    stompClient.onDisconnect = () => {
      console.log("Disconnected from WebSocket");
      setClient(null);
    };

    stompClient.activate();

    // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!user) {
      alert("로그인 후 이용해주세요");
      return;
    }
    if (client && message.trim()) {
      client.publish({
        destination: "/app/send", // Spring Boot의 @MessageMapping("/send") 경로
        body: JSON.stringify({
          content: message,
          username: user?.nickname || "익명",
          profileImg: profileImage
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
    <div className="flex flex-col justify-between w-full xl:w-[488px] xl:h-[686px] xl:my-auto xl:bg-grayoe-900 xl:rounded-2xl">
      <div className="relative pt-4 mx-4 xl:mx-0">
        <div className="flex flex-col xl:px-4 xl:h-[634px] overflow-y-auto gap-4">
          {messages.map((msg) =>
            msg.username === user?.nickname ? (
              // 내가 보낸 메시지
              <div key={msg.id} className="flex justify-end items-start">
                <div className="flex flex-col items-end gap-1 max-w-[280px] min-w-[20px]">
                  <p className="font-semibold">{msg.username}</p>
                  <div className="bg-grayoe-600 rounded-l-xl rounded-br-xl px-3 py-2 text-white break-words whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
                <img src={msg.profileImg} alt="Profile" className="w-10 h-10 rounded-full ml-2 border border-white" />
              </div>
            ) : (
              // 다른 사용자가 보낸 메시지
              <div key={msg.id} className="flex justify-start items-start">
                <img src={msg.profileImg} alt="Profile" className="w-10 h-10 rounded-full mr-2 border border-white" />
                <div className="flex flex-col gap-1 max-w-[280px] min-w-[20px]">
                  <p className="font-semibold">{msg.username}</p>
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
