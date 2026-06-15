"use client";

import { useState } from "react";
import { Lesson } from "@/lib/types";
import ExercisePanel from "../exercise/ExercisePanel";

type Props = {
  lesson: Lesson;
  onNext: () => void;
  isLast: boolean;
};

export default function LessonContent({ lesson, onNext, isLast }: Props) {
  const [solved, setSolved] = useState(false);

  // reset when lesson changes
  const [lastId, setLastId] = useState(lesson.id);
  if (lesson.id !== lastId) {
    setLastId(lesson.id);
    setSolved(false);
  }

  return (
    <div className="flex-1 px-12 py-10 overflow-y-auto">
      <h1 className="text-2xl font-bold text-white mb-6">{lesson.title}</h1>
      <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
        {lesson.content}
      </p>

      <ExercisePanel
        exercise={lesson.exercise}
        onCorrect={() => setSolved(true)}
        unlocked={true}
      />

      {solved && !isLast && (
        <button
          onClick={onNext}
          className="mt-6 text-sm font-medium bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Next lesson →
        </button>
      )}

      {solved && isLast && (
        <p className="mt-6 text-sm text-green-400 font-medium">
          You completed this topic! 🎉
        </p>
      )}
    </div>
  );
}
