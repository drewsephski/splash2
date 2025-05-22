"use client"

import {
  createContext,
  useContext,
  useRef,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react"
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "motion/react"

import { cn } from "@/lib/utils"

interface StackingCardsProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  scrollOptons?: UseScrollOptions
  scaleMultiplier?: number
  totalCards: number
  translateYMultiplier?: number
}

interface StackingCardItemProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  index: number
  topPosition?: string
}

export default function StackingCards({
  children,
  className,
  scrollOptons,
  scaleMultiplier,
  totalCards,
  translateYMultiplier,
  ...props
}: StackingCardsProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    ...scrollOptons,
    target: targetRef,
  })

  return (
    <StackingCardsContext.Provider
      value={{ progress: scrollYProgress, scaleMultiplier: scaleMultiplier ?? 0.03, totalCards, translateYMultiplier: translateYMultiplier ?? 10 }}
    >
      <div className={cn(className)} ref={targetRef} {...props}>
        {children}
      </div>
    </StackingCardsContext.Provider>
  )
}

const StackingCardItem = ({
  index,
  topPosition,
  className,
  children,
  ...props
}: StackingCardItemProps) => {
  const {
    progress,
    scaleMultiplier: contextScaleMultiplier,
    totalCards: contextTotalCards,
    translateYMultiplier: contextTranslateYMultiplier,
  } = useStackingCardsContext() // Get from Context
  const scaleTo = 1 - (contextTotalCards - index) * (contextScaleMultiplier ?? 0.03)
  const rangeScale = [index * (1 / contextTotalCards), 1]
  const scale = useTransform(progress, rangeScale, [1, scaleTo])
  const top = topPosition ?? "0%"

  // Calculate vertical translation
  const translateYTo = (contextTotalCards - 1 - index) * (contextTranslateYMultiplier ?? 10);
  const rangeTranslateY = [index * (1 / contextTotalCards), 1];
  const translateY = useTransform(progress, rangeTranslateY, [0, -translateYTo]);

  // Calculate opacity
  const rangeOpacity = [index * (1 / contextTotalCards), index * (1 / contextTotalCards) + (1 / contextTotalCards) * 0.5];
  const opacity = useTransform(progress, rangeOpacity, [1, 0.5]);

  return (
    <div className={cn("h-full sticky top-0", className)} {...props}>
      <motion.div
        className={"origin-top relative h-full"}
        style={{ top, scale, translateY, opacity }}
      >
        {children}
      </motion.div>
    </div>
  )
}

const StackingCardsContext = createContext<{
  progress: MotionValue<number>
  scaleMultiplier: number
  totalCards: number
  translateYMultiplier: number
} | null>(null)

export const useStackingCardsContext = () => {
  const context = useContext(StackingCardsContext)
  if (!context)
    throw new Error("StackingCardItem must be used within StackingCards")
  return context
}

export { StackingCardItem }
