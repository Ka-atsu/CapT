import ProgressBar from "@/components/ProgressBar";
import { Lesson } from "@/lib/types";
import styles from "./styles/LessonSidebar.module.css";

type Props = {
  lessons: Lesson[];
  currentId: string | number;
  onSelect: (id: string | number) => void;
  progress: number;
};

export default function LessonSidebar({
  lessons,
  currentId,
  onSelect,
  progress,
}: Props) {
  return (
    <aside className="w-80 bg-[#070708] border-r border-neutral-800 shrink-0 overflow-y-auto custom-scrollbar">
      {/* 
        Main content wrapper.
        Uses a CSS Module instead of Tailwind spacing utilities to enforce
        consistent internal padding across the entire sidebar regardless of
        future layout changes.
      */}
      <div className={styles.innerWrapper}>
        {/* 
          Course Progress Section
          --------------------------------------------------------------
          Provides learners with immediate feedback on overall completion.
          This section remains visible at the top of the navigation area
          to encourage progress tracking and course engagement.
        */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest pl-1">
            Course Outline
          </p>

          {/* Visual representation of course completion percentage */}
          <ProgressBar value={progress} />

          {/* Numeric progress indicator for precision */}
          <p className="text-xs font-medium text-neutral-500 text-right pr-1">
            {progress}% Completed
          </p>
        </div>

        {/* 
          Lesson Navigation
          --------------------------------------------------------------
          Dynamically renders all available lessons. The parent component
          owns the lesson state while this sidebar acts purely as a visual
          navigation layer.
        */}
        <nav className="flex flex-col gap-3">
          {lessons.map((lesson, index) => {
            // Determines whether the current lesson should receive active styling
            const isActive = lesson.id === currentId;

            return (
              <button
                key={lesson.id}
                onClick={() => onSelect(lesson.id)}
                className={`group relative flex items-center w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                  isActive
                    ? "bg-violet-500/10 border-violet-500/30 text-violet-300 font-bold shadow-[0_0_15px_rgba(124,58,237,0.05)]"
                    : "bg-transparent border-transparent text-neutral-400 hover:bg-[#121214] hover:border-neutral-800 hover:text-neutral-200"
                }`}
              >
                {/* 
                  Active Lesson Indicator
                  ------------------------------------------------------
                  A glowing accent bar helps users quickly identify their
                  current position within the course outline, especially
                  when navigating long lesson lists.
                */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3/5 bg-violet-500 rounded-r-md shadow-[0_0_12px_rgba(124,58,237,0.8)]" />
                )}

                {/* 
                  Lesson Index
                  ------------------------------------------------------
                  Displays a structured numbering system that helps users
                  understand lesson order and overall course progression.
                */}
                <span
                  className={`text-xs font-mono mr-4 shrink-0 transition-colors ${
                    isActive
                      ? "text-violet-400"
                      : "text-neutral-600 group-hover:text-neutral-400"
                  }`}
                >
                  1.{index + 1}
                </span>

                {/* 
                  Lesson Title
                  ------------------------------------------------------
                  Primary navigation label displayed to the learner.
                  The title should remain concise enough to fit comfortably
                  within the sidebar layout.
                */}
                <span className="text-[14px] leading-snug">{lesson.title}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
