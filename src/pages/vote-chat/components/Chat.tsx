import { useState } from "react";

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

      <div className="flex items-center p-2 bg-grayoe-800 fixed bottom-0 left-0 right-0">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default Chat;
