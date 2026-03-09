import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const profiles = [
  { initials: "JM", name: "John Morales R.", title: "Abogado Comercial, 13 años", agent: "Revisión de Términos y Condiciones", metric: "Primer agente en calibración" },
  { initials: "PT", name: "[Profesional Piloto]", title: "Psicóloga Infantil, 15 años", agent: "Evaluación de Dinámica Familiar", metric: "8,000 evaluaciones digitalizadas" },
  { initials: "CE", name: "[Profesional Piloto]", title: "Coach de Empleabilidad", agent: "Estrategia de Transición de Carrera", metric: "Ex Head de Waze Latam" },
];

const AnimatedCounter = ({ target, suffix = "", isVisible }: { target: number; suffix?: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    const duration = 1500; const steps = 60; const increment = target / steps; let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); } else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, isVisible]);
  return <span className="font-mono text-4xl md:text-5xl font-bold text-text-primary">{count}{suffix}</span>;
};

const BuilderCollectiveSectionES = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="builder-collective" ref={ref} className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4">El Colectivo Builder</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">No es un marketplace abierto. Es un estándar profesional verificado</h2>
          <p className="text-text-secondary text-lg md:text-xl mt-6 max-w-2xl mx-auto">
            Los agentes de Criteria son construidos por profesionales con credenciales verificadas, calibrados contra casos reales y publicados solo después de un QA riguroso. Pocos aplican. Menos son aceptados.
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-12 md:gap-20 mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "100ms" }}>
          <div className="text-center">
            <AnimatedCounter target={3} isVisible={isVisible} />
            <p className="text-text-tertiary text-xs uppercase tracking-wider mt-2">Profesionales Aceptados</p>
          </div>
          <div className="text-center">
            <AnimatedCounter target={12} isVisible={isVisible} />
            <p className="text-text-tertiary text-xs uppercase tracking-wider mt-2">Aplicaciones en Revisión</p>
          </div>
          <div className="text-center">
            <AnimatedCounter target={50} suffix="h+" isVisible={isVisible} />
            <p className="text-text-tertiary text-xs uppercase tracking-wider mt-2">Calibración Mínima por Agente</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {profiles.map((profile, index) => (
            <div key={index} className={`bg-surface border border-criteria-border border-l-[3px] border-l-accent rounded-xl p-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: `${200 + index * 100}ms` }}>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-criteria-border flex items-center justify-center flex-shrink-0">
                  <span className="text-text-primary text-lg font-medium">{profile.initials}</span>
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold text-text-primary">{profile.name}</h4>
                  <p className="text-text-secondary text-sm">{profile.title}</p>
                </div>
              </div>
              <p className="text-text-secondary mt-4">Agente: {profile.agent}</p>
              <p className="text-text-tertiary text-sm mt-2">{profile.metric}</p>
            </div>
          ))}
        </div>

        <div className={`bg-surface border border-criteria-border rounded-xl p-8 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "500ms" }}>
          <blockquote className="text-text-secondary text-lg italic">
            "He pasado 15 años haciendo evaluaciones infantiles. Calibrar mi agente me obligó a articular decisiones que tomaba por instinto. Ahora ese instinto sirve a familias mientras duermo."
          </blockquote>
          <p className="text-text-tertiary text-sm mt-4">Profesional Piloto, Psicóloga Infantil</p>
        </div>
      </div>
    </section>
  );
};

export default BuilderCollectiveSectionES;
