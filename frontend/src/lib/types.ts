import type { IconType } from "@/lib/icons/iconRegistry";

export type MultipleChoiceExercise = {
  type: "multiple-choice";
  prompt: string;
  options: string[];
  answer: number;
};

export type FillBlankExercise = {
  type: "fill-blank";
  prompt: string;
  answer: string;
};

export type Exercise = MultipleChoiceExercise | FillBlankExercise;

export type Briefing = {
  coreConcept: string;
  latencyImpact: string;
  prerequisite: string;
};

export type LessonStep = {
  label: string;
  subtitle: string;
  markdownContent: string;
  imageUrl?: string;
  codeSnippet?: string;
  icon?: IconType;
};

export type Lesson = {
  id: number | string;
  title: string;
  briefing?: Briefing;
  steps: LessonStep[];
  exercise: Exercise;
};
