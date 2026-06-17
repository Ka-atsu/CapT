import IconRenderer from "@/lib/icons/RendererIcon";
import styles from "../styles/InteractiveNodes.module.css";
import type { IconType } from "@/lib/icons/iconRegistry";

export type Step = {
  icon: IconType;
  subtitle: string;
};

type Props = {
  steps: Step[];
  selectedStepIndex: number | null;
  viewedSteps: ReadonlySet<number>;
  onSelect: (index: number) => void;
};

export default function InteractiveNodes({
  steps,
  selectedStepIndex,
  viewedSteps,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-12 my-8!">
      {steps.map((step, idx) => {
        const selected = selectedStepIndex === idx;
        const viewed = viewedSteps.has(idx);

        return (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            aria-pressed={selected}
            aria-label={step.subtitle}
            className={`
              relative
              w-48 h-48
              rounded-full
              flex flex-col
              items-center justify-center
              bg-[#1a273a]
              transition-all
              hover:-translate-y-1
              hover:bg-[#23354e]
              border-4 border-transparent
              cursor-pointer
              ${selected ? styles.nodeSelected : ""}
            `}
          >
            <IconRenderer type={step.icon} className="w-16 h-16" />

            <span className="mt-3 text-sm font-bold text-white text-center px-2">
              {step.subtitle}
            </span>

            {viewed && (
              <div className={styles.checkBadge}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 text-sky-500"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
