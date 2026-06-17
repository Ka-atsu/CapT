import { Lesson } from "@/lib/types";
import layout from "../styles/LessonLayout.module.css";

type Props = {
  lesson: Lesson;
};

export default function LessonHeader({ lesson }: Props) {
  return (
    <header className={layout.headerSection}>
      <h1 className="text-3xl lg:text-4xl font-black text-white">
        {lesson.title}
      </h1>

      {lesson.briefing && (
        <div className="flex justify-center gap-6 mt-2!">
          <p className="text-sm text-neutral-400 border border-neutral-800 px-4! py-2! rounded-full">
            Core Concept:
            <span className="ml-2! text-violet-400 font-bold">
              {lesson.briefing.coreConcept}
            </span>
          </p>

          <p className="text-sm text-neutral-400 border border-neutral-800 px-4! py-2! rounded-full">
            Impact:
            <span className="ml-2! text-emerald-400 font-bold">
              {lesson.briefing.latencyImpact}
            </span>
          </p>
        </div>
      )}

      <p className="text-xs uppercase tracking-widest text-neutral-500 mt-6">
        Select the icons to explore the architecture
      </p>
    </header>
  );
}
