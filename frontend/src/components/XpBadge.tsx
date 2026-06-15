type Props = {
  xp: number;
};

export default function XpBadge({ xp }: Props) {
  return (
    <span className="text-xs font-semibold bg-violet-900 text-violet-300 px-2 py-1 rounded-full">
      ⚡ {xp} XP
    </span>
  );
}
