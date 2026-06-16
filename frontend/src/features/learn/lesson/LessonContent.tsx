"use client";

import { useState, useEffect } from "react";
import { Lesson } from "@/lib/types";
import ExercisePanel from "../exercise/ExercisePanel";
import styles from "./styles/LessonContent.module.css";

type Props = {
  lesson: Lesson;
  onNext: () => void;
  isLast: boolean;
};

// Helper component to render the correct SVG based on the mock data
const IconRenderer = ({ type }: { type?: string }) => {
  switch (type) {
    case "user":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#84cc16"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.nodeIcon}
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "network":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.nodeIcon}
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "bank":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.nodeIcon}
        >
          <rect x="2" y="20" width="20" height="2" />
          <rect x="4" y="9" width="2" height="9" />
          <rect x="10" y="9" width="2" height="9" />
          <rect x="18" y="9" width="2" height="9" />
          <polygon points="12 2 2 7 22 7 12 2" />
        </svg>
      );
    case "server":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.nodeIcon}
        >
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case "shield":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.nodeIcon}
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    default:
      return (
        <div className={`${styles.nodeIcon} bg-neutral-700 rounded-full`} />
      );
  }
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
    setViewedSteps((prev) => new Set(prev).add(index));
  };

  const hasCompletedAllSteps = viewedSteps.size === lesson.steps.length;

  return (
    /* ADDED: h-full w-full overflow-y-auto so the main pane scrolls properly! */
    <div
      className={`h-full w-full overflow-y-auto custom-scrollbar ${styles.slideWrapper}`}
    >
      <div className={styles.slideContent}>
        {/* Dynamic Header Section */}
        <header className={styles.headerSection}>
          <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight">
            {lesson.title}
          </h1>

          {lesson.briefing && (
            <div className="flex items-center justify-center gap-6 mt-2">
              <p className="text-sm font-medium text-neutral-400 border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 rounded-full">
                Core Concept:{" "}
                <span className="text-violet-400 font-bold">
                  {lesson.briefing.coreConcept}
                </span>
              </p>
              <p className="text-sm font-medium text-neutral-400 border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 rounded-full">
                Impact:{" "}
                <span className="text-emerald-400 font-bold">
                  {lesson.briefing.latencyImpact}
                </span>
              </p>
            </div>
          )}

          <p className="text-xs font-bold text-neutral-500 mt-6 uppercase tracking-widest animate-pulse">
            Select the icons to explore the architecture
          </p>
        </header>

        {/* Interactive Circles Grid */}
        <div className={styles.interactiveNodes}>
          {lesson.steps.map((step, idx) => {
            const isSelected = selectedStepIndex === idx;
            const isViewed = viewedSteps.has(idx);

            return (
              <div
                key={idx}
                onClick={() => handleStepClick(idx)}
                className={`${styles.nodeCircle} ${isSelected ? styles.nodeSelected : ""}`}
              >
                <IconRenderer type={step.icon} />
                <span className={styles.nodeSubtitle}>{step.subtitle}</span>

                {/* The NetAcad Checkmark Badge */}
                {isViewed && (
                  <div className={styles.checkBadge}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Explanation Reveal Area */}
        {selectedStepIndex !== null ? (
          <div className={styles.revealArea}>
            <div className="w-full text-left">
              <h3 className="text-2xl font-bold text-white mb-4">
                {lesson.steps[selectedStepIndex].subtitle}
              </h3>

              {/* Markdown Content */}
              <div className="text-neutral-300 leading-relaxed text-lg whitespace-pre-wrap">
                {lesson.steps[selectedStepIndex].markdownContent}
              </div>

              {/* Code Snippet Block (Only renders if the mock data has one!) */}
              {lesson.steps[selectedStepIndex].codeSnippet && (
                <div className="mt-8 bg-[#070708] rounded-xl border border-neutral-800 overflow-hidden shadow-lg">
                  <div className="bg-neutral-900/50 px-4 py-2 border-b border-neutral-800 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 ml-2 uppercase">
                      Proof of Concept
                    </span>
                  </div>
                  <pre className="p-5 overflow-x-auto custom-scrollbar">
                    <code className="text-sm font-mono text-emerald-400/90 whitespace-pre-wrap">
                      {lesson.steps[selectedStepIndex].codeSnippet}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className={`${styles.revealArea} opacity-50 justify-center items-center`}
          >
            <p className="text-neutral-500 font-medium text-center">
              Click a node above to explore its details.
            </p>
          </div>
        )}

        {/* Challenge Block (Unlocks when all nodes are clicked) */}
        {hasCompletedAllSteps && (
          <div className={styles.challengeContainer}>
            <div className="flex flex-col gap-2 text-center">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Knowledge Check
              </span>
              <h2 className="text-2xl font-black text-white">
                Verify Your Understanding
              </h2>
            </div>

            <ExercisePanel
              exercise={lesson.exercise}
              onCorrect={() => setSolved(true)}
              unlocked={hasCompletedAllSteps}
            />

            {solved && (
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 animate-in zoom-in-95 mt-4 mb-16">
                <p className="text-emerald-400 font-bold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Module Mastered
                </p>

                {!isLast ? (
                  <button
                    onClick={onNext}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Next Lesson →
                  </button>
                ) : (
                  <span className="text-sm font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-6 py-3 rounded-xl">
                    Track Complete 🎉
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
