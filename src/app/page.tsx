"use client"

import { BackgroundPaths } from "@/components/ui/background-paths";
// import { TextHoverEffect } from "@/components/molecules/text-hover-effect"; // Removed unused import
import ElasticLine from "@/components/molecules/elastic-line";
import StackingCardsDemo from "@/components/organisms/stacking-cards-demo";
// Import the new RippleCursor
import RippleCursor from "@/components/ui/effects/ripple-cursor";
// Import the AboutSection component
import AboutSection from "@/components/organisms/about-section";
// Import the new SpotlightCardsSection component
import SpotlightCardsSection from "@/components/organisms/spotlight-cards-section";
import Navbar from "@/components/layout/Navbar"; // Import the Navbar component
// Import the new TextBalloonsDemo component
// import { TextBalloonsDemo } from "@/components/organisms/text-balloons-demo";
// Import the ContactForm component
// import ContactForm from "@/components/organisms/contact-form";

// Import the new futuristic hero component
import Html from "@/components/organisms/hero-futuristic";
// import { Button } from "@/components/atoms/button";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Global/Background elements */}
      <RippleCursor />

      {/* Navbar */}
      <Navbar />

      {/* Main content sections */}
      <section id="hero" className="py-12 px-4 sm:px-6 lg:px-8">
        <BackgroundPaths />
        <ElasticLine /> 
      </section>

      <section id="skills" className="py-12 px-4 sm:px-6 lg:px-8">
        <SpotlightCardsSection />
      </section>

      {/* Assuming StackingCardsDemo is for projects */}
      <section id="projects" className="py-12 px-4 sm:px-6 lg:px-8">
        <StackingCardsDemo />
      </section>

      <section id="about" className="py-12 px-4 sm:px-6 lg:px-8">
        <AboutSection />
      </section>

      {/* Replace contact section with the new futuristic hero component */}
      <section id="hero-futuristic" className="h-screen py-12 px-4 sm:px-6 lg:px-8">
        <Html />
      </section>
    </div>
  );
}
