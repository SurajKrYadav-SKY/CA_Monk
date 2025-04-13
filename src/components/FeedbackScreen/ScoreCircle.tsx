import { motion } from "framer-motion";

interface ScoreCircleProps {
  score: number;
  scoreColor: { stroke: string; text: string };
}

const ScoreCircle = ({ score, scoreColor }: ScoreCircleProps) => (
  <svg
    className="w-32 h-32 mx-auto mb-4"
    role="img"
    aria-label={`Score: ${score}`}
  >
    <circle
      cx="64"
      cy="64"
      r="56"
      fill="none"
      stroke="#e5e7eb"
      strokeWidth="8"
    />
    <motion.circle
      cx="64"
      cy="64"
      r="56"
      fill="none"
      stroke={scoreColor.stroke}
      strokeWidth="8"
      strokeLinecap="round"
      initial={{ strokeDasharray: "0 352", rotate: -90 }}
      animate={{ strokeDasharray: `${(score / 100) * 352} 352`, rotate: -90 }}
      transition={{ duration: 2, ease: "easeOut" }}
    />
    <text
      x="50%"
      y="50%"
      dy=".3em"
      textAnchor="middle"
      className="font-semibold text-3xl"
      style={{ fill: scoreColor.text }}
    >
      {score}
    </text>
    <text
      x="50%"
      y="70%"
      dy=".3em"
      textAnchor="middle"
      className="text-gray-600 text-sm"
      style={{ fill: scoreColor.text }}
    >
      Overall Score
    </text>
  </svg>
);

export default ScoreCircle;
