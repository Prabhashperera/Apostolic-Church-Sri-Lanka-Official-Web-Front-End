import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import GivingWidget from '../components/GivingWidget';
import BioSection from '../components/BioSection';
import FeatureCardsSection from '../components/FeatureCardsSection';
import CredentialsSection from '../components/CredentialsSection';
import WorshipShowcase from '../components/WorshipShowcase';
import ServiceTimesSection from '../components/ServiceTimesSection';
import ResourcesApps from '../components/ResourcesApps';
import LionSection from '../components/LionSection';
import PillarsCarousel from '../components/PillarsCarousel';
import { worshipTagline, prophetPortrait } from '../data/HomeData';

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />

      <div className="px-4 py-6 mx-auto space-y-12 md:space-y-16 md:px-8 md:py-10 max-w-7xl">
        <HeroSlider />
        <GivingWidget />
        <BioSection />
        <FeatureCardsSection />
        <CredentialsSection />
        <WorshipShowcase tagline={worshipTagline} photo={prophetPortrait} />
        <ServiceTimesSection />
        <ResourcesApps />
        <LionSection />
        <PillarsCarousel />
      </div>
    </div>
  );
}