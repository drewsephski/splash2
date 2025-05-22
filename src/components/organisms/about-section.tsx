import { useRef } from "react";
import { GlareCard } from "@/components/molecules/glare-card";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiDjango,
  SiFlask,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiAmazon,
  SiGooglecloud,
  SiVercel,
  SiNetlify,
  SiGithubactions,
  SiDocker,
  SiGit,
  SiTestinglibrary,
  SiJquery,
  SiWebpack,
} from "@icons-pack/react-simple-icons";
import BoldOnHover from "@/components/ui/bold-on-hover";
import VariableFontCursorProximity from "@/fancy/components/text/variable-font-cursor-proximity";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Function to render icons based on names
  const renderIcons = (techNames: string[]): React.JSX.Element[] => {
    const iconMap: { [key: string]: React.JSX.Element } = {
      SiHtml5: <SiHtml5 title="HTML5" color="#E34F26" />,
      SiCss3: <SiCss3 title="CSS3" color="#1572B6" />,
      SiJavascript: <SiJavascript title="JavaScript" color="#F7DF1E" />,
      SiReact: <SiReact title="React" color="#61DAFB" />,
      SiNextdotjs: <SiNextdotjs title="Next.js" color="#fff" />,
      SiTypescript: <SiTypescript title="TypeScript" color="#3178C6" />,
      SiTailwindcss: <SiTailwindcss title="Tailwind CSS" color="#06B6D4" />,
      SiFramer: <SiFramer title="Framer Motion" color="#0055FF" />,
      SiNodedotjs: <SiNodedotjs title="Node.js" color="#339933" />,
      SiExpress: <SiExpress title="Express.js" color="#fff" />,
      SiPython: <SiPython title="Python" color="#3776AB" />,
      SiDjango: <SiDjango title="Django" color="#092E20" />,
      SiFlask: <SiFlask title="Flask" color="#fff" />,
      SiMongodb: <SiMongodb title="MongoDB" color="#47A248" />,
      SiPostgresql: <SiPostgresql title="PostgreSQL" color="#336791" />,
      SiGraphql: <SiGraphql title="GraphQL" color="#E10098" />,
      SiAmazon: <SiAmazon title="AWS" color="#232F3E" />,
      SiGooglecloud: <SiGooglecloud title="Google Cloud" color="#4285F4" />,
      SiVercel: <SiVercel title="Vercel" color="#fff" />,
      SiNetlify: <SiNetlify title="Netlify" color="#00C7B7" />,
      SiGithubactions: <SiGithubactions title="GitHub" color="#267CDD" />,
      SiDocker: <SiDocker title="Docker" color="#2496ED" />,
      SiGit: <SiGit title="Git" color="#F05032" />,
      SiTestinglibrary: <SiTestinglibrary title="Testing Library" color="#E3008F" />,
      SiJquery: <SiJquery title="jQuery" color="#0769AD" />,
      SiWebpack: <SiWebpack title="Webpack" color="#8DD6F9" />,
    };

    return techNames.map((name) => (
      <div key={name} className="flex flex-col items-center p-2">
        {iconMap[name]}
        <span className="text-xs mt-1">{iconMap[name]?.props.title}</span>
      </div>
    ));
  };

  const frontendTech = [
    'SiHtml5', 'SiCss3', 'SiJavascript',
    'SiReact', 'SiNextdotjs', 'SiTypescript',
    'SiTailwindcss', 'SiFramer', 'SiWebpack',
  ];

  const backendTech = [
    'SiNodedotjs', 'SiExpress', 'SiPython',
    'SiDjango', 'SiFlask', 'SiMongodb',
    'SiPostgresql', 'SiGraphql', 'SiTypescript',
  ];

  const fullstackTech = [
    'SiReact', 'SiNodedotjs', 'SiMongodb',
    'SiAmazon', 'SiGooglecloud', 'SiVercel',
    'SiNetlify', 'SiGithubactions', 'SiDocker',
  ];

  return (
    <section ref={sectionRef} className="container mx-auto px-4 py-16">
      <div className="flex justify-center gap-8 flex-wrap">
        <BoldOnHover
          text="About Me"
          initialStyle="'wght' 700"
          hoverStyle="'wght' 900"
          className="text-4xl font-bold text-center mb-8"
        />
      </div>
      <div className="max-w-2xl mx-auto text-lg text-center mb-12">
        <BoldOnHover
          text="Creating engaging and visually appealing user experiences."
          initialStyle="'wght' 400"
          hoverStyle="'wght' 800"
        />
      </div>
      {/* Add a row for Glare Cards */}
      <div className="flex justify-center gap-8 flex-wrap overflow-hidden">
        {/* Frontend Card */}
        <GlareCard className="w-full sm:w-80 h-[400px]">
          <div className="flex flex-col items-center justify-center h-full text-white py-8 pl-0 pr-12 text-center overflow-y-auto">
            <VariableFontCursorProximity
              label="Frontend"
              fromFontVariationSettings="'wght' 600"
              toFontVariationSettings="'wght' 800"
              containerRef={sectionRef}
              className="text-xl sm:text-2xl font-bold mb-2 mt-2"
            />
            <VariableFontCursorProximity
              label="Crafting engaging UI/UX designs."
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 800"
              containerRef={sectionRef}
              className="text-xs sm:text-sm mb-4"
            />
            <div className="grid grid-cols-3 gap-3 text-3xl">
              {renderIcons(frontendTech)}
            </div>
          </div>
        </GlareCard>
        {/* Backend Card */}
        <GlareCard className="w-full sm:w-80 h-[400px]">
           <div className="flex flex-col items-center justify-center h-full text-white py-8 pl-0 pr-12 text-center overflow-y-auto">
            <VariableFontCursorProximity
              label="Backend"
              fromFontVariationSettings="'wght' 600"
              toFontVariationSettings="'wght' 800"
              containerRef={sectionRef}
              className="text-xl sm:text-2xl font-bold mb-2"
            />
             <VariableFontCursorProximity
              label="Building robust applications."
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 800"
              containerRef={sectionRef}
              className="text-xs sm:text-sm mb-4"
            />
            <div className="grid grid-cols-3 gap-3 text-3xl">
              {renderIcons(backendTech)}
            </div>
          </div>
        </GlareCard>
        {/* Full Stack Card */}
        <GlareCard className="w-full sm:w-80 h-[400px]">
           <div className="flex flex-col items-center justify-center h-full text-white py-8 pl-0 pr-12 text-center overflow-y-auto">
            <VariableFontCursorProximity
              label="Full Stack"
              fromFontVariationSettings="'wght' 600"
              toFontVariationSettings="'wght' 800"
              containerRef={sectionRef}
              className="text-xl sm:text-2xl font-bold mb-1"
            />
            <VariableFontCursorProximity
              label="Developing end-to-end solutions."
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 800"
              containerRef={sectionRef}
              className="text-xs sm:text-sm mb-4"
            />
            <div className="grid grid-cols-3 gap-3 text-3xl">
              {renderIcons(fullstackTech)}
            </div>
          </div>
        </GlareCard>
      </div>
    </section>
  );
} 