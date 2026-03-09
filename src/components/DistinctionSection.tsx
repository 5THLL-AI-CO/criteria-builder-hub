import { useScrollReveal } from "@/hooks/useScrollReveal";

const DistinctionSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="distinction"
      ref={ref}
      className="bg-background py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p
            className={`text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            The Core Insight
          </p>
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Knowledge is what AI already knows. Criteria is what only a professional knows.
          </h2>
        </div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Knowledge column */}
          <div
            className={`bg-surface border border-criteria-border rounded-xl p-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4">
              Knowledge
            </p>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-6">
              What generic AI does
            </h3>

            <div className="space-y-6 text-text-secondary">
              <p>
                A father asks ChatGPT why his 4-year-old won't potty train. He gets generic tips about consistency and positive reinforcement.
              </p>
              <p>
                A startup founder asks an AI to review their terms and conditions. The AI checks for legal compliance against standard templates.
              </p>
            </div>

            <p className="text-text-tertiary text-sm mt-8 pt-6 border-t border-criteria-border">
              Public information. Available to anyone. No professional judgment required.
            </p>
          </div>

          {/* Criteria column */}
          <div
            className={`bg-surface border border-criteria-border border-l-[3px] border-l-accent rounded-xl p-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4">
              Criteria
            </p>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-6">
              What a calibrated agent does
            </h3>

            <div className="space-y-6 text-text-secondary">
              <p>
                An agent trained by a child psychologist with 15 years of experience starts by asking about the family dynamics. Because she knows that with children under 5, the problem is almost never the child.
              </p>
              <p>
                An agent calibrated by a commercial lawyer detects that the startup's website uses the word "consumer," creating unintended jurisdictional exposure under consumer protection law. No firm would have looked for this.
              </p>
            </div>

            <p className="text-text-primary text-sm mt-8 pt-6 border-t border-criteria-border">
              Private judgment. Extracted from decades of experience. Irreplaceable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistinctionSection;
