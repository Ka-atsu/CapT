"use client";

import { useState } from "react";
import { MultipleChoiceExercise } from "@/lib/types";

type Props = {
  exercise: MultipleChoiceExercise;
  onCorrect: () => void;
};

export default function MultipleChoice({ exercise, onCorrect }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === exercise.answer;

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    if (isCorrect) onCorrect();
  };

  const handleSelect = (index: number) => {
    if (submitted && isCorrect) return;
    setSelected(index);
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium text-neutral-200">{exercise.prompt}</p>
      <div className="flex flex-col gap-2">
        {exercise.options.map((option, index) => {
          const isSelected = selected === index;
          const isWrong = submitted && isSelected && !isCorrect;
          const isRight = submitted && isSelected && isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`text-left text-sm px-4 py-3 rounded-lg border transition-colors
                ${
                  isRight
                    ? "border-green-500 bg-green-500/10 text-green-400"
                    : isWrong
                      ? "border-red-500 bg-red-500/10 text-red-400"
                      : isSelected
                        ? "border-violet-500 bg-violet-500/10 text-white"
                        : "border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white"
                }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {submitted && !isCorrect && (
        <p className="text-xs text-red-400">Not quite — try again.</p>
      )}

      {!isCorrect && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="self-start text-sm font-medium bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg transition-colors"
        >
          Check
        </button>
      )}
    </div>
  );
}
