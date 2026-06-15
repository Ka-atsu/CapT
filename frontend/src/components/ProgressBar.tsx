type Props = {
  value: number;
};

const progressMap: Record<number, string> = {
  0: "w-0",
  25: "w-1/4",
  50: "w-1/2",
  75: "w-3/4",
  100: "w-full",
};

export default function ProgressBar({ value }: Props) {
  const rounded = Math.round(value / 25) * 25;
  const widthClass = progressMap[rounded] ?? "w-0";

  return (
    <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
      <div
        className={`h-full bg-violet-500 rounded-full transition-all duration-300 ${widthClass}`}
      />
    </div>
  );
}
