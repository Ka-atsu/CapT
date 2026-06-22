"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LessonSidebar from "./LessonSidebar";
import LessonContent from "./LessonContent";
import { curriculumRegistry, TrackKey } from "@/lib/registry";

function LessonWorkspace() {
  const searchParams = useSearchParams();

  const trackParam = searchParams.get("track") as TrackKey;
  const trackKey = trackParam && curriculumRegistry[trackParam] ? trackParam : "cs-foundations";
  const activeCurriculum = curriculumRegistry[trackKey];

  // Cast initial ID reliably as string type matching the data array config
  const [currentId, setCurrentId] = useState<string>(activeCurriculum[0].id);

  useEffect(() => {
    setCurrentId(activeCurriculum[0].id);
  }, [trackKey, activeCurriculum]);

  const currentLesson = activeCurriculum.find((l) => l.id === currentId) || activeCurriculum[0];
  const currentIndex = activeCurriculum.findIndex((l) => l.id === currentId);

  const progress = Math.round(((currentIndex + 1) / activeCurriculum.length) * 100);

  const handleNext = () => {
    const next = activeCurriculum[currentIndex + 1];
    if (next) {
      setCurrentId(next.id);
    }
  };

  return (
    <div className="flex h-full w-full bg-[#070708] border-t border-neutral-900 overflow-hidden select-none">
      <LessonSidebar
        lessons={activeCurriculum}
        currentId={currentId}
        onSelect={setCurrentId}
        progress={progress}
      />

      <main className="flex-1 flex overflow-hidden bg-[#0B0B0C] p-8!">
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