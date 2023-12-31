import "./globals.css";
import AuthProvider from "@/context/AuthProvider";

export const metadata = {
  title: "Authentication App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
