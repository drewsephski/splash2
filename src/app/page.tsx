"use client"

import { BackgroundPaths } from "@/components/ui/background-paths";
// import { TextHoverEffect } from "@/components/ui/text-hover-effect"; // Removed unused import
import ElasticLine from "@/components/ui/elastic-line";
import StackingCardsDemo from "@/components/sections/StackingCardsDemo";
// Import the new RippleCursor
import RippleCursor from "@/components/ui/ripple-cursor";

export default function Home() {
  return (
    <div>
      {/* Add the new RippleCursor */}
      <RippleCursor />
      <BackgroundPaths />
      <StackingCardsDemo />
      <ElasticLine />
      {/* <TextHoverEffect text="DREW" /> */}
    </div>
  );
}
