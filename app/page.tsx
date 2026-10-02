import Benefits from "@/components/landing/Benefits";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Simulator from "@/components/landing/Simulator";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <Problem />
        <Simulator />
        <Benefits />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
