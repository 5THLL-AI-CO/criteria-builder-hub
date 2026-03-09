import { useScrollReveal } from "@/hooks/useScrollReveal";

const ProblemSectionES = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="problem" ref={ref} className="bg-background py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <p className={`text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          El Problema
        </p>

        <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "100ms" }}>
          Las ganancias de productividad de la IA tienen un ganador. No son los profesionales. No son sus clientes.
        </h2>

        <div className={`text-text-secondary text-lg md:text-xl mt-8 space-y-6 max-w-2xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "200ms" }}>
          <p>
            El boom de la IA está haciendo más eficientes a las firmas dominantes. Hacen el mismo trabajo con menos personas, cobran las mismas tarifas a sus clientes y se quedan con la diferencia. Los profesionales independientes y sus clientes no ven ninguno de esos beneficios.
          </p>
          <p>
            Peor aún: los profesionales que usan herramientas de IA empresariales están entrenando a su propio reemplazo. Cada documento que alimentan en el sistema de su firma construye un activo institucional que no les pertenece y del cual no se beneficiarán. Mientras tanto, sus clientes siguen pagando lo mismo y esperando lo mismo.
          </p>
        </div>

        <div className={`bg-surface border border-criteria-border rounded-xl p-8 mt-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "300ms" }}>
          <blockquote className="text-text-secondary text-lg md:text-xl italic">
            "El 80% de los datos del mundo son privados. No vamos a tener acceso a ellos. Si puedes acceder a esos datos y construir un negocio sobre ellos, tienes una ventaja competitiva real."
          </blockquote>
          <p className="text-text-tertiary text-sm mt-4">
            Kevin Weil, VP de Producto, OpenAI
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSectionES;
