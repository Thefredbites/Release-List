import { CTASection } from "./CTASection";
import { FeaturedMenuSection } from "./FeaturedMenuSection";
import { HeroSection } from "./HeroSection";
import { ProofSection } from "./ProofSection";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProofSection />
      <FeaturedMenuSection />
      <CTASection />
    </main>
  );
}
