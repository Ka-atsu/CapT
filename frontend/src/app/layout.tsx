import Navbar from "../components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* h-screen locks the body to the window size, flex-col stacks children vertically */}
      <body className="bg-[#0B0B0C] text-white h-screen flex flex-col antialiased">
        {/* The Navbar sits at the top and takes up its natural height */}
        <Navbar xp={120} />

        {/* flex-1 takes up ALL remaining space under the Nav. overflow-y-auto makes THIS the scrollable area. */}
        <div className="flex-1 w-full overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </body>
    </html>
  );
}
