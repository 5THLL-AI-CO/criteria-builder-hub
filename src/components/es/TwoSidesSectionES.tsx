import { useScrollReveal } from "@/hooks/useScrollReveal";

const TwoSidesSectionES = () => {
  const { ref, isVisible } = useScrollReveal();

  const scrollToForm = (formId: string) => {
    const element = document.getElementById(formId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="two-sides" ref={ref} className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4">Para Profesionales y Clientes</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">Construido para dos audiencias. Diseñado para que ambas ganen</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className={`bg-surface border border-criteria-border rounded-xl p-8 md:p-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "100ms" }}>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-4">Codifica tu criterio. Gana por cada uso. Para siempre.</h3>
            <div className="text-text-secondary space-y-4">
              <p>Tu criterio es tu propiedad intelectual. Nunca se comparte, nunca se usa para entrenar otros agentes, nunca es accesible para nadie más que los clientes que pagan por el resultado.</p>
              <p>Inviertes un depósito reembolsable de $200 y un mínimo de 50 horas de calibración. Si tu agente pasa QA, el depósito se devuelve y ganas participación de ingresos de por vida por cada consulta.</p>
              <p>Construir tu agente en Criteria no es un registro. Es un reconocimiento profesional.</p>
            </div>
            <button onClick={() => scrollToForm("builder-form")} className="mt-8 bg-gradient-cta text-text-primary font-medium uppercase tracking-wider py-4 px-8 rounded-lg hover:brightness-105 transition-all">
              Ser Builder
            </button>
          </div>

          <div className={`bg-surface border border-criteria-border rounded-xl p-8 md:p-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "200ms" }}>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-4">Criterio experto. Sin la espera. Sin el costo.</h3>
            <div className="text-text-secondary space-y-4">
              <p>Cada agente en Criteria ha sido calibrado contra casos reales por un profesional verificado. Recibes el resultado en horas, no en semanas. A una fracción del costo de un servicio tradicional.</p>
              <p>No estás comprando un chatbot. Estás comprando el criterio de alguien que ha pasado 15 años aprendiendo qué buscar y qué preguntas hacer.</p>
            </div>
            <button onClick={() => scrollToForm("request-form")} className="mt-8 bg-transparent border border-accent text-text-secondary font-medium uppercase tracking-wider py-4 px-8 rounded-lg hover:bg-accent/10 transition-all">
              Solicitar un Agente
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoSidesSectionES;
