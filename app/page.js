import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Link href="/login">Get Started</Link>
    </main>
  );
}
