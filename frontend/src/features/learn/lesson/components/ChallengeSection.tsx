import { Lesson } from "@/lib/types";
import ExercisePanel from "../../exercise/ExercisePanel";
import styles from "../styles/ChallengeSection.module.css";

type Props = {
  lesson: Lesson;
  solved: boolean;
  isLast: boolean;
  onNext: () => void;
  onCorrect: () => void;
};

export default function ChallengeSection({
  lesson,
  solved,
  isLast,
  onNext,
  onCorrect,
}: Props) {
  return (
    <div className={styles.challengeContainer}>
      <ExercisePanel
        exercise={lesson.exercise}
        onCorrect={onCorrect}
        unlocked
      />

      {solved && (
        <div className="bg-emerald-900/20 border border-emerald-500/30 p-8! rounded-2xl">
          {!isLast ? (
            <button
              onClick={onNext}
              className="bg-emerald-600 px-8! py-3! rounded-xl"
            >
              Next Lesson →
            </button>
          ) : (
            <span>Track Complete 🎉</span>
          )}
        </div>
      )}
    </div>
  );
}
