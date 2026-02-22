import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navigation/Navbar";

export const metadata = {
  title: "Aakash Rajbhar | Portfolio",
  description: "Full Stack Engineer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class">
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
