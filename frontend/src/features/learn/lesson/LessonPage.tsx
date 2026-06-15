"use client";

import { useState } from "react";
import { Lesson } from "@/lib/types";
import LessonSidebar from "./LessonSidebar";
import LessonContent from "./LessonContent";

const mockLessons: Lesson[] = [
  {
    id: 1,
    title: "What is a Data Structure?",
    content: `A data structure is a way of organizing and storing data so that it can be accessed and modified efficiently.\n\nDifferent data structures suit different kinds of problems. Choosing the right one is one of the most important decisions you'll make as a developer.`,
    exercise: {
      type: "multiple-choice",
      prompt: "What is the main purpose of a data structure?",
      options: [
        "To make code look more complex",
        "To organize and store data efficiently",
        "To replace databases",
        "To speed up your internet connection",
      ],
      answer: 1,
    },
  },
  {
    id: 2,
    title: "Arrays",
    content: `An array stores elements in contiguous memory locations. It allows O(1) access by index but O(n) insertion and deletion.\n\nBest used when: you know the size upfront and need fast random access.`,
    exercise: {
      type: "fill-blank",
      prompt:
        "An array has O(___) time complexity for accessing an element by index.",
      answer: "1",
    },
  },
  {
    id: 3,
    title: "Linked Lists",
    content: `A linked list is a sequence of nodes where each node points to the next. Insertion and deletion are O(1) if you have the pointer, but access is O(n).\n\nBest used when: you need frequent insertions/deletions and don't need random access.`,
    exercise: {
      type: "fill-blank",
      prompt:
        "Each node in a linked list contains data and a _____ to the next node.",
      answer: "pointer",
    },
  },
];

export default function LessonPage() {
  const [currentId, setCurrentId] = useState(mockLessons[0].id);

  const currentLesson = mockLessons.find((l) => l.id === currentId)!;
  const currentIndex = mockLessons.findIndex((l) => l.id === currentId);
  const progress = Math.round(((currentIndex + 1) / mockLessons.length) * 100);

  const handleNext = () => {
    const next = mockLessons[currentIndex + 1];
    if (next) setCurrentId(next.id);
  };

  return (
    <div className="flex h-[calc(100vh-56px)]">
      <LessonSidebar
        lessons={mockLessons}
        currentId={currentId}
        onSelect={setCurrentId}
        progress={progress}
      />
      <LessonContent
        lesson={currentLesson}
        onNext={handleNext}
        isLast={currentIndex === mockLessons.length - 1}
      />
    </div>
  );
}
