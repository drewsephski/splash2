"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/atoms/button";
import BlobEffect from "@/components/molecules/blob-effect";
import { useRef } from "react";
import BoldOnHover from "@/components/ui/bold-on-hover";
import VariableFontCursorProximity from "@/fancy/components/text/variable-font-cursor-proximity";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-blue-500"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Web Dev</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Web Dev",
}: {
    title?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <BlobEffect />
            </div>
            
            <div className="absolute inset-0 pointer-events-none z-10">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-20 container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-4 tracking-tighter">
                        <BoldOnHover
                            text={title}
                            initialStyle="'wght' 400, 'slnt' 0"
                            hoverStyle="'wght' 900, 'slnt' -20"
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-blue-500 dark:from-neutral-300 dark:to-blue-400"
                        />
                    </h1>

                    <VariableFontCursorProximity
                        label="Crafting immersive digital experiences with a focus on modern web technologies and 3D interactive interfaces."
                        fromFontVariationSettings="'wght' 400, 'slnt' 0"
                        toFontVariationSettings="'wght' 900, 'slnt' -20"
                        containerRef={containerRef}
                        className="text-md md:text-xl text-white mb-8"
                    />  

                    <div
                        className="inline-block group relative p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-blue-950/95 dark:bg-black/50 group-hover:bg-gradient-to-br group-hover:from-gray-300 group-hover:to-blue-300"
                    >
                        <Button
                            variant="ghost"
                            className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md text-blue-500 dark:text-blue-500 duration-300 transition-colors group-hover:-translate-y-0.5 group-hover:text-blue-300 dark:group-hover:text-blue-400 hover:bg-gradient-to-br hover:from-gray-600 hover:to-blue-600"
                        >
                            <span className="font-extrabold">
                                Discover Excellence
                            </span>
                            <span
                                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 group-hover:text-white"
                            >
                                →
                            </span>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
