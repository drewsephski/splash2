"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import StackingCards, {
  StackingCardItem,
} from "@/components/organisms/stacking-cards"
import VariableFontCursorProximity from "@/fancy/components/text/variable-font-cursor-proximity"
import {
  SiNextdotjs,
  SiTailwindcss,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiPython,
  SiDjango,
  SiFlask,
  SiSocket,
} from "@icons-pack/react-simple-icons";
import { TextHoverEffect } from "../molecules/text-hover-effect"

const cards = [
  {
    bgColor: "bg-blue-800",
    title: "Project 1: Interactive Portfolio",
    description:
      "Built a dynamic personal portfolio site using Next.js and Tailwind CSS, featuring interactive components like the elastic line and stacking cards.",
    technologies: ["SiNextdotjs", "SiTailwindcss", "SiReact"],
  },
  {
    bgColor: "bg-blue-700",
    title: "Project 2: E-commerce Platform",
    description:
      "Developed a full-stack e-commerce platform with user authentication, product management, shopping cart functionality, and payment integration.",
    technologies: ["SiReact", "SiNodedotjs", "SiExpress", "SiMongodb", "SiPostgresql"],
  },
  {
    bgColor: "bg-blue-600",
    title: "Project 3: Real-time Chat Application",
    description:
      "Created a real-time chat application using WebSockets and Node.js, allowing users to join rooms and exchange messages instantly.",
    technologies: ["SiNodedotjs", "SiSocket"],
  },
  {
    bgColor: "bg-blue-500",
    title: "Project 4: Task Management App",
    description:
      "Designed and implemented a task management application with features for creating, organizing, and tracking tasks, utilizing a RESTful API and a modern frontend framework.",
    technologies: ["SiReact", "SiMongodb"],
  },
  {
    bgColor: "bg-blue-400",
    title: "Project 5: Blog Platform",
    description:
      "Developed a content-managed blog platform with markdown support, tagging, and category features, built with a server-side rendering framework for performance and SEO.",
    technologies: ["SiNextdotjs", "SiReact", "SiMongodb"],
  },
]

export default function StackingCardsDemo() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  // Function to render icons based on names
  const renderIcons = (techNames: string[]): React.JSX.Element[] => {
    const iconMap: { [key: string]: React.JSX.Element } = {
      SiNextdotjs: <SiNextdotjs title="Next.js" color="#00f" />,
      SiTailwindcss: <SiTailwindcss title="Tailwind CSS" color="#06B6D4" />,
      SiReact: <SiReact title="React" color="#61DAFB" />,
      SiNodedotjs: <SiNodedotjs title="Node.js" color="#339933" />,
      SiMongodb: <SiMongodb title="MongoDB" color="#47A248" />,
      SiPostgresql: <SiPostgresql title="PostgreSQL" color="#09f" />,
      SiGraphql: <SiGraphql title="GraphQL" color="#E10098" />,
      SiPython: <SiPython title="Python" color="#3776AB" />,
      SiDjango: <SiDjango title="Django" color="#092E20" />,
      SiFlask: <SiFlask title="Flask" color="#000000" />,
      SiSocket: <SiSocket title="WebSockets" color="#010101" />,
    };

    return techNames.map((name) => (
      <div key={name} className="flex flex-col items-center p-1">
        {iconMap[name]}
        <span className="text-xs mt-1">{iconMap[name]?.props.title}</span>
      </div>
    ));
  };

  return (
    <div
      className="h-[620px] bg-dark-gradient overflow-auto text-white scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-900"
      ref={(node) => setContainer(node)}
    >
      <StackingCards
        totalCards={cards.length}
        scaleMultiplier={0.8}
        translateYMultiplier={20}
        scrollOptons={{ container: { current: container } }}
      >
        <div className="relative font-calendas h-[620px] w-full z-10 text-2xl md:text-7xl font-bold uppercase flex justify-center items-center text-white whitespace-pre">
          <VariableFontCursorProximity
            label="My Projects ↓"
            fromFontVariationSettings="'wght' 500"
            toFontVariationSettings="'wght' 900"
            containerRef={{ current: container }}
            className="text-white"
          />
        </div>
        {cards.map(({ bgColor, description, title, technologies }, index) => {
          return (
            <StackingCardItem key={title} index={index} className="h-[620px]">
              <div
                className={cn(
                  bgColor,
                  "p-6 rounded-lg shadow-lg h-full w-full flex flex-col justify-center items-center text-center text-white"
                )}
              >
                <VariableFontCursorProximity
                  label={title}
                  fromFontVariationSettings="'wght' 700"
                  toFontVariationSettings="'wght' 900"
                  containerRef={{ current: container }}
                  className="font-bold text-2xl mb-4 text-white"
                />
                <VariableFontCursorProximity
                  label={description}
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 600"
                  containerRef={{ current: container }}
                  className="max-w-prose mb-4 text-neutral-300"
                />
                 <div className="flex flex-wrap justify-center gap-4 text-2xl">
                  {renderIcons(technologies)}
                </div>
              </div>
            </StackingCardItem>
          )
        })}
        <div className="w-full h-80 relative overflow-hidden flex justify-center items-center pt-20">
          <TextHoverEffect text="DREW" className="sm:text-[192px] text-[80px] text-white font-calendas" />
        </div>
      </StackingCards>
    </div>
  )
}
