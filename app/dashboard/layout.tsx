import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Sora } from "next/font/google";
import Sidebar from "../components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
});


export const metadata: Metadata = {
  title: "OutFit Library",
  description: "Tell us the event. We style you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#FAF9FF] lg:flex">
          <Sidebar />

          <main className="min-w-0 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
