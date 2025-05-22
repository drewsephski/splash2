"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import StackingCards, {
  StackingCardItem,
} from "@/components/ui/stacking-cards"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"

const cards = [
  {
    bgColor: "bg-blue-800",
    title: "Project 1: Interactive Portfolio",
    description:
      "Built a dynamic personal portfolio site using Next.js and Tailwind CSS, featuring interactive components like the elastic line and stacking cards.",
  },
  {
    bgColor: "bg-blue-700",
    title: "Project 2: E-commerce Platform",
    description:
      "Developed a full-stack e-commerce platform with user authentication, product management, shopping cart functionality, and payment integration.",
  },
  {
    bgColor: "bg-blue-600",
    title: "Project 3: Real-time Chat Application",
    description:
      "Created a real-time chat application using WebSockets and Node.js, allowing users to join rooms and exchange messages instantly.",
  },
  {
    bgColor: "bg-blue-500",
    title: "Project 4: Task Management App",
    description:
      "Designed and implemented a task management application with features for creating, organizing, and tracking tasks, utilizing a RESTful API and a modern frontend framework.",
  },
  {
    bgColor: "bg-blue-400",
    title: "Project 5: Blog Platform",
    description:
      "Developed a content-managed blog platform with markdown support, tagging, and category features, built with a server-side rendering framework for performance and SEO.",
  },
]

export default function StackingCardsDemo() {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  return (
    <div
      className="h-[800px] bg-dark-gradient overflow-auto text-white"
      ref={(node) => setContainer(node)}
    >
      <StackingCards
        totalCards={cards.length}
        scrollOptons={{ container: { current: container } }}
      >
        <div className="relative font-calendas h-[620px] w-full z-10 text-2xl md:text-7xl font-bold uppercase flex justify-center items-center text-white whitespace-pre">
          My Projects ↓
        </div>
        {cards.map(({ bgColor, description, title }, index) => {
          return (
            <StackingCardItem key={title} index={index} className="h-[620px]">
              <div
                className={cn(
                  bgColor,
                  "p-6 rounded-lg shadow-lg h-full w-full flex flex-col justify-center items-center text-center text-white"
                )}
              >
                <h3 className="font-bold text-2xl mb-4">{title}</h3>
                <p className="max-w-prose">{description}</p>
              </div>
            </StackingCardItem>
          )
        })}

        <div className="w-full h-80 relative overflow-hidden flex justify-center items-center pt-20">
          <TextHoverEffect
            text="Portfolio Showcase"
            className="sm:text-[192px] text-[80px] text-white font-calendas"
          />
        </div>
      </StackingCards>
    </div>
  )
} 