// src/lib/icons/iconRegistry.ts

import { ComponentType } from "react";

import UserIcon from "./UserIcon";
import BankIcon from "./BankIcon";
import ShieldIcon from "./ShieldIcon";
import NetworkIcon from "./NetworkIcon";
import ServerIcon from "./ServerIcon";

/**
 * Single source of truth:
 * keys here define both:
 * - allowed icon names (type system)
 * - registry mapping
 */
export const iconRegistry = {
  user: UserIcon,
  bank: BankIcon,
  shield: ShieldIcon,
  network: NetworkIcon,
  server: ServerIcon,
} satisfies Record<string, ComponentType<{ className?: string }>>;

/**
 * Derived union type from registry keys
 */
export type IconType = keyof typeof iconRegistry;
