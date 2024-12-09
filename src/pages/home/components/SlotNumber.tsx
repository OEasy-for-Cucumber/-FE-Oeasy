import { motion, useMotionValue, useTransform, animate, useMotionTemplate } from "framer-motion";

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
      onViewportEnter={() => startAnimation()}
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.span>{displayValue}</motion.span>
    </motion.div>
  );
}

export default SlotNumber;
