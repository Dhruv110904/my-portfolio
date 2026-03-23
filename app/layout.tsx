import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import TerminalOverlay from "@/components/TerminalOverlay";
import Providers from "@/components/Providers";
import BootSequence from "@/components/BootSequence";
import NetworkStatsWidget from "@/components/NetworkStatsWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Dhruv Jain | Full-Stack Developer",
  description: "Senior-level portfolio of Dhruv Jain, a Full-Stack Developer building scalable web apps with modern tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="bg-[#050a0f] text-[#00ff41] antialiased relative min-h-screen transition-colors duration-300 opacity-90">
        <Providers>
          <BootSequence />
          <ScrollProgress />
          <TerminalOverlay />
          <NetworkStatsWidget />

          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
