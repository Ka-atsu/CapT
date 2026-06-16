"use client";

import TopicCard from "./TopicCard";
import styles from "./Topic.module.css";
import { courseCatalog } from "@/lib/registry"; // <-- Import the new catalog!

export default function TopicPage() {
  return (
    <main className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <header className={styles.headerInfo}>
          <h1 className={styles.mainTitle}>Mastery Tracks</h1>
          <p className={styles.subtitle}>
            Select a specialized curriculum to begin. Each track utilizes
            interactive visual nodes to break down complex system architectures.
          </p>
        </header>

        <div className={styles.grid}>
          {/* Automatically generate a card for every track in our registry! */}
          {courseCatalog.map((track) => (
            <TopicCard
              key={track.id}
              topic={{
                id: track.id,
                title: track.title,
                description: track.description,
                category: track.category,
                lessonCount: track.lessons.length, // Automatically inferred!
                difficulty: track.difficulty,
                route: `/lesson?track=${track.id}`, // Automatically builds the correct URL!
              }}
            />
          ))}

          {/* Our Embedded Systems Ghost Card */}
          <div
            className={`${styles.card} opacity-40 cursor-not-allowed border-dashed`}
            style={{ pointerEvents: "none" }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.categoryTag}>Embedded Systems</span>
              <h2 className={styles.cardTitle}>
                Hardware-Software Integration
              </h2>
            </div>
            <p className={styles.cardDesc}>
              Learn to manage memory constraints, process real-time sensor data,
              and deploy edge-optimized predictive models.
            </p>
            <div className={styles.cardFooter}>
              <div className={styles.metaInfo}>
                <span className="text-neutral-500 font-bold tracking-widest uppercase text-xs">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
