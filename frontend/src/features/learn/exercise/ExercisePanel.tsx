"use client";

import { Exercise } from "@/lib/types";
import MultipleChoice from "./MultipleChoice";
import FillBlank from "./FillBlank";

type Props = {
  exercise: Exercise;
  onCorrect: () => void;
  unlocked: boolean;
};

export default function ExercisePanel({
  exercise,
  onCorrect,
  unlocked,
}: Props) {
  return (
    <div
      className={`mt-10 border border-neutral-800 rounded-xl p-6 transition-opacity ${unlocked ? "opacity-100" : "opacity-40 pointer-events-none"}`}
    >
      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
        Exercise
      </p>
      {exercise.type === "multiple-choice" && (
        <MultipleChoice exercise={exercise} onCorrect={onCorrect} />
      )}
      {exercise.type === "fill-blank" && (
        <FillBlank exercise={exercise} onCorrect={onCorrect} />
      )}
    </div>
  );
}
