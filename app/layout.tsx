import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Garden Design Questionnaire",
  description: "AI-powered garden design questionnaire to discover your perfect garden style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
