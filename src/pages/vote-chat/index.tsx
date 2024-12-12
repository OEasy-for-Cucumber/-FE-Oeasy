import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Vote from "./components/Vote";
import useWebActive from "@/hooks/useWebActive";
import { useUserStore } from "@/zustand/authStore";
import instance from "@/api/axios";
import { voteChatRes } from "@/types/initialVoteChatTypes";

function Votechat() {
  const [active, setActive] = useState<"vote" | "chat">("vote");
  const webActive = useWebActive();
  const [initialVotes, setInitialVotes] = useState({ hate: 0, like: 0 });
  const [voting, setVoting] = useState("not voting");
  const [chatLi, setChatLi] = useState<{ id: number; content: string; profileImg: string; nickname: string }[]>([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchInitialVotes = async () => {
      try {
        if (user?.memberPk) {
          const response = await instance.get<voteChatRes>(`/api/community/init/${user.memberPk}`);
          const { hate, like, isVoting, chattingList } = response.data;
          setInitialVotes({ hate, like });
          setVoting(isVoting);
          setChatLi(chattingList);
        } else {
          const response = await instance.get<voteChatRes>(`/api/community/init`);
          const { hate, like, chattingList } = response.data;
          setInitialVotes({ hate, like });
          setChatLi(chattingList);
        }
      } catch (error) {
        console.error("초기 투표 데이터를 가져오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchInitialVotes();
  }, [user?.memberPk]);

  useEffect(() => {
    if (webActive) {
      setActive("vote");
    }
  }, [webActive]);

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
    <div className="flex flex-col xl:flex-row xl:justify-center xl:items-center h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] overflow-hidden transition-all duration-500 ease-in-out scrollbar-hidden">
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          active === "vote" ? "h-[40%] xl:h-auto" : "h-[20%] xl:h-auto"
        }`}
        onClick={handleVoteClick}
      >
        <Vote active={active} initialVotes={initialVotes} isVoting={voting} />
      </div>
      <div className="border-grayoe-900 border-[6px] w-full xl:hidden" />
      <div
        className={`flex transition-all duration-500 ease-in-out overflow-auto scrollbar-hidden ${
          active === "chat" ? "h-[80%] xl:h-full" : "h-[60%] xl:h-full"
        }`}
        onClick={handleChatClick}
      >
        <Chat chattingList={chatLi} />
      </div>
    </div>
  );
}

export default Votechat;
