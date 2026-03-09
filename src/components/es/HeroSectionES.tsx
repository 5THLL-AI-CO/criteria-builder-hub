import { useEffect, useState } from "react";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    setHasAnimated(true);
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, hasAnimated]);

  return (
    <span className="font-mono text-4xl md:text-5xl font-bold text-text-primary">
      {count}{suffix}
    </span>
  );
};

const HeroSectionES = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="nodePatternES" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#6C3CE0" opacity="0.6" />
              <circle cx="0" cy="0" r="1.5" fill="#6C3CE0" opacity="0.4" />
              <circle cx="100" cy="0" r="1.5" fill="#6C3CE0" opacity="0.4" />
              <circle cx="0" cy="100" r="1.5" fill="#6C3CE0" opacity="0.4" />
              <circle cx="100" cy="100" r="1.5" fill="#6C3CE0" opacity="0.4" />
              <line x1="50" y1="50" x2="0" y2="0" stroke="#6C3CE0" strokeWidth="0.5" opacity="0.3" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="#6C3CE0" strokeWidth="0.5" opacity="0.3" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="#6C3CE0" strokeWidth="0.5" opacity="0.3" />
              <line x1="50" y1="50" x2="100" y2="100" stroke="#6C3CE0" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nodePatternES)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center pt-20">
        <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-6">
          El Marketplace de Agentes Profesionales
        </p>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
          La IA vino a reemplazar profesionales. Criteria llegó para hacerlos socios.
        </h1>

        <p className="text-text-secondary text-lg md:text-xl mt-8 max-w-2xl mx-auto">
          Profesionales de élite codifican su criterio en agentes autónomos. Ganan por cada uso. Sus clientes reciben orientación experta sin la espera ni el costo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={() => scrollToSection("builder-form")}
            className="bg-gradient-cta text-text-primary font-medium uppercase tracking-wider py-4 px-8 rounded-lg hover:brightness-105 transition-all"
          >
            Ser Builder
          </button>
          <button
            onClick={() => scrollToSection("request-form")}
            className="bg-transparent border border-accent text-text-secondary font-medium uppercase tracking-wider py-4 px-8 rounded-lg hover:bg-accent/10 transition-all"
          >
            Solicitar un Agente
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-12 md:gap-20 mt-16">
          <div className="text-center">
            <AnimatedCounter target={3} />
            <p className="text-text-tertiary text-xs uppercase tracking-wider mt-2">Profesionales Piloto</p>
          </div>
          <div className="text-center">
            <AnimatedCounter target={22} />
            <p className="text-text-tertiary text-xs uppercase tracking-wider mt-2">Conversaciones con Clientes</p>
          </div>
          <div className="text-center">
            <AnimatedCounter target={50} suffix="h" />
            <p className="text-text-tertiary text-xs uppercase tracking-wider mt-2">Calibración Mínima</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionES;
