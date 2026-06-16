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

// Define the shape of a single interactive component/step
export type LessonStep = {
  label: string;
  subtitle: string;
  markdownContent: string;
  imageUrl?: string;
  codeSnippet?: string;
  icon?: "user" | "network" | "bank" | "server" | "shield"; // NEW: Icon identifier for the interactive circles
};

// Define the introductory meta-data
export type Briefing = {
  coreConcept: string;
  latencyImpact: string;
  prerequisite: string;
};

// Define the final challenge
export type Exercise = {
  type: "multiple-choice" | "fill-blank";
  prompt: string;
  options?: string[];
  answer: number | string;
};

// The main Lesson object
export type Lesson = {
  id: number | string;
  title: string;
  briefing?: Briefing;
  steps: LessonStep[];
  exercise: Exercise;
};
