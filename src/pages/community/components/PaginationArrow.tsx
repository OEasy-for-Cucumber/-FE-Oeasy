import leftArrow from "../../../../public/icons/leftArrow.webp";
import rightArrow from "../../../../public/icons/rightArrow.webp";

interface buttonProps {
  arrowType: "left" | "right";
  disabled?: boolean;
  onClick?: () => void;
}

const PaginationArrow: React.FC<buttonProps> = (props) => {
  return (
    <div
      className={`flex justify-center items-center w-[27px] h-[27px]
      ${props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      onClick={!props.disabled ? props.onClick : undefined}
    >
      {props.arrowType === "left" ? (
        <img className="w-4 h-4 xl:w-8 xl:h-8 hover:scale-110 " src={leftArrow} />
      ) : (
        <img className="w-4 h-4 xl:w-8 xl:h-8 hover:scale-110" src={rightArrow} />
      )}
    </div>
  );
};

export default PaginationArrow;
