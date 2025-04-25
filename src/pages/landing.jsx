import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Statistics } from "@/components/landing/statistics";
import { Testimonials } from "@/components/landing/testimonials";
import { Team } from "@/components/landing/team";
import { Pricing } from "@/components/landing/pricing";
import { Cta } from "@/components/landing/cta";
import { Faq } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Statistics />
        <Testimonials />
        <Team />
        <Pricing />
        <Cta />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
