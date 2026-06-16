// src/lib/registry.ts
import { csFundamentals } from "./csFundamentals";
import { fullStackEngineering } from "./fullStackEngineering";
import { Lesson } from "./types";

// 1. Define what a Track looks like in our master catalog
export type TrackDefinition = {
  id: string; // This will be used for the URL parameter!
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessons: Lesson[]; // The actual curriculum array
};

// 2. Build the Master Catalog
export const courseCatalog: TrackDefinition[] = [
  {
    id: "cs-foundations",
    title: "Computer Science Foundations",
    description:
      "A robust introduction to software architecture. Learn variable lifecycles, performance bounds, network interoperability, and programming paradigms.",
    category: "Computer Science",
    difficulty: "Beginner",
    lessons: csFundamentals,
  },
  {
    id: "full-stack-engineering",
    title: "Full-Stack Systems Engineering",
    description:
      "Master component-driven UI architecture, backend routing runtimes, persistent database modeling, and enterprise deployment workflows.",
    category: "Software Engineering",
    difficulty: "Intermediate",
    lessons: fullStackEngineering,
  },
];

// 3. Keep the simple registry object so our LessonPage doesn't break!
// This automatically maps {"cs-foundations": csFundamentals, ...} behind the scenes.
export const curriculumRegistry: Record<string, Lesson[]> =
  courseCatalog.reduce(
    (acc, track) => {
      acc[track.id] = track.lessons;
      return acc;
    },
    {} as Record<string, Lesson[]>,
  );

export type TrackKey = keyof typeof curriculumRegistry;
