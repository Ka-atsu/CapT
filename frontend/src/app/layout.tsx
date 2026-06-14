// frontend/src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Stack CapT App",
  description: "React + Node + Postgres Connection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
