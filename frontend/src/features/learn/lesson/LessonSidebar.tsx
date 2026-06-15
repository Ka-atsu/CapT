import ProgressBar from "@/components/ProgressBar";

type Lesson = {
  id: number;
  title: string;
};

type Props = {
  lessons: Lesson[];
  currentId: number;
  onSelect: (id: number) => void;
  progress: number;
};

export default function LessonSidebar({
  lessons,
  currentId,
  onSelect,
  progress,
}: Props) {
  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col p-4 gap-4 shrink-0">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-neutral-500 uppercase tracking-widest">
          Progress
        </p>
        <ProgressBar value={progress} />
      </div>
      <nav className="flex flex-col gap-1">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => onSelect(lesson.id)}
            className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
              lesson.id === currentId
                ? "bg-violet-700 text-white font-medium"
                : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            {lesson.title}
          </button>
        ))}
      </nav>
    </aside>
  );
}
