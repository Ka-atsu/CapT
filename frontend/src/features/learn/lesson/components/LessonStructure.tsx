import React from "react";
import { Lesson } from "@/lib/types";
import IconRenderer from "@/lib/icons/RendererIcon";
import type { IconType } from "@/lib/icons/iconRegistry";
import ExercisePanel from "../../exercise/ExercisePanel";

// CSS Modules
import layoutStyles from "../styles/LessonLayout.module.css";
import nodeStyles from "../styles/InteractiveNodes.module.css";
import challengeStyles from "../styles/ChallengeSection.module.css";

type LessonHeaderProps = {
  lesson: Lesson;
};

export function LessonHeader({ lesson }: LessonHeaderProps) {
  return (
    <header className={layoutStyles.headerSection}>
      {/* Category / Super-header */}
      <div className="flex justify-between items-center mb-4!">
        <span className="text-xs uppercase tracking-widest bg-sky-950/50 border border-sky-500/30 text-sky-400 px-3! py-1! rounded-full font-bold">
          System Design
        </span>
      </div>

      {/* Main Title & One-Liner Description */}
      <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
        {lesson.title}
      </h1>

      {lesson.briefing?.description && (
        <p className="text-lg text-neutral-400 mt-3! max-w-3xl leading-relaxed text-center mx-auto!">
          {lesson.briefing.description}
        </p>
      )}

      {/* Context Split Grid (Analogy vs Real-World Use Case) */}
      {lesson.briefing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8! w-full">
          {/* Card 1: Real-World Analogy */}
          <div className="bg-[#121214] border border-neutral-800/60 p-6! rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold flex items-center gap-2">
                🌏 Real-World Analogy
              </span>
              <p className="text-neutral-300 mt-4! text-sm leading-relaxed">
                {lesson.briefing.realWorldAnalogy}
              </p>
            </div>
          </div>

          {/* Card 2: Used By */}
          <div className="bg-[#121214] border border-neutral-800/60 p-6! rounded-2xl flex flex-col justify-between gap-4!">
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold flex items-center gap-2">
                🎬 Used By
              </span>
              <p className="text-neutral-300 mt-4! text-sm leading-relaxed">
                {lesson.briefing.usedByText}
              </p>
            </div>

            {lesson.briefing.usedByCompany && (
              <div className="self-start">
                <span className="text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-3! py-1.5! rounded-lg">
                  {lesson.briefing.usedByCompany}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section Divider indicating the upcoming Flow Diagram */}
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 mt-12! -mb-4">
        <span>⚡ Flow Architecture</span>
      </div>
    </header>
  );
}

// --- KEEP INTERACTIVE NODES & CHALLENGE SECTION THE SAME ---
export type Step = {
  icon: IconType;
  subtitle: string;
};

type InteractiveNodesProps = {
  steps: Step[];
  selectedStepIndex: number | null;
  viewedSteps: ReadonlySet<number>;
  onSelect: (index: number) => void;
};

export function InteractiveNodes({
  steps,
  selectedStepIndex,
  viewedSteps,
  onSelect,
}: InteractiveNodesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-8 my-8! bg-[#121214]/30 border border-neutral-800/40 p-8! rounded-2xl">
      {steps.map((step, idx) => {
        const selected = selectedStepIndex === idx;
        const viewed = viewedSteps.has(idx);

        return (
          <div key={idx} className="flex items-center gap-4">
            <button
              onClick={() => onSelect(idx)}
              aria-pressed={selected}
              aria-label={step.subtitle}
              className={`
                relative
                w-40 h-40
                rounded-2xl
                flex flex-col
                items-center justify-center
                bg-[#161619]
                border border-neutral-800
                transition-all
                hover:-translate-y-1
                hover:bg-[#1c1c21]
                cursor-pointer
                ${selected ? "border-sky-500 ring-2 ring-sky-500/20 shadow-lg shadow-sky-500/10" : ""}
              `}
            >
              <IconRenderer
                type={step.icon}
                className="w-12 h-12 text-neutral-400"
              />

              <span className="mt-3 text-xs font-bold text-neutral-200 text-center px-2">
                {step.subtitle}
              </span>

              {viewed && (
                <div className="absolute top-2 right-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-4 h-4 text-emerald-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>

            {/* Adds simple step connector arrows between nodes if it's not the last step */}
            {idx < steps.length - 1 && (
              <span className="text-neutral-700 hidden md:inline text-xl font-light">
                →
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

type ChallengeSectionProps = {
  lesson: Lesson;
  solved: boolean;
  isLast: boolean;
  onNext: () => void;
  onCorrect: () => void;
};

export function ChallengeSection({
  lesson,
  solved,
  isLast,
  onNext,
  onCorrect,
}: ChallengeSectionProps) {
  return (
    <div className={challengeStyles.challengeContainer}>
      <ExercisePanel
        exercise={lesson.exercise}
        onCorrect={onCorrect}
        unlocked
      />

      {solved && (
        <div className="bg-emerald-900/20 border border-emerald-500/30 p-8! rounded-2xl mt-6!">
          {!isLast ? (
            <button
              onClick={onNext}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8! py-3! rounded-xl transition-colors"
            >
              Next Lesson →
            </button>
          ) : (
            <span className="text-emerald-400 font-bold block text-center">
              Track Complete 🎉
            </span>
          )}
        </div>
      )}
    </div>
  );
}
