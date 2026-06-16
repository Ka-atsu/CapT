"use client";

import { useRouter } from "next/navigation";
import styles from "./Topic.module.css";

// You can move this type to your @/lib/types file later
export type TopicData = {
  id: string;
  title: string;
  description: string;
  category: string;
  lessonCount: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  route: string; // The URL to send the user to
};

type Props = {
  topic: TopicData;
};

export default function TopicCard({ topic }: Props) {
  const router = useRouter();

  return (
    <div className={styles.card} onClick={() => router.push(topic.route)}>
      <div className={styles.cardHeader}>
        <span className={styles.categoryTag}>{topic.category}</span>
        <h2 className={styles.cardTitle}>{topic.title}</h2>
      </div>

      <p className={styles.cardDesc}>{topic.description}</p>

      <div className={styles.cardFooter}>
        <div className={styles.metaInfo}>
          <span>{topic.lessonCount} Modules</span>
          <span>•</span>
          <span>{topic.difficulty}</span>
        </div>
        <div className={styles.actionBtn}>
          Enter Track <span>→</span>
        </div>
      </div>
    </div>
  );
}
