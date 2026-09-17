import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Squared Away Trades | Tennessee Business and Law exam prep",
  description:
    "Practice questions for the Tennessee contractor Business and Law exam. Scroll a question at a time, with every answer pointing to the statute.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600&family=Public+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="top">
          <Link className="brand" href="/">
            <span className="mark" aria-hidden="true" />
            Squared Away Trades
          </Link>
          <nav className="nav" aria-label="Main">
            <Link href="/">Home</Link>
            <Link href="/study">Study feed</Link>
            <Link href="/exam">Mock exam</Link>
          </nav>
        </header>

        <div className="banner">
          Draft question bank — pending licensed reviewer sign-off. Not yet for exam-day reliance.
        </div>

        {children}

        <footer className="foot">
          <p style={{ maxWidth: "70ch" }}>
            Squared Away Trades is a study aid. It is not affiliated with, endorsed by, or
            connected to Prov, NASCLA, or the Tennessee Board for Licensing Contractors.
            Practice questions are original and are not actual exam questions. Using this
            site does not guarantee you will pass any exam or receive a license. Always
            verify against the current statute and the edition of the NASCLA guide your
            exam is tested against.
          </p>
        </footer>
      </body>
    </html>
  );
}
