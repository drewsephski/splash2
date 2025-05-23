import {
  useRef,
  useState,
  useContext,
  createContext,
  type MouseEvent as ReactMouseEvent,
} from 'react';

import { cn } from '@/lib/utils';

interface MousePosition {
  x: number | null;
  y: number | null;
}

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  ProximitySpotlight?: boolean;
  HoverFocusSpotlight?: boolean;
  CursorFlowGradient?: boolean;
}
interface SpotlightItemProps {
  children: React.ReactNode;
  className?: string;
}

interface SpotLightContextType {
  ProximitySpotlight: boolean;
  HoverFocusSpotlight: boolean;
  CursorFlowGradient: boolean;
}

const SpotLightContext = createContext<SpotLightContextType | undefined>(
  undefined
);
export const useSpotlight = () => {
  const context = useContext(SpotLightContext);
  if (!context) {
    throw new Error('useSpotlight must be used within a SpotlightProvider');
  }
  return context;
};
export const Spotlight = ({
  children,
  className,
  ProximitySpotlight = true,
  HoverFocusSpotlight = false,
  CursorFlowGradient = true,
}: SpotlightProps) => {
  return (
    <SpotLightContext.Provider
      value={{
        ProximitySpotlight,
        HoverFocusSpotlight,
        CursorFlowGradient,
      }}
    >
      <div
        className={cn(
          className,
          'group relative z-10 rounded-md  grid grid-cols-4 gap-2 '
        )}
      >
        {children}
      </div>
    </SpotLightContext.Provider>
  );
};
export function SpotLightItem({ children, className }: SpotlightItemProps) {
  const { HoverFocusSpotlight, ProximitySpotlight, CursorFlowGradient } =
    useSpotlight();
  const boxWrapper = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  });

  const [overlayColor, setOverlayColor] = useState({ x: 0, y: 0 });

  const handleMouseMove = (ev: ReactMouseEvent<HTMLDivElement>) => {
    if (boxWrapper.current) {
      const { left, top } = boxWrapper.current.getBoundingClientRect();
      const x = ev.clientX - left;
      const y = ev.clientY - top;
      setMousePosition({ x, y });
      setOverlayColor({ x, y });
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => CursorFlowGradient && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={boxWrapper}
      className={cn(
        className,
        ' relative rounded-lg justify-center items-center p-[2px] bg-[#ffffff15] overflow-hidden'
      )}
    >
      {isHovered && (
        <div
          className='pointer-events-none absolute opacity-0 z-50 rounded-xl w-full h-full group-hover:opacity-100  transition duration-300 '
          style={{
            background: `
            radial-gradient(
              250px circle at ${overlayColor.x}px ${overlayColor.y}px,
              rgba(255, 255, 255, 0.137),
              transparent 80%
            )
          `,
          }}
        />
      )}
      {HoverFocusSpotlight && mousePosition.x !== null && mousePosition.y !== null && (
        <div
          className='absolute opacity-0 group-hover:opacity-100 z-10 inset-0 bg-fixed rounded-lg'
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #ffffff76 0%,transparent 20%,transparent) fixed `,
          }}
        />
      )}
      {ProximitySpotlight && mousePosition.x !== null && mousePosition.y !== null && (
        <div
          className='absolute inset-0 z-0  bg-fixed rounded-lg'
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #ffffff6e 0%,transparent 20%,transparent) fixed`,
          }}
        />
      )}
      {children}
    </div>
  );
}

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SpotlightCard({
  children,
  className = '',
}: SpotlightCardProps) {
  return (
    <div
      className={`relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40 before:bg-slate-400 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:group-hover:opacity-100 before:z-10 before:blur-[100px] after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 after:bg-indigo-500 after:rounded-full after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-500 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:hover:opacity-10 after:z-30 after:blur-[100px] overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
} 