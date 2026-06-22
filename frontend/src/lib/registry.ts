// src/lib/registry.ts
import { csFundamentals } from "./csFundamentals";
import { advancedDataStructures } from "./advancedDataStructures";
import { systemArchitecture } from "./systemArchitecture";
import { advancedAlgorithms } from "./advancedAlgorithms";
import { lowLevelComputing } from "./lowLevelComputing";
import { softwareEngineering } from "./softwareEngineering";
import { Lesson } from "./types";

export type TrackDefinition = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessons: Lesson[];
};

export const courseCatalog: TrackDefinition[] = [
  {
    id: "cs-foundations",
    title: "Computer Science Foundations",
    description:
      "A robust introduction to software architecture. Learn Big-O complexity, variable memory layouts, and linear data structures.",
    category: "Computer Science",
    difficulty: "Beginner",
    lessons: csFundamentals,
  },
  {
    id: "advanced-data-structures",
    title: "Advanced Data Structures",
    description:
      "Master the architectures that map the real world. Learn Trees, Priority Queues, Enterprise Sorting Algorithms, and Graph Networks.",
    category: "Computer Science",
    difficulty: "Intermediate",
    lessons: advancedDataStructures,
  },
  {
    id: "system-architecture",
    title: "Systems & Advanced Architecture",
    description:
      "Move from single functions to entire systems. Learn Dynamic Programming, Concurrency, Hardware Caching, and Network Protocols.",
    category: "Computer Science",
    difficulty: "Advanced",
    lessons: systemArchitecture,
  },
  {
    id: "advanced-algorithms",
    title: "Math & Advanced Algorithms",
    description:
      "Bitwise logic, NP-Completeness, and mathematical combinatorics.",
    category: "Algorithms",
    difficulty: "Advanced",
    lessons: advancedAlgorithms,
  },
  {
    id: "low-level-computing",
    title: "Low-Level Computing",
    description:
      "Understand how the CPU actually reads 1s and 0s, Floating Points, and Endianness.",
    category: "Hardware",
    difficulty: "Advanced",
    lessons: lowLevelComputing,
  },
  {
    id: "software-engineering",
    title: "Software Engineering Practices",
    description:
      "Industry standards for writing testable code and structural design patterns.",
    category: "Architecture",
    difficulty: "Intermediate",
    lessons: softwareEngineering,
  },
];

export const curriculumRegistry: Record<string, Lesson[]> =
  courseCatalog.reduce(
    (acc, track) => {
      acc[track.id] = track.lessons;
      return acc;
    },
    {} as Record<string, Lesson[]>,
  );

export type TrackKey = keyof typeof curriculumRegistry;
