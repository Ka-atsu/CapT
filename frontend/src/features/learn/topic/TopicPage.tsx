"use client";

import TopicCard, { TopicData } from "./TopicCard";
import styles from "./Topic.module.css";
import { mockLessons } from "@/lib/mockLessons";

export default function TopicPage() {
  // We define the Track as a whole, rather than mapping every individual lesson.
  const developmentWorkflowTrack: TopicData = {
    id: "track-01",
    title: "The Production Development Workflow",
    description:
      "Master CI/CD, Git automation, branching workflows, and continuous integration. Learn how professional teams manage, track, and automate code without breaking things.",
    category: "DevOps & Tooling",
    // We dynamically count the lessons so it accurately says "3 Modules"
    lessonCount: mockLessons.length,
    difficulty: "Intermediate",
    route: "/lesson",
  };

  return (
    <main className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <header className={styles.headerInfo}>
          <h1 className={styles.mainTitle}>Mastery Tracks</h1>
          <p className={styles.subtitle}>
            Select a specialized curriculum to begin. Each track utilizes
            interactive execution traces to simulate production failure states.
          </p>
        </header>

        {/* The Grid now holds our main track, plus any future tracks we add */}
        <div className={styles.grid}>
          {/* Our active, clickable track */}
          <TopicCard topic={developmentWorkflowTrack} />

          {/* Optional: A "Coming Soon" ghost card just to make the grid look nice! */}
          <div
            className={`${styles.card} opacity-40 cursor-not-allowed border-dashed`}
            style={{ pointerEvents: "none" }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.categoryTag}>Cloud Infrastructure</span>
              <h2 className={styles.cardTitle}>Containerization & Parity</h2>
            </div>
            <p className={styles.cardDesc}>
              Learn to build, orchestrate, and deploy immutable Docker
              containers across local and production environments.
            </p>
            <div className={styles.cardFooter}>
              <div className={styles.metaInfo}>
                <span className="text-neutral-600">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
