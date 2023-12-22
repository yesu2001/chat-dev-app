import "../globals.css";
import Header from "@/components/profile/Header";

export const metadata = {
  title: "Profile",
  description: "Profile Page for authentication app",
};

export default function ProfileLayout({ children }) {
  return (
    <main className="flex flex-col min-h-screen w-full space-y-8 ">
      <Header />
      {children}
    </main>
  );
}
