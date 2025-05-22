"use client";
import { motion } from "framer-motion";

import { useRef, type RefObject, type CSSProperties, useMemo } from "react";
import {
  useAnimationFrame
} from "motion/react"
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref";

// Helper type that makes all properties of CSSProperties accept number | string
type CSSPropertiesWithValues = {
  [K in keyof CSSProperties]: string | number;
};

interface StyleValue<T extends keyof CSSPropertiesWithValues> {
  from: CSSPropertiesWithValues[T];
  to: CSSPropertiesWithValues[T];
}

interface ProximityLetterProps {
  letter: string;
  containerRef: RefObject<HTMLElement | null>;
  styles?: Partial<{
    opacity: StyleValue<'opacity'>;
    scale: StyleValue<'scale'>;
    fontVariationSettings: StyleValue<'fontVariationSettings'>;
    transform: StyleValue<'transform'>;
    color: StyleValue<'color'>;
    // Add other supported style properties here
  }>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
}

export const ProximityLetter: React.FC<ProximityLetterProps> = ({
  letter,
  containerRef,
  styles = {}, // Provide a default empty object for styles
  radius = 50,
  falloff = "linear",
}) => {
  const letterRef = useRef<HTMLSpanElement>(null);
  const mousePositionRef = useMousePositionRef(containerRef);

  // Parse initial and hover styles
  const parsedStyles = useMemo(() => {
    const stylesArray: { property: keyof CSSPropertiesWithValues; fromValue: string | number; toValue: string | number }[] = [];

    if (styles?.opacity) {
      stylesArray.push({ property: 'opacity', fromValue: styles.opacity.from ?? 1, toValue: styles.opacity.to ?? 1 });
    }
    if (styles?.scale) {
       // Handle scale separately or combine into transform if transform style is not present
       // For now, let's just handle the scale property directly. If 'transform' is also present, 'transform' will override.
      stylesArray.push({ property: 'scale', fromValue: styles.scale.from ?? 1, toValue: styles.scale.to ?? 1 });
    }
    if (styles?.fontVariationSettings) {
      stylesArray.push({ property: 'fontVariationSettings', fromValue: styles.fontVariationSettings.from ?? '', toValue: styles.fontVariationSettings.to ?? '' });
    }
    if (styles?.transform) {
       stylesArray.push({ property: 'transform', fromValue: styles.transform.from ?? '', toValue: styles.transform.to ?? '' });
    }
     if (styles?.color) {
       stylesArray.push({ property: 'color', fromValue: styles.color.from ?? '', toValue: styles.color.to ?? '' });
    }

    return stylesArray;
  }, [styles]);

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  const calculateFalloff = (distance: number): number => {
    const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1);

    switch (falloff) {
      case "exponential":
        return normalizedDistance ** 2;
      case "gaussian":
        return Math.exp(-(normalizedDistance ** 2) / 2);
      default:
        return normalizedDistance;
    }
  };

  useAnimationFrame(() => {
    if (!containerRef.current || !letterRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const letterRect = letterRef.current.getBoundingClientRect();
    const letterCenterX = letterRect.left + letterRect.width / 2 - containerRect.left;
    const letterCenterY = letterRect.top + letterRect.height / 2 - containerRect.top;

    const distance = calculateDistance(
      mousePositionRef.current.x,
      mousePositionRef.current.y,
      letterCenterX,
      letterCenterY
    );

    if (distance >= radius) {
      // Reset to initial styles if outside radius
      for (const { property, fromValue } of parsedStyles) {
         if (letterRef.current) {
           switch (property) {
             case 'opacity':
               letterRef.current.style.opacity = fromValue.toString();
               break;
             case 'scale':
                letterRef.current.style.transform = `scale(${fromValue})`; // Apply scale as transform
               break;
             case 'fontVariationSettings':
               letterRef.current.style.fontVariationSettings = fromValue as string;
               break;
             case 'transform':
               letterRef.current.style.transform = fromValue as string;
               break;
              case 'color':
               letterRef.current.style.color = fromValue as string;
               break;
             // Add other properties here
           }
         }
      }
      return;
    }

    const newProximity = calculateFalloff(distance);

    // Apply interpolated styles directly to the element
    for (const { property, fromValue, toValue } of parsedStyles) {
      // Linear interpolation for simplicity. More complex interpolations could be added if needed.
      let interpolatedValue: string | number;

      if (typeof fromValue === 'number' && typeof toValue === 'number') {
           interpolatedValue = fromValue + (toValue - fromValue) * newProximity;
      } else if (typeof fromValue === 'string' && typeof toValue === 'string') {
          // Simple string interpolation might not be meaningful for all CSS properties
          // For properties like 'color', a more specific color interpolation might be needed.
          // For 'transform' strings, a more complex parser/interpolator would be required.
          // For this basic implementation, we'll just use the 'to' value when proximity is 1, and 'from' when 0.
          // A more robust solution would involve parsing transform strings or using a library.

          // Basic interpolation for strings (e.g., fontVariationSettings)
           if (newProximity > 0.5) {
               interpolatedValue = toValue;
           } else {
               interpolatedValue = fromValue;
           }
           // Note: This basic string interpolation is not accurate for all properties like complex transforms or colors.
           // For color interpolation, a dedicated library or function would be needed.

           if (property === 'transform') {
               // This basic interpolation for transform strings is unlikely to work correctly.
               // A dedicated transform string parser and interpolator is needed for accurate animation.
               // For now, if transform is a string, we'll just toggle between from/to based on proximity threshold.
               if (newProximity > 0.5) {
                   interpolatedValue = toValue;
               } else {
                   interpolatedValue = fromValue;
               }
           } else if (property === 'color') {
               // Basic color interpolation placeholder - requires a dedicated function
                if (newProximity > 0.5) {
                   interpolatedValue = toValue;
               } else {
                   interpolatedValue = fromValue;
               }
           }

      } else {
           // Handle cases where types are mixed or unexpected
           interpolatedValue = fromValue; // Default to fromValue or handle error
      }


      if (letterRef.current) {
        switch (property) {
          case 'opacity':
            letterRef.current.style.opacity = interpolatedValue.toString();
            break;
          case 'scale':
             letterRef.current.style.transform = `scale(${interpolatedValue})`; // Apply interpolated scale as transform
            break;
          case 'fontVariationSettings':
            letterRef.current.style.fontVariationSettings = interpolatedValue as string;
            break;
          case 'transform':
             letterRef.current.style.transform = interpolatedValue as string; // Apply interpolated transform string directly
            break;
           case 'color':
            letterRef.current.style.color = interpolatedValue as string; // Apply interpolated color string directly
            break;
          // Add other properties here
        }
      }
    }
  });

  return (
    <motion.span
      ref={letterRef}
      className="inline-block" // Maintain inline-block for correct layout
    >
      {letter}
    </motion.span>
  );
}; 