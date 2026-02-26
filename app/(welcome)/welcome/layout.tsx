// app/layout.tsx

import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="flex-1 pt-28 px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
