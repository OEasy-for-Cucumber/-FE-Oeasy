import { useState } from "react";
import voteOE from "../../../../public/img/voteOE.png";
import voteO2 from "../../../../public/img/voteOE*.png";

interface VoteProps {
  active: "vote" | "chat";
}

function Vote({ active }: VoteProps) {
  const [hateVotes, setHateVotes] = useState(10000);
  const [likeVotes, setLikeVotes] = useState(10000);
  const [isHateClicked, setIsHateClicked] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState(false);

  const handleVote = (side: "hate" | "like") => {
    if (side === "hate") {
      setHateVotes(hateVotes + 1);
      setIsHateClicked(true);
      setTimeout(() => setIsHateClicked(false), 1000);
    } else {
      setLikeVotes(likeVotes + 1);
      setIsLikeClicked(true);
      setTimeout(() => setIsLikeClicked(false), 1000);
    }
  };

  const totalVotes = hateVotes + likeVotes;
  const hateWidth = totalVotes === 0 ? 50 : (hateVotes / totalVotes) * 100;
  const likeWidth = totalVotes === 0 ? 50 : (likeVotes / totalVotes) * 100;

  const hateFont = hateVotes > likeVotes ? "font-h4" : "font-b1-semibold";
  const likeFont = likeVotes > hateVotes ? "font-h4 " : "font-b1-semibold";

  return (
    <>
      <div className="h-full overflow-y-auto flex justify-center items-center">
        <div>
          <div className="w-[182px] min-h-[56px] flex flex-col justify-center items-center mx-auto gap-[8px] ">
            <p className="font-h4 text-center">오이 좋아하세요?</p>
            <p className="font-c2 text-grayoe-200 text-center">투표는 ID당 하루에 한 번만 가능합니다</p>
          </div>

          {active === "chat" && (
            <div className="w-[182px] h-[20px] flex flex-col justify-center items-center mx-auto mb-6 xl:hidden">
              <p className="font-b2-regular">오이려 싫어 VS 오이려 좋아</p>
            </div>
          )}
          {active === "vote" && (
            <div className="flex justify-between  px-4">
              <img src={voteOE} alt="voteOE" className="w-[80px] h-[150px]" />
              <img src={voteO2} alt="voteOE" className="w-[80px] h-[150px]" />
            </div>
          )}

          <div className="flex w-[296px] h-[48px] mx-auto rounded-lg ">
            <div
              className={`p-4 bg-redoe-50 roun flex justify-start items-center cursor-pointer transition-shadow rounded-l-[8px] ${
                isHateClicked ? "shadow-hate-custom" : ""
              }`}
              style={{ width: `${hateWidth}%`, transition: "width 0.3s" }}
              onClick={() => handleVote("hate")}
            >
              <div className={`text-left ${hateFont}`}>
                <p className="text-grayoe-200">{hateVotes.toLocaleString()}</p>
              </div>
            </div>

            <div
              className={`p-4 bg-redoe-500 flex justify-end items-center cursor-pointer transition-shadow rounded-r-[8px] ${
                isLikeClicked ? "shadow-like-custom" : ""
              }`}
              style={{ width: `${likeWidth}%`, transition: "width 0.3s" }}
              onClick={() => handleVote("like")}
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
