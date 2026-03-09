import { useScrollReveal } from "@/hooks/useScrollReveal";

const pipelineSteps = [
  "Client provides business registration, website URL, current T&C, business description, and competitor references.",
  "Agent extracts the legal structure, analyzes website language, maps competitor regulatory approaches, and cross-references everything against the T&C.",
  "Agent produces a risk assessment. In the first real case, it detected that using the word 'consumer' on the website created unintended exposure under consumer protection law.",
  "Client receives revised T&C. For $20/month, the agent monitors the website for language changes and flags new legal risks automatically.",
];

const AgentInActionSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="agent-in-action"
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
            Proof of Concept
          </p>
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            What a Criteria agent actually does
          </h2>
          <p
            className={`text-text-secondary text-lg md:text-xl mt-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Our first agent: Terms & Conditions review for commercial websites in Colombia. Built by a commercial lawyer with 13 years of experience.
          </p>
        </div>

        {/* Pipeline steps */}
        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-criteria-border -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pipelineSteps.map((step, index) => (
              <div
                key={index}
                className={`relative bg-surface border border-criteria-border rounded-xl p-6 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Step number circle */}
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mb-4">
                  <span className="font-mono text-accent text-sm">{index + 1}</span>
                </div>
                <p className="text-text-secondary text-sm">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact line */}
        <p
          className={`text-text-primary text-xl md:text-2xl text-center mt-16 max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          A law firm would charge thousands for this analysis, or more likely, would never have done it at all. The agent does it in one hour.
        </p>
      </div>
    </section>
  );
};

export default AgentInActionSection;
