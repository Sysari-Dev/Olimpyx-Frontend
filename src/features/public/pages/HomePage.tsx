import { FeaturesSection } from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";

export const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] text-dark font-sans antialiased pb-20 animate-in fade-in duration-500">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;