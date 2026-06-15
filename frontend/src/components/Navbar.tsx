import XpBadge from "./XpBadge";

type Props = {
  xp: number;
};

export default function Navbar({ xp }: Props) {
  return (
    <nav className="w-full h-14 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-6">
      <span className="text-white font-bold tracking-tight">cs.learn</span>
      <XpBadge xp={xp} />
    </nav>
  );
}
