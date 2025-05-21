import { useState, useEffect } from "react"
import { useMousePosition } from "@/components/hooks/use-mouse-position"
import { useDimensions } from "@/components/hooks/use-debounced-dimensions"

interface ElasticLineEvents {
  isGrabbed: boolean
  controlPoint: { x: number; y: number }
}

export function useElasticLineEvents(
  containerRef: React.RefObject<SVGSVGElement>,
  isVertical: boolean,
  grabThreshold: number,
  releaseThreshold: number,
): ElasticLineEvents {
  const { x, y } = useMousePosition(containerRef)
  const dimensions = useDimensions(containerRef)
  const [isGrabbed, setIsGrabbed] = useState(false)
  const [controlPoint, setControlPoint] = useState({
    x: dimensions.width / 2,
    y: dimensions.height / 2,
  })

  useEffect(() => {
    if (!containerRef.current) return

    const { width, height } = dimensions

    // Check if mouse is outside container bounds
    const isOutsideBounds = x < 0 || x > width || y < 0 || y > height

    if (isOutsideBounds) {
      setIsGrabbed(false)
      return
    }

    let distance: number
    let newControlPoint: { x: number; y: number }

    if (isVertical) {
      const midX = width / 2
      distance = Math.abs(x - midX)
      newControlPoint = {
        x: midX + 2.2 * (x - midX),
        y: y,
      }
    } else {
      const midY = height / 2
      distance = Math.abs(y - midY)
      newControlPoint = {
        x: x,
        y: midY + 2.2 * (y - midY),
      }
    }

    setControlPoint(newControlPoint)

    if (!isGrabbed && distance < grabThreshold) {
      setIsGrabbed(true)
    } else if (isGrabbed && distance > releaseThreshold) {
      setIsGrabbed(false)
    }
  }, [x, y, isVertical, isGrabbed, grabThreshold, releaseThreshold, dimensions, containerRef])

  return { isGrabbed, controlPoint }
}