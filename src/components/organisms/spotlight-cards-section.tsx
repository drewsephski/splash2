import type React from 'react';
import {
  useRef,
} from 'react';

// Import icons from lucide-react
import { Code, Cloud, Settings, Star, Target } from 'lucide-react';
import { SpotLightItem, Spotlight } from '@/components/organisms/spotlight';
import VariableFontCursorProximity from '@/fancy/components/text/variable-font-cursor-proximity';
// Map icon names to components
const iconMap: { [key: string]: React.ElementType<{ size: number; className: string }> } = {
  Code,
  Cloud,
  Settings,
  Star,
  Target,
};

interface BoxItem {
  id: string;
  chart?: string; // Make chart optional
  iconName?: string; // Make iconName optional
  title: string;
  des: string;
  className: string;
}

export default function SpotlightCardsSection() {
  const boxes: BoxItem[] = [
    {
      id: '12',
      // chart: '/chart_motl5z.webp',
      iconName: 'Code', // Using an icon
      title: 'Web Design',
      des: 'Crafting responsive and dynamic web experiences.',
      className: 'grid xl:col-span-1 col-span-2', // Adjusted grid span
    },
    {
      id: '52',
      // chart: '/chart4_s7wsku.webp',
      iconName: 'Cloud', // Using an icon
      title: 'Software Dev',
      des: 'Designing and managing scalable cloud solutions.',
      className: 'grid xl:col-span-1 col-start-3 col-span-2', // Adjusted grid span
    },
    {
      id: '42',
      // chart: '/chart3_i9wdgb.webp',
      iconName: 'Settings', // Using an icon
      title: 'System Design',
      des: 'Architecting robust and efficient systems.',
      className: 'grid xl:col-span-1 col-span-2', // Adjusted grid span
    },
    {
      id: '22',
      // chart: '/star_tb9ivg.webp',
      iconName: 'Star', // Using an icon
      title: 'Innovation',
      des: 'Exploring new technologies and creative solutions.',
      className: 'grid xl:col-span-1 col-start-3 col-span-2', // Adjusted grid span
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-12 min-h-screen flex items-center justify-center">
      {/* Added flex items-center justify-center to center content vertically */}
      <div className='relative bg-black sm:p-8 p-4 rounded-md container mx-auto'>
        {/* Added container mx-auto for centering and max-width */}
        <Spotlight className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full'>
          {/* Increased gap, explicitly set grid-cols-4, added w-full */}
          {boxes?.map((box) => {
            const IconComponent = box.iconName ? iconMap[box.iconName] : null;
            return (
              <SpotLightItem className={box.className} key={box.id}>
                <div className='relative z-10 rounded-lg bg-gradient-to-b from-[#0c0c0c] to-[#252525] w-full h-full mx-auto p-6 flex flex-col items-center text-center'>
                  {/* Added p-6 for padding, flex properties for content alignment */}
                  {box.chart && !IconComponent && (
                    <div
                      className={'absolute inset-0 rounded-lg bg-center bg-cover'}
                      style={{ backgroundImage: `url(${box.chart})` }}
                    />
                  )}
                  {IconComponent && (
                    <IconComponent size={48} className="mb-4 text-blue-400" />
                    // Styled icon
                  )}

                  <VariableFontCursorProximity
                    label={box?.title ?? ''}
                    fromFontVariationSettings="'wght' 700"
                    toFontVariationSettings="'wght' 900"
                    containerRef={sectionRef}
                    className='text-center text-lg sm:text-xl lg:text-2xl font-semibold text-white z-10'
                  />
                    <VariableFontCursorProximity
                    label={box?.des ?? ''}
                    fromFontVariationSettings="'wght' 400"
                    toFontVariationSettings="'wght' 800"
                    containerRef={sectionRef}
                    className='text-center text-xs sm:text-sm lg:text-base text-neutral-400 z-10'
                  />
                </div>
              </SpotLightItem>
            );
          })}
        </Spotlight>
      </div>
    </section>
  );
} 