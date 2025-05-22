"use client"

import { forwardRef, type HTMLAttributes, type RefObject, type CSSProperties } from "react"

import { ProximityLetter } from "@/fancy/components/text/proximity-letter"

// Helper type that makes all properties of CSSProperties accept number | string
type CSSPropertiesWithValues = {
  [K in keyof CSSProperties]: string | number
}

interface StyleValue<T extends keyof CSSPropertiesWithValues> {
  from: CSSPropertiesWithValues[T]
  to: CSSPropertiesWithValues[T]
}

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  label: string
  styles?: Partial<{
    opacity: StyleValue<'opacity'>
    scale: StyleValue<'scale'>
    fontVariationSettings: StyleValue<'fontVariationSettings'>
    // Add other supported style properties here
  }>
  containerRef: RefObject<HTMLElement | null>
  radius?: number
  falloff?: "linear" | "exponential" | "gaussian"
}

const TextCursorProximity = forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      label,
      styles = {},
      containerRef,
      radius = 50,
      falloff = "linear",
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const words = label.split(" ")
    let letterGlobalIndex = 0

    return (
      <span
        ref={ref}
        className={`${className} inline hover:text-blue-100`}
        onClick={onClick}
        {...props}
      >
        {words.map((word, wordIndex) => (
          <span
            key={`word-${wordIndex}-${word}`}
            className="inline-block whitespace-nowrap"
            aria-hidden={true}
          >
            {word.split("").map((letter) => {
              const currentLetterGlobalIndex = letterGlobalIndex++
              return (
                letter === " " ? (
                  <span key={`space-${currentLetterGlobalIndex}`} className="inline-block">&nbsp;</span>
                ) : (
                  <ProximityLetter
                    key={`letter-${currentLetterGlobalIndex}`}
                    letter={letter}
                    containerRef={containerRef}
                    styles={styles}
                    radius={radius}
                    falloff={falloff}
                  />
                )
              )
            })}
            {wordIndex < words.length - 1 && (
              <span key={`space-${wordIndex}-${words.length}`} className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    )
  }
)

TextCursorProximity.displayName = "TextCursorProximity"
export default TextCursorProximity
