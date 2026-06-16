"use client";

import { useState } from "react";
import LessonSidebar from "./LessonSidebar";
import LessonContent from "./LessonContent";
import { mockLessons } from "@/lib/mockLessons";

export default function LessonPage() {
  /*
   * The currently selected lesson acts as the single source of truth
   * for the learning workspace. Both the sidebar navigation and the
   * content area derive their state from this value.
   */
  const [currentId, setCurrentId] = useState(mockLessons[0].id);

  /*
   * Derive lesson-specific metadata from the active lesson id.
   * Keeping these values computed rather than stored avoids
   * unnecessary state duplication and synchronization issues.
   */
  const currentLesson = mockLessons.find((l) => l.id === currentId)!;
  const currentIndex = mockLessons.findIndex((l) => l.id === currentId);

  /*
   * Progress is calculated dynamically based on the learner's
   * current position within the lesson sequence.
   */
  const progress = Math.round(((currentIndex + 1) / mockLessons.length) * 100);

  /*
   * Advances the learner to the next lesson in the course.
   * Boundary protection prevents navigation beyond the final lesson.
   */
  const handleNext = () => {
    const next = mockLessons[currentIndex + 1];

    if (next) {
      setCurrentId(next.id);
    }
  };

  return (
    <div className="flex h-full w-full bg-[#070708] border-t border-neutral-900 overflow-hidden select-none">
      {/*
        Course Navigation
        ------------------------------------------------------------
        Provides lesson discovery, lesson switching, and progress
        visibility. The sidebar does not manage lesson state itself;
        it simply reflects and updates the state owned by LessonPage.
      */}
      <LessonSidebar
        lessons={mockLessons}
        currentId={currentId}
        onSelect={setCurrentId}
        progress={progress}
      />

      {/*
        Learning Workspace
        ------------------------------------------------------------
        Dedicated content area where lesson material is displayed.
        Occupies all remaining horizontal space after the sidebar.
      */}
      <main className="flex-1 flex overflow-hidden bg-[#0B0B0C]">
        <LessonContent
          /*
            Component Reset Strategy
            --------------------------------------------------------
            Using the lesson id as a React key forces LessonContent
            to fully remount whenever the learner switches lessons.

            Benefits:
            - Resets scroll position
            - Clears local component state
            - Ensures each lesson starts from a clean view

            Without this key, React would reuse the existing
            component instance and preserve internal state.
          */
          key={currentLesson.id}
          lesson={currentLesson}
          onNext={handleNext}
          isLast={currentIndex === mockLessons.length - 1}
        />
      </main>
    </div>
  );
}
