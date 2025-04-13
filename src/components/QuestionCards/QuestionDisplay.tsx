import { memo } from "react";

interface QuestionDisplayProps {
  question: string;
  userAnswers: string[];
  blanks: number;
  onClear: (index: number) => void;
}

const QuestionDisplay = ({
  question,
  userAnswers,
  blanks,
  onClear,
}: QuestionDisplayProps) => (
  <p className="text-base sm:text-lg font-normal">
    {question.split("_____________").map((part, i) => (
      <span key={`${part}-${i}`} className="inline-block relative my-1">
        {part}
        {i < blanks && (
          <span className="inline-block relative mx-2">
            {userAnswers[i] && (
              <button
                onClick={() => onClear(i)}
                className="absolute top-3 bg-transparent border border-gray-300 hover:bg-gray-100 rounded px-3 py-1 text-xs text-gray-500 font-semibold"
                aria-label={`Clear answer ${userAnswers[i]}`}
              >
                {userAnswers[i]}
              </button>
            )}
            <span className="border-b border-gray-300 w-24 sm:w-32 h-6 block mt-5" />
          </span>
        )}
      </span>
    ))}
  </p>
);

// here we are memoizing to prevent unnecessary re-render
export default memo(QuestionDisplay);
