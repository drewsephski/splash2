"use client"

import { useState, useCallback } from "react"
import { type AnimationOptions, motion, stagger, useAnimate } from "motion/react"

interface AnimatedTextProps {
  text: string
  initialStyle: string
  hoverStyle: string
  initialColor?: string
  hoverColor?: string
  animationConfig?: AnimationOptions
  staggerTiming?: number
  staggerOrigin?: "first" | "last" | "center" | number
  className?: string
  onClick?: () => void
}

const BoldOnHover = ({
  text,
  initialStyle = "'wght' 400, 'slnt' 0",
  hoverStyle = "'wght' 900, 'slnt' -10",
  initialColor = "inherit",
  hoverColor = "currentColor",
  animationConfig = {
    type: "spring",
    duration: 0.7,
  },
  staggerTiming = 0.03,
  staggerOrigin = "first",
  className,
  onClick,
  ...props
}: AnimatedTextProps) => {
  const [animationScope, animate] = useAnimate()
  const [isActive, setIsActive] = useState(false)

  const handleActivate = useCallback(() => {
    if (isActive) return
    setIsActive(true)

    animate(
      ".char",
      { fontVariationSettings: hoverStyle },
      {
        ...animationConfig,
        delay: stagger(staggerTiming, {
          from: staggerOrigin,
        }),
      }
    )
    animate(".char", { color: hoverColor }, { duration: 0.3 })
  }, [isActive, animate, hoverStyle, animationConfig, staggerTiming, staggerOrigin, hoverColor])

  const handleDeactivate = useCallback(() => {
    setIsActive(false)

    animate(
      ".char",
      { fontVariationSettings: initialStyle },
      {
        ...animationConfig,
        delay: stagger(staggerTiming, {
          from: staggerOrigin,
        }),
      }
    )
    animate(".char", { color: initialColor }, { duration: 0.3 })
  }, [animate, initialStyle, animationConfig, staggerTiming, staggerOrigin, initialColor])

  return (
    <motion.span
      className={`${className}`}
      onHoverStart={handleActivate}
      onHoverEnd={handleDeactivate}
      onClick={onClick}
      ref={animationScope}
      {...props}
    >
      <span className="sr-only">{text}</span>

      {text.split("").map((char: string, index: number) => (
        <motion.span
          key={`char-${index}-${char}`}
          className="inline-block whitespace-pre char"
          aria-hidden="true"
          style={{ color: initialColor }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default BoldOnHover