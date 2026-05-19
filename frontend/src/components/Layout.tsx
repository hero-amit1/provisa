import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  useScrollReveal({ animation: "fade-in-up", threshold: 0.15 });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 data-scroll-reveal animation-delay-200 [&>*]:data-scroll-reveal [&_[data-scroll-reveal]]:animate-slide-up">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
