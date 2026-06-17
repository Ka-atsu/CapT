"use client";

import { useEffect, useState } from "react";

import type { Lesson } from "@/lib/types";
import type { IconType } from "@/lib/icons/iconRegistry";

import LessonHeader from "./components/LessonHeader";
import InteractiveNodes, { Step } from "./components/InteractiveNodes";
import RevealPanel from "./components/RevealPanel";
import ChallengeSection from "./components/ChallengeSection";
import EmptyState from "./components/EmptyState";

type Props = {
  lesson: Lesson;
  onNext: () => void;
  isLast: boolean;
};

const normalizeSteps = (steps: Lesson["steps"]): Step[] => {
  return steps.map((step) => ({
    icon: (step.icon ?? "user") as IconType,
    subtitle: step.subtitle,
  }));
};

export default function LessonContent({ lesson, onNext, isLast }: Props) {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(
    null,
  );

  const [viewedSteps, setViewedSteps] = useState<Set<number>>(new Set());

  const [solved, setSolved] = useState(false);

  useEffect(() => {
    setSelectedStepIndex(null);
    setViewedSteps(new Set());
    setSolved(false);
  }, [lesson.id]);

  const handleStepClick = (index: number) => {
    setSelectedStepIndex(index);

    setViewedSteps((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const hasCompletedAllSteps = viewedSteps.size === lesson.steps.length;

  // In LessonContent.tsx
  return (
    <div className="h-full w-full overflow-y-auto custom-scrollbar bg-[#0b0b0c] flex justify-center">
      {/* Add pb-16! to the scroll container */}
      <div className="w-full max-w-380 flex flex-col gap-12!">
        <LessonHeader lesson={lesson} />

        <InteractiveNodes
          steps={normalizeSteps(lesson.steps)}
          selectedStepIndex={selectedStepIndex}
          viewedSteps={viewedSteps}
          onSelect={handleStepClick}
        />

        {selectedStepIndex !== null ? (
          <RevealPanel step={lesson.steps[selectedStepIndex]} />
        ) : (
          <EmptyState />
        )}

        {hasCompletedAllSteps && (
          <ChallengeSection
            lesson={lesson}
            solved={solved}
            isLast={isLast}
            onNext={onNext}
            onCorrect={() => setSolved(true)}
          />
        )}
      </div>
    </div>
  );
}
