import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const FeedbackScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center">
      <p>This section contains the feedback.</p>
      <Button
        onClick={() => window.location.reload()}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg mb-6"
      >
        Go to Dashboard
      </Button>
      <motion.div
        className="cursor-pointer flex justify-center items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </motion.div>
    </div>
  );
};

export default FeedbackScreen;
