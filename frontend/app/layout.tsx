import type { Metadata } from "next";
import "./globals.css";
import StarfieldBackground from "./components/StarfieldBackground";

export const metadata: Metadata = {
  title: "Jack -- 3D Creator",
  description: "3D Creator Portfolio - Jack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap"
          rel="preload"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-clip relative" style={{ fontFamily: "'Kanit', sans-serif" }}>
        <StarfieldBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
