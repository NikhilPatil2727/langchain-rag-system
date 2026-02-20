import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "ScholarRAG — AI-Powered Research Intelligence",
  description:
    "Extract insights, synthesize knowledge, and find precisely what you need from complex research papers using advanced RAG technology.",
  keywords: "Research, RAG, AI, Academic Search, Scholars, Gemini, Pinecone, Semantic Search",
};

export const viewport = {
  themeColor: "#050507",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
