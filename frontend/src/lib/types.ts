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

export type Lesson = {
  id: number;
  title: string;
  content: string;
  exercise: Exercise;
};
