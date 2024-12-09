import { motion, useMotionValue, useTransform, animate, useMotionTemplate } from "framer-motion";
import { useEffect, useRef } from "react";

interface SlotNumberProps {
  targetValue: number;
}

function SlotNumber({ targetValue }: SlotNumberProps) {
  const motionValue = useMotionValue(0);
  const formattedValue = useTransform(motionValue, (latest) =>
    Math.floor(latest).toLocaleString()
  );
  const displayValue = useMotionTemplate`${formattedValue} 원`;

  const startAnimation = () => {
    animate(motionValue, targetValue, {
      duration: 1.5,
      ease: "easeInOut",
    });
  };

  return (
    <motion.div
      className="overflow-hidden"
      onViewportEnter={() => startAnimation()} // 화면에 보일 때 애니메이션 시작
      viewport={{ once: true, amount: 0.5 }} // 한 번만 실행, 50% 보였을 때 실행
    >
      <motion.span>{displayValue}</motion.span>
    </motion.div>
  );
}

export default SlotNumber;
