import styles from "../styles/RevealPanel.module.css";

export default function EmptyState() {
  return (
    <div
      className={`${styles.revealArea} flex items-center justify-center opacity-50`}
    >
      <p className="text-neutral-500 text-lg">
        Click a node above to explore its details.
      </p>
    </div>
  );
}
