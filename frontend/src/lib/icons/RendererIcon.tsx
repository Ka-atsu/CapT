// src/lib/icons/RendererIcon.tsx

import { iconRegistry, IconType } from "./iconRegistry";

type Props = {
  type?: IconType;
  className?: string;
};

export default function IconRenderer({ type, className }: Props) {
  if (!type) return <div className={className} />;

  const Icon = iconRegistry[type];

  return <Icon className={className} />;
}
