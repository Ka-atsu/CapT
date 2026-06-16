"use client";

import { useState, useEffect } from "react";
import styles from "./styles/ExercisePanel.module.css";

// Adjust this import based on where your types are
type Exercise = {
  type: "multiple-choice" | "fill-blank";
  prompt: string;
  options?: string[];
  answer: number | string;
};

type Props = {
  exercise: Exercise;
  onCorrect: () => void;
  unlocked: boolean;
};

export default function ExercisePanel({
  exercise,
  onCorrect,
  unlocked,
}: Props) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  // Reset state if the lesson changes
  useEffect(() => {
    setSelectedOption(null);
    setInputValue("");
    setError(false);
  }, [exercise]);

  if (!unlocked) return null;

  const handleSubmit = () => {
    if (exercise.type === "multiple-choice") {
      if (selectedOption === exercise.answer) {
        setError(false);
        onCorrect();
      } else {
        setError(true);
      }
    } else if (exercise.type === "fill-blank") {
      if (
        inputValue.toLowerCase().trim() ===
        (exercise.answer as string).toLowerCase().trim()
      ) {
        setError(false);
        onCorrect();
      } else {
        setError(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>Exercise</span>
        <h3 className={styles.prompt}>{exercise.prompt}</h3>
      </div>

      {/* Multiple Choice Layout */}
      {exercise.type === "multiple-choice" && exercise.options && (
        <div className={styles.optionsList}>
          {exercise.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedOption(idx);
                setError(false);
              }}
              className={`${styles.optionButton} ${
                selectedOption === idx ? styles.optionSelected : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Fill in the Blank Layout */}
      {exercise.type === "fill-blank" && (
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError(false);
            }}
            placeholder="Type your answer here..."
            className={styles.inputField}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
        </div>
      )}

      <div className={styles.submitWrapper}>
        <button
          onClick={handleSubmit}
          disabled={
            (exercise.type === "multiple-choice" && selectedOption === null) ||
            (exercise.type === "fill-blank" && inputValue.trim() === "")
          }
          className={styles.submitBtn}
        >
          Verify Answer
        </button>
        {error && (
          <span className={styles.errorMessage}>
            Incorrect. Review the trace above and try again.
          </span>
        )}
      </div>
    </div>
  );
}
