import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    title: "Entrevista Estructurada",
    body: "Le preguntamos al profesional su proceso. ¿Qué preguntas primero? ¿Qué señales de alerta buscas? ¿Qué nunca menciona tu cliente? Extraemos la arquitectura de decisión, no solo el conocimiento.",
  },
  {
    number: "02",
    title: "Biblioteca de Casos",
    body: "El profesional entrega su trabajo previo. Contratos redactados, evaluaciones escritas, informes entregados. Todo en texto. Esto se convierte en la base de la que aprende el agente.",
  },
  {
    number: "03",
    title: "Calibración",
    body: "Mínimo 50 horas contra casos reales. Nuestro motor de evaluación genera preguntas. El profesional responde. El agente se calibra. Esto no es un formulario. Es un proceso que toma semanas.",
  },
  {
    number: "04",
    title: "QA y Publicación",
    body: "Ejecutamos casos de uso reales. Comparamos la salida del agente con lo que el profesional habría hecho manualmente. Solo los agentes que pasan son publicados. Esto no es un marketplace abierto. Es un estándar profesional.",
  },
];

const HowItWorksSectionES = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="how-it-works" ref={ref} className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className={`text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            El Proceso
          </p>
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "100ms" }}>
            Otras plataformas te piden subir archivos. Nosotros te pedimos demostrar tu criterio.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`bg-surface border border-criteria-border rounded-xl p-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <span className="font-mono text-accent text-xl">{step.number}</span>
              <h3 className="font-display text-xl font-semibold text-text-primary mt-4 mb-4">{step.title}</h3>
              <p className="text-text-secondary text-base">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSectionES;
