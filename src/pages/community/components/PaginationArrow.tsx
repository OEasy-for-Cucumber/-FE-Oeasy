import leftArrow from "../../../../public/icons/leftArrow.png";
import rightArrow from "../../../../public/icons/rightArrow.png";

interface buttonProps {
  arrowType: "left" | "right";
  disabled?: boolean;
  onClick?: () => void;
}

const PaginationArrow: React.FC<buttonProps> = (props) => {
  return (
    <div
      className="flex justify-center items-center w-[27px] h-[27px] border-[1px] border-solid rounded-[27px] bg-white cursor-pointer"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.arrowType === "left" ? <img src={leftArrow} /> : <img width="12px" height={12} src={rightArrow} />}
    </div>
  );
};

// const StButton = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 27px;
//   height: 27px;
//   border-radius: 27px;
//   border: 1px solid var(--border);
//   background-color: #fff;
//   cursor: pointer;
//   &:hover {
//     background-color: var(--week_hover);
//   }
//   &:active {
//     background-color: var(--week_actived);
//   }
//   &:disabled {
//     background-color: var(--surface_primary);
//     color: var(--text_filledBtn);
//     cursor: default;
//   }
// `;

export default PaginationArrow;
