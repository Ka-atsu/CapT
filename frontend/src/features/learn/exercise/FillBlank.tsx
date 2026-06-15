"use client";

import { useState } from "react";
import { FillBlankExercise } from "@/lib/types";

type Props = {
  exercise: FillBlankExercise;
  onCorrect: () => void;
};

export default function FillBlank({ exercise, onCorrect }: Props) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isCorrect =
    value.trim().toLowerCase() === exercise.answer.toLowerCase();

  const handleSubmit = () => {
    if (!value.trim()) return;
    setSubmitted(true);
    if (isCorrect) onCorrect();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSubmitted(false);
  };

  const parts = exercise.prompt.split("___");

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium text-neutral-200 leading-relaxed">
        {parts[0]}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="your answer"
          className={`mx-2 px-2 py-0.5 rounded border bg-neutral-900 text-sm w-32 outline-none transition-colors
            ${
              submitted && isCorrect
                ? "border-green-500 text-green-400"
                : submitted && !isCorrect
                  ? "border-red-500 text-red-400"
                  : "border-neutral-600 text-white focus:border-violet-500"
            }`}
        />
        {parts[1]}
      </p>

      {submitted && !isCorrect && (
        <p className="text-xs text-red-400">Not quite — try again.</p>
      )}

      {!isCorrect && (
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="self-start text-sm font-medium bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg transition-colors"
        >
          Check
        </button>
      )}
    </div>
  );
}
