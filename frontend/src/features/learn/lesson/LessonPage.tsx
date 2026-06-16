"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LessonSidebar from "./LessonSidebar";
import LessonContent from "./LessonContent";
import { curriculumRegistry, TrackKey } from "@/lib/registry";

// We extract the actual workspace logic into a sub-component so we can wrap it in Suspense
function LessonWorkspace() {
  const searchParams = useSearchParams();

  // 1. Grab the track from the URL. If it doesn't exist, default to cs-foundations
  const trackParam = searchParams.get("track") as TrackKey;
  const trackKey =
    trackParam && curriculumRegistry[trackParam]
      ? trackParam
      : "cs-foundations";

  // 2. Load the correct curriculum data array from our registry
  const activeCurriculum = curriculumRegistry[trackKey];

  const [currentId, setCurrentId] = useState(activeCurriculum[0].id);

  // 3. If the user clicks a different track from the TopicPage, reset to the first lesson
  useEffect(() => {
    setCurrentId(activeCurriculum[0].id);
  }, [trackKey, activeCurriculum]);

  // Safety fallback to ensure we always have a valid lesson object
  const currentLesson =
    activeCurriculum.find((l) => l.id === currentId) || activeCurriculum[0];
  const currentIndex = activeCurriculum.findIndex((l) => l.id === currentId);

  const progress = Math.round(
    ((currentIndex + 1) / activeCurriculum.length) * 100,
  );

  const handleNext = () => {
    const next = activeCurriculum[currentIndex + 1];
    if (next) {
      setCurrentId(next.id);
    }
  };

  return (
    <div className="flex h-full w-full bg-[#070708] border-t border-neutral-900 overflow-hidden select-none">
      <LessonSidebar
        lessons={activeCurriculum} // Pass the dynamic array to the sidebar
        currentId={currentId}
        onSelect={setCurrentId}
        progress={progress}
      />

      <main className="flex-1 flex overflow-hidden bg-[#0B0B0C]">
        <LessonContent
          key={currentLesson.id}
          lesson={currentLesson}
          onNext={handleNext}
          isLast={currentIndex === activeCurriculum.length - 1}
        />
      </main>
    </div>
  );
}

// Next.js requires useSearchParams() to be wrapped in a Suspense boundary
export default function LessonPage() {
  return (
    <Suspense
      fallback={
        <div className="h-full w-full flex items-center justify-center bg-[#070708] text-violet-400 font-mono text-sm animate-pulse">
          Initializing Workspace...
        </div>
      }
    >
      <LessonWorkspace />
    </Suspense>
  );
}
