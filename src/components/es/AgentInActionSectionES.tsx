import { useScrollReveal } from "@/hooks/useScrollReveal";

const pipelineSteps = [
  "El cliente proporciona registro de empresa, URL del sitio web, T&C actuales, descripción del negocio y referencias de competidores.",
  "El agente extrae la estructura legal, analiza el lenguaje del sitio web, mapea los enfoques regulatorios de los competidores y cruza todo contra los T&C.",
  "El agente produce una evaluación de riesgos. En el primer caso real, detectó que el uso de la palabra 'consumidor' en el sitio web creaba una exposición no intencionada bajo la ley de protección al consumidor.",
  "El cliente recibe los T&C revisados. Por $20/mes, el agente monitorea el sitio web en busca de cambios de lenguaje y señala nuevos riesgos legales automáticamente.",
];

const AgentInActionSectionES = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="agent-in-action" ref={ref} className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className={`text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            Prueba de Concepto
          </p>
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "100ms" }}>
            Lo que realmente hace un agente de Criteria
          </h2>
          <p className={`text-text-secondary text-lg md:text-xl mt-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "200ms" }}>
            Nuestro primer agente: revisión de Términos y Condiciones para sitios web comerciales en Colombia. Construido por un abogado comercial con 13 años de experiencia.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-criteria-border -translate-y-1/2" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pipelineSteps.map((step, index) => (
              <div
                key={index}
                className={`relative bg-surface border border-criteria-border rounded-xl p-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mb-4">
                  <span className="font-mono text-accent text-sm">{index + 1}</span>
                </div>
                <p className="text-text-secondary text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <p className={`text-text-primary text-xl md:text-2xl text-center mt-16 max-w-3xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "700ms" }}>
          Una firma de abogados cobraría miles por este análisis, o más probablemente, nunca lo habría hecho. El agente lo hace en una hora.
        </p>
      </div>
    </section>
  );
};

export default AgentInActionSectionES;
