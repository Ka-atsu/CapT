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
  description: string;
  realWorldAnalogy: string;
  usedByText: string;
  usedByCompany: string;
};

export type LessonStep = {
  label: string;
  subtitle: string;
  icon: IconType;
  markdownContent: string;
  codeSnippet?: string;
};

export type Lesson = {
  id: string; // Uniform string tracking
  title: string;
  briefing: Briefing;
  steps: LessonStep[];
  exercise: {
    type: "fill-blank" | "multiple-choice";
    prompt: string;
    options?: string[];
    answer: string | number;
  };
};