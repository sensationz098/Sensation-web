// app/layout.tsx

import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";
import Script from "next/script";

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
      <main className="flex-1 pt-28 px-4">{children}</main>
      <Footer />
      <Script
        id="razorpay-checkout"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
    </main>
  );
}
