import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { scrollRefProps } from "@/types/scrollRef";
import instance from "@/api/axios";
import { useScrollEvent } from "@/hooks/useScrollEvent";
import likeOeWin from "@/assets/img/likeOeWin.webp";
import likeOeLoose from "@/assets/img/likeOeLoose.webp";
import hateOeWin from "@/assets/img/hateOeWin.webp";
import hateOeLoose from "@/assets/img/hateOeLoose.webp";

const OeVote: FC<scrollRefProps> = ({ scrollRef }) => {
  const [animation, setAnimation] = useState({ animationOne: false, animationTwo: false });
  const navigate = useNavigate();

  const fetchVoteData = async () => {
    const res = await instance.get("/api/community/vote-status");
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ["voteData"],
    queryFn: fetchVoteData
  });

  const handleScrollAnimation = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const viewportHeight = window.innerHeight;

      setAnimation(() => ({
        animationOne: scrollTop >= viewportHeight * 1.3,
        animationTwo: scrollTop >= viewportHeight * 1.7
      }));
    }
  };
  useScrollEvent(handleScrollAnimation, scrollRef);

  const likeVotes = data?.like;
  const hateVotes = data?.hate;
  const totalVotes = hateVotes + likeVotes;
  const hateWidth = totalVotes === 0 ? 50 : (hateVotes / totalVotes) * 100;
  const likeWidth = totalVotes === 0 ? 50 : (likeVotes / totalVotes) * 100;

  const hateFont =
    hateVotes > likeVotes ? "font-h4 xl:font-h3 text-white" : "font-b1-semibold xl:font-h4 text-grayoe-200";
  const likeFont =
    likeVotes > hateVotes ? "font-h4 xl:font-h3 text-white" : "font-b1-semibold xl:font-h4 text-grayoe-200";
  const hateWinImg = likeVotes < hateVotes ? hateOeWin : hateOeLoose;
  const likeWinImg = likeVotes > hateVotes ? likeOeWin : likeOeLoose;
  const hateBg = hateVotes > likeVotes ? "bg-redoe-500 " : "bg-redoe-50";
  const likeBg = likeVotes > hateVotes ? "bg-redoe-500" : "bg-redoe-50";

  return (
    <section className="flex flex-col justify-center items-start h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] px-6 xl:p-0">
      <h3 className="font-h3 mb-7">오이 좋아하세요?</h3>

      <div className="w-full will-change-transform">
        <div className={`${animation.animationOne ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="h-[188px] xl:h-[328px] w-full xl:w-[512px] flex flex-col justify-end mx-auto">
            <div className="flex justify-between">
              <div className="flex flex-col justify-end items-end">
                <img
                  src={hateWinImg}
                  alt="hateOeLoose"
                  className={`${hateVotes > likeVotes ? "w-[159px] h-[182px] xl:w-[292px] xl:h-[320px]" : "w-[139px] h-[150px] xl:w-[214px] xl:h-[250px]"}`}
                />
              </div>
              <div className="flex flex-col justify-end items-end">
                <img
                  src={likeWinImg}
                  alt="likeOeLoose"
                  className={`${likeVotes > hateVotes ? "w-[159px] h-[182px] xl:w-[292px] xl:h-[320px]" : "w-[139px] h-[150px] xl:w-[214px] xl:h-[250px]"} `}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full h-[80px] xl:w-[512px] xl:h-[114px] mx-auto mb-[48px] rounded-lg">
            <div
              className={`p-4 flex justify-start items-center xl:items-end rounded-l-[8px] ${hateBg} ${hateWidth === 100 ? "w-full" : hateWidth === 75 ? "w-3/4" : "w-1/2"} transition-all duration-300`}
            >
              <div className={`text-left ${hateFont}`}>
                <p>{hateVotes !== undefined ? hateVotes.toLocaleString() : "0"}</p>
              </div>
            </div>

            <div
              className={`p-4 flex justify-end items-center xl:items-end rounded-r-[8px] ${likeBg} ${likeWidth === 100 ? "w-full" : likeWidth === 75 ? "w-3/4" : "w-1/2"} transition-all duration-300`}
            >
              <div className={`text-left ${likeFont}`}>
                <p>{likeVotes !== undefined ? likeVotes.toLocaleString() : "0"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-[512px] mx-auto will-change-transform">
        <div className={`${animation.animationTwo ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <p className="font-b2-regular">OE syrup VS OE zoa</p>
            <button
              onClick={() => navigate("/vote-chat")}
              className="w-full h-[56px] rounded-lg font-b1-semibold bg-gradient-to-r from-[#00C853] via-[#00C580] via-3% to-[#75BF00]"
            >
              대국민 오이 취향 투표 진행 중
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OeVote;
