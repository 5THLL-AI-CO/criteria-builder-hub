import { useScrollReveal } from "@/hooks/useScrollReveal";

const DistinctionSectionES = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="distinction" ref={ref} className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className={`text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            La Distinción Central
          </p>
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "100ms" }}>
            Conocimiento es lo que la IA ya sabe. Criterio es lo que solo un profesional sabe.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className={`bg-surface border border-criteria-border rounded-xl p-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "200ms" }}>
            <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4">Conocimiento</p>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-6">Lo que hace la IA genérica</h3>
            <div className="space-y-6 text-text-secondary">
              <p>Un padre le pregunta a ChatGPT por qué su hijo de 4 años no quiere dejar el pañal. Recibe consejos genéricos sobre consistencia y refuerzo positivo.</p>
              <p>Un fundador de startup le pide a una IA que revise sus términos y condiciones. La IA verifica cumplimiento legal contra plantillas estándar.</p>
            </div>
            <p className="text-text-tertiary text-sm mt-8 pt-6 border-t border-criteria-border">
              Información pública. Disponible para cualquiera. Sin criterio profesional.
            </p>
          </div>

          <div className={`bg-surface border border-criteria-border border-l-[3px] border-l-accent rounded-xl p-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "300ms" }}>
            <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4">Criterio</p>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-6">Lo que hace un agente calibrado</h3>
            <div className="space-y-6 text-text-secondary">
              <p>Un agente entrenado por una psicóloga infantil con 15 años de experiencia comienza preguntando por la dinámica familiar. Porque ella sabe que con niños menores de 5 años, el problema casi nunca es el niño.</p>
              <p>Un agente calibrado por un abogado comercial detecta que el sitio web de la startup usa la palabra "consumidor," creando una exposición jurisdiccional no intencionada bajo la ley de protección al consumidor. Ninguna firma habría buscado esto.</p>
            </div>
            <p className="text-text-primary text-sm mt-8 pt-6 border-t border-criteria-border">
              Criterio privado. Extraído de décadas de experiencia. Irremplazable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistinctionSectionES;
