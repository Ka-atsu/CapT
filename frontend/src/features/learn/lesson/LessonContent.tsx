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

export default function LessonContent({ lesson, onNext, isLast }: Props) {
  /*
   * Learning Journey State
   * ------------------------------------------------------------------
   * Tracks learner progression within the current module.
   *
   * selectedStepIndex
   *   Currently inspected architectural component.
   *
   * viewedSteps
   *   Collection of components the learner has already explored.
   *   Used to determine when the final challenge becomes available.
   *
   * solved
   *   Indicates whether the learner successfully completed the
   *   verification exercise.
   */
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(
    null,
  );
  const [viewedSteps, setViewedSteps] = useState<Set<number>>(new Set());
  const [solved, setSolved] = useState(false);

  /*
   * Module Lifecycle Reset
   * ------------------------------------------------------------------
   * Every lesson should start in a clean state.
   *
   * When the active lesson changes:
   * - Close any open inspection panel
   * - Clear exploration history
   * - Reset challenge completion
   *
   * This prevents progress from carrying over between modules.
   */
  useEffect(() => {
    setSelectedStepIndex(null);
    setViewedSteps(new Set());
    setSolved(false);
  }, [lesson.id]);

  /*
   * Component Exploration Handler
   * ------------------------------------------------------------------
   * Opening a component serves two purposes:
   *
   * 1. Reveals its detailed explanation.
   * 2. Marks it as explored for lesson completion tracking.
   *
   * A Set is used to prevent duplicate entries automatically.
   */
  const handleStepClick = (index: number) => {
    setSelectedStepIndex(index);
    setViewedSteps((prev) => new Set(prev).add(index));
  };

  /*
   * Progress Gate
   * ------------------------------------------------------------------
   * The final challenge remains locked until every architectural
   * component has been inspected.
   *
   * This ensures learners review all concepts before attempting
   * the assessment.
   */
  const hasCompletedAllSteps = viewedSteps.size === lesson.steps.length;

  return (
    <div className={styles.splitContainer}>
      {/*
        Theory & Context Pane
        ----------------------------------------------------------------
        Provides the conceptual foundation for the lesson.

        The left pane answers:
        - Why does this system exist?
        - What problem does it solve?
        - What should the learner focus on?

        Unlike the sandbox area, this content remains static and
        serves as the learner's primary source of context.
      */}
      <section className={`${styles.theoryPane} custom-scrollbar`}>
        <header className="flex flex-col gap-4">
          <span className="text-violet-400 text-xs font-bold uppercase tracking-widest">
            Module {lesson.id}
          </span>

          <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight">
            {lesson.title}
          </h1>
        </header>

        {/*
          Mission Briefing
          ----------------------------------------------------------------
          Presents the key learning objectives before exploration begins.

          Core Concept:
            Primary technical principle being introduced.

          Impact Metric:
            Real-world engineering outcome affected by the concept.

          Prerequisites:
            Knowledge expected before starting the lesson.
        */}
        {lesson.briefing && (
          <div className={styles.briefingBox}>
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-1">
                Target Concept
              </span>

              <span className="text-emerald-400 font-mono text-sm">
                {lesson.briefing.coreConcept}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-1">
                Impact Metric
              </span>

              <span className="text-neutral-300 text-sm">
                {lesson.briefing.latencyImpact}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-1">
                Prerequisites
              </span>

              <span className="text-amber-400/90 text-sm block">
                📚 {lesson.briefing.prerequisite}
              </span>
            </div>
          </div>
        )}

        {/*
          Learning Guidance
          ----------------------------------------------------------------
          Provides direction on how learners should approach the
          module and encourages interaction with the exploration
          system before attempting verification.
        */}
        <div className="mt-auto pt-8 border-t border-neutral-900">
          <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
            To understand how this system fails and scales, we need to inspect
            the individual architectural components.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-lg text-violet-300 text-xs font-medium animate-pulse">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            Explore components on the right to continue
          </div>
        </div>
      </section>

      {/*
        Interactive Sandbox
        ----------------------------------------------------------------
        The practical learning area where learners investigate
        individual architectural components.

        This pane focuses on:
        - Discovery
        - Exploration
        - Knowledge application
      */}
      <section className={`${styles.sandboxPane} custom-scrollbar`}>
        {/*
          Architecture Exploration Grid
          --------------------------------------------------------------
          Each card represents a system component that can be inspected.

          Visual States:
          - Default  : Not explored
          - Viewed   : Previously inspected
          - Selected : Currently open

          Exploration progress is tracked independently from
          navigation order.
        */}
        <div className={styles.cardGrid}>
          {lesson.steps.map((step, idx) => {
            /*
             * Visual State Resolution
             * ----------------------------------------------------------
             * Selected state takes precedence over viewed state since
             * learners may revisit components multiple times.
             */
            const isSelected = selectedStepIndex === idx;
            const isViewed = viewedSteps.has(idx);

            let cardClasses = styles.interactiveCard;

            if (isSelected) {
              cardClasses += ` ${styles.cardSelected}`;
            } else if (isViewed) {
              cardClasses += ` ${styles.cardViewed}`;
            }

            return (
              <div
                key={idx}
                onClick={() => handleStepClick(idx)}
                className={cardClasses}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isSelected ? "text-violet-400" : "text-neutral-500"
                    }`}
                  >
                    {step.label}
                  </span>

                  {isViewed && (
                    <span className="text-emerald-500 text-xs font-bold">
                      ✓
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-white text-lg leading-tight">
                  {step.subtitle}
                </h3>
              </div>
            );
          })}
        </div>

        {/*
          Deep-Dive Inspection Panel
          --------------------------------------------------------------
          Displays detailed information for the selected component.

          This area transitions learners from high-level concepts
          into implementation details and system behavior.
        */}
        {selectedStepIndex !== null && (
          <div className={styles.revealPanel}>
            <div className="flex items-center gap-3 mb-6 border-b border-neutral-800 pb-4">
              <span className="bg-neutral-800 text-neutral-300 px-3 py-1.5 rounded-md font-mono text-xs">
                Inspect
              </span>

              <h3 className="text-xl font-bold text-white">
                {lesson.steps[selectedStepIndex].subtitle}
              </h3>
            </div>

            {/*
              Optional Visual Reference
              ----------------------------------------------------------
              Reserved area for diagrams, architecture visuals,
              flowcharts, or supporting illustrations.
            */}
            {lesson.steps[selectedStepIndex].imageUrl && (
              <div className="w-full h-48 bg-black border border-neutral-800 rounded-lg mb-6 flex items-center justify-center text-neutral-600 font-mono text-sm">
                [Image / Diagram Area:{" "}
                {lesson.steps[selectedStepIndex].imageUrl}]
              </div>
            )}

            <div className="text-neutral-300 leading-relaxed whitespace-pre-wrap font-medium">
              {lesson.steps[selectedStepIndex].markdownContent}
            </div>
          </div>
        )}

        {/*
          Knowledge Verification Gate
          --------------------------------------------------------------
          Becomes available only after every lesson component
          has been explored.

          This prevents learners from skipping directly to the
          assessment without reviewing the lesson material.
        */}
        {hasCompletedAllSteps && (
          <div className={styles.challengeContainer}>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Final Verification
              </span>

              <h2 className="text-2xl font-black text-white">
                Apply Your Knowledge
              </h2>
            </div>

            <div className={styles.panelWrapper}>
              <div className={styles.panelLine} />

              {/*
                Interactive Assessment
                ------------------------------------------------------
                Evaluates whether learners can apply concepts
                learned throughout the module.

                Successful completion unlocks progression to
                the next lesson.
              */}
              <ExercisePanel
                exercise={lesson.exercise}
                onCorrect={() => setSolved(true)}
                unlocked={hasCompletedAllSteps}
              />
            </div>

            {/*
              Module Completion State
              ------------------------------------------------------
              Triggered after successfully passing the exercise.

              Depending on lesson position:
              - Unlocks the next module
              - Marks the entire learning track as complete
            */}
            {solved && (
              <div className={styles.successBox}>
                <div>
                  <p className="text-emerald-400 font-bold flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Concept Mastered
                  </p>
                </div>

                {!isLast ? (
                  <button
                    onClick={onNext}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Next Module →
                  </button>
                ) : (
                  <span className="text-sm font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-4 py-2 rounded-lg">
                    Track Complete 🎉
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
