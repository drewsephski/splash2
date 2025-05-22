import { useDimensions } from "@/hooks/use-dimensions";
import { useElasticLineEvents } from "@/hooks/use-elastic-line-events";
import { useRef, useEffect } from "react";

export function ElasticLine() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { width, height } = useDimensions(containerRef);
    const { controlPoint } = useElasticLineEvents(containerRef, false, 50, 100);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (context && width && height) {
            canvas.width = width;
            canvas.height = height;

            // Clear canvas
            context.clearRect(0, 0, width, height);

            // Draw the elastic line
            context.beginPath();
            context.moveTo(width / 2, 0); // Start at the top center
            context.quadraticCurveTo(
                controlPoint.x,
                controlPoint.y,
                width / 2,
                height // End at the bottom center
            );
            context.strokeStyle = "currentColor"; // Use Tailwind's current color
            context.lineWidth = 2;
            context.stroke();
        }
    }, [width, height, controlPoint]);

    return (
        <div ref={containerRef} className="relative w-full h-full pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full" />    
        </div>
    );
}

