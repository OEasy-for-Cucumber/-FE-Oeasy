import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../zustand/authStore";
import instance from "../../../api/axios";

interface VoteProps {
  active: "vote" | "chat";
}

function Vote({ active }: VoteProps) {
  const [hateVotes, setHateVotes] = useState(10000);
  const [likeVotes, setLikeVotes] = useState(10000);
  const [isHateClicked, setIsHateClicked] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const user = useUserStore((state) => state.user);
  const updateLastVoteTime = useUserStore((state) => state.updateLastVoteTime);

  const socketRef = useRef<WebSocket | null>(null);

  // 컴포넌트 마운트 시 웹소켓 연결 설정
  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_APP_WS_URL); // 실제 WebSocket 서버 URL 사용
    socketRef.current = socket;

    // 연결 시 이벤트 핸들러
    socket.onopen = () => {
      console.log("WebSocket 연결 완료");
    };

    // 에러 핸들러
    socket.onerror = (error) => {
      console.error("WebSocket 에러 발생:", error);
    };

    // 종료 시 정리
    return () => {
      socket.close();
      console.log("WebSocket 연결 종료");
    };
  }, []);

  const handleVote = async (side: "hate" | "like") => {
    // if (!user) {
    //   alert("로그인 후 투표해주세요");
    //   return;
    // }

    const now = Date.now();

    if (user?.lastVoteTime) {
      const lastVoteDate = new Date(user.lastVoteTime);
      const currentDate = new Date(now);

      lastVoteDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);

      // if (lastVoteDate.getTime() === currentDate.getTime()) {
      //   alert("하루에 한 번만 투표할 수 있습니다.");
      //   return;
      // }
    }

    if (side === "hate") {
      setHateVotes(hateVotes + 1);
      setIsHateClicked(true);
      setTimeout(() => setIsHateClicked(false), 300);
    } else {
      setLikeVotes(likeVotes + 1);
      setIsLikeClicked(true);
      setTimeout(() => setIsLikeClicked(false), 300);
    }

    updateLastVoteTime(now);

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        topic: side === "hate" ? "/topic/hate-votes" : "/topic/like-votes",
        userId: user?.memberPk || null, // 유저 ID를 함께 전송
        voteTime: now
      });

      socketRef.current.send(message);
      console.log(`웹소켓 메시지 전송: ${message}`);
    } else {
      console.error("WebSocket이 열려 있지 않습니다.");
    }
  };

  const totalVotes = hateVotes + likeVotes;
  const hateWidth = totalVotes === 0 ? 50 : (hateVotes / totalVotes) * 100;
  const likeWidth = totalVotes === 0 ? 50 : (likeVotes / totalVotes) * 100;

  const hateFont =
    hateVotes > likeVotes ? "font-h4 xl:font-h3 text-white" : "font-b1-semibold xl:font-h4 text-grayoe-200";
  const likeFont =
    likeVotes > hateVotes ? "font-h4 xl:font-h3 text-white" : "font-b1-semibold xl:font-h4 text-grayoe-200";
  const hateBg = hateVotes > likeVotes ? "bg-redoe-500 " : "bg-redoe-50";
  const likeBg = likeVotes > hateVotes ? "bg-redoe-500" : "bg-redoe-50";
  const hateWinImg =
    hateVotes > likeVotes ? "../../../../public/img/hateOeWin.png" : "../../../../public/img/hateOeLoose.png";
  const likeWinImg =
    likeVotes > hateVotes ? "../../../../public/img/likeOeWin.png" : "../../../../public/img/likeOeLoose.png";
  const isVoteAllowed =
    !user?.lastVoteTime || new Date(user.lastVoteTime).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0);

  return (
    <>
      <div className="h-full xl:h-[686px] overflow-y-auto flex justify-center items-center xl:pr-[40px]">
        <div>
          <div className="w-[182px] min-h-[56px] xl:w-[273px] xl:h-[76px] flex flex-col justify-center items-center mx-auto gap-[8px] ">
            <p className="font-h4 xl:font-h2 text-center">오이 좋아하세요?</p>
            <p className="font-c2 xl:font-b2-regular text-grayoe-200 text-center">
              투표는 ID당 하루에 한 번만 가능합니다
            </p>
          </div>

          {active === "chat" && (
            <div className="w-[182px] h-[20px] flex flex-col justify-center items-center mx-auto mb-6 xl:hidden">
              <p className="font-b2-regular">오이려 싫어 VS 오이려 좋아</p>
            </div>
          )}
          {active === "vote" && (
            <div className="h-[160px] xl:h-[300px] flex flex-col justify-end">
              <div className="flex justify-between px-10 xl:px-12">
                <div className="flex flex-col justify-end items-end">
                  <img
                    src={hateWinImg}
                    alt="hateOeLoose"
                    className={`${hateVotes > likeVotes ? "w-[150px] h-[150px] xl:w-[220px] xl:h-[250px]  " : "w-[100px] h-[100px] xl:w-[150px] xl:h-[150px]"} `}
                  />
                </div>
                <div className="flex flex-col justify-end items-end">
                  <img
                    src={likeWinImg}
                    alt="likeOeLoose"
                    className={`${likeVotes > hateVotes ? "w-[150px] h-[150px] xl:w-[220px] xl:h-[250px]" : "w-[100px] h-[100px] xl:w-[150px] xl:h-[150px]"} `}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex w-[350px] h-[48px] xl:w-[512px] xl:h-[124px] mx-auto rounded-lg px-[40px]">
            <div
              className={`p-4 flex justify-start items-center xl:items-end cursor-pointer rounded-l-[8px] ${hateBg} ${
                isHateClicked ? "shadow-inset-down" : "shadow-3d"
              } ${hateWidth === 100 ? "w-full" : hateWidth === 75 ? "w-3/4" : "w-1/2"} transition-all duration-300`}
              onClick={() => {
                if (isVoteAllowed) {
                  handleVote("hate");
                } else {
                  alert("하루에 한 번만 투표할 수 있습니다.");
                }
              }}
            >
              <div className={`text-left ${hateFont}`}>
                <p>{hateVotes.toLocaleString()}</p>
              </div>
            </div>

            <div
              className={`p-4 flex justify-end items-center xl:items-end cursor-pointer  rounded-r-[8px] ${likeBg} ${
                isLikeClicked ? "shadow-inset-down" : "shadow-3d"
              } ${likeWidth === 100 ? "w-full" : likeWidth === 75 ? "w-3/4" : "w-1/2"} transition-all duration-300`}
              onClick={() => {
                if (isVoteAllowed) {
                  handleVote("like");
                } else {
                  alert("하루에 한 번만 투표할 수 있습니다.");
                }
              }}
            >
              <div className={`text-left ${likeFont}`}>
                <p>{likeVotes.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Vote;
