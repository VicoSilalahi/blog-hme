import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog HME Jimmyahhh",
  description: "Jimmyahhh blog bebas aja sih",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* bg-zinc-950: Very dark grey/black background
         text-zinc-300: Light grey text (easier on eyes than pure white)
         font-mono: Activates the system monospace font
      */}
      <body className="bg-zinc-950 text-zinc-300 font-mono antialiased">
        {children}
      </body>
    </html>
  );
}