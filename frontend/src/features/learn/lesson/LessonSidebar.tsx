import ProgressBar from "@/components/ProgressBar";
import { Lesson } from "@/lib/types";
import styles from "./styles/LessonSidebar.module.css";

// Inside your LessonSidebar component file:
type Props = {
  lessons: Lesson[];
  currentId: string;
  onSelect: (id: string) => void; // Change from string | number to string
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
      <div className={styles.innerWrapper}>
        {/* Course Progress Section */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest pl-1">
            Course Outline
          </p>
          <ProgressBar value={progress} />
          <p className="text-xs font-medium text-neutral-500 text-right pr-1">
            {progress}% Completed
          </p>
        </div>

        {/* Lesson Navigation */}
        <nav className="flex flex-col gap-3">
          {lessons.map((lesson) => {
            const isActive = lesson.id === currentId;

            // Split the title (e.g. "1.1 Core Data Structures") into the number and the name
            const titleParts = lesson.title.split(" ");
            const lessonNumber = titleParts[0]; // Gets "1.1"
            const lessonName = titleParts.slice(1).join(" "); // Gets "Core Data Structures"

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
                {/* Active Lesson Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3/5 bg-violet-500 rounded-r-md shadow-[0_0_12px_rgba(124,58,237,0.8)]" />
                )}

                {/* Lesson Index (Now pulls the exact number from the title) */}
                <span
                  className={`text-xs font-mono mr-4! shrink-0 transition-colors ${
                    isActive
                      ? "text-violet-400"
                      : "text-neutral-600 group-hover:text-neutral-400"
                  }`}
                >
                  {lessonNumber}
                </span>

                {/* Lesson Title */}
                <span className="text-[14px] leading-snug">{lessonName}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
