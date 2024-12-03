import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../zustand/authStore";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

interface VoteProps {
  active: "vote" | "chat";
  initialVotes: {
    hate: number;
    like: number;
  };
  isVoting: string;
}

function Vote({ active, initialVotes, isVoting }: VoteProps) {
  const [hateVotes, setHateVotes] = useState(initialVotes.hate);
  const [likeVotes, setLikeVotes] = useState(initialVotes.like);
  const [isHateClicked, setIsHateClicked] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [votingStatus, setVotingStatus] = useState(isVoting);
  const user = useUserStore((state) => state.user);
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    setVotingStatus(isVoting);
  }, [isVoting]);

  useEffect(() => {
    setHateVotes(initialVotes.hate);
    setLikeVotes(initialVotes.like);
  }, [initialVotes]);

  useEffect(() => {
    const socket = new SockJS(import.meta.env.VITE_APP_WS_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe("/topic/votes", (message) => {
          const data = JSON.parse(message.body);

          if (data.like !== undefined) setLikeVotes(data.like);
          if (data.hate !== undefined) setHateVotes(data.hate);
          if (data.isVoting !== undefined) {
            setVotingStatus(data.isVoting);
          }
        });
      },
      onStompError: (frame) => {
        console.error("STOMP 에러:", frame.headers["message"]);
        console.error("에러 상세:", frame.body);
      }
    });

    stompClientRef.current = client;
    client.activate();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  const handleVote = (side: "hate" | "like") => {
    if (!user) {
      alert("로그인 후 투표해주세요");
      return;
    }

    if (votingStatus === "like" || votingStatus === "hate") {
      alert("하루에 한 번 투표 가능합니다");
      return;
    }

    if (side === "hate") {
      setIsHateClicked(true);
      setTimeout(() => setIsHateClicked(false), 300);
    } else {
      setIsLikeClicked(true);
      setTimeout(() => setIsLikeClicked(false), 300);
    }

    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: `/app/votes`,
        body: JSON.stringify({
          id: user.memberPk,
          vote: side === "hate" ? false : true
        })
      });
    } else {
      console.error("STOMP 연결이 활성화되어 있지 않습니다.");
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
  const hateWinImg = hateVotes > likeVotes ? "/img/hateOeWin.png" : "/img/hateOeLoose.png";
  const likeWinImg = likeVotes > hateVotes ? "/img/likeOeWin.png" : "/img/likeOeLoose.png";
  const isVoteAllowed =
    !user?.lastVoteTime || new Date(user.lastVoteTime).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0);

  return (
    <>
      <div className="h-full xl:h-[686px] overflow-y-auto flex justify-center items-center xl:pr-[40px]">
        <div>
          <div className="w-[182px] min-h-[56px] xl:w-[273px] xl:h-[76px] flex flex-col justify-center items-center mx-auto gap-[8px] ">
            <p className="font-h4 xl:font-h2 text-center">오이 좋아하세요?</p>
            <p className="font-c2 xl:font-b2-regular pb-2 text-grayoe-200 text-center">
              투표는 ID당 하루에 한 번만 가능합니다
            </p>
          </div>
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
                <p>{hateVotes !== undefined ? hateVotes.toLocaleString() : "0"}</p>
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
                <p>{likeVotes !== undefined ? likeVotes.toLocaleString() : "0"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Vote;
