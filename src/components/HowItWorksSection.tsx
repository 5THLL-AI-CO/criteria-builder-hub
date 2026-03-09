import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    title: "Structured Interview",
    body: "We ask the professional their process. What do you ask first? What red flags do you look for? What does your client never think to mention? We extract the decision architecture, not just the knowledge.",
  },
  {
    number: "02",
    title: "Case Library",
    body: "The professional provides their prior work. Contracts drafted, evaluations written, reports delivered. Everything in text. This becomes the foundation the agent learns from.",
  },
  {
    number: "03",
    title: "Calibration",
    body: "Minimum 50 hours against real cases. Our evaluation engine generates questions. The professional responds. The agent calibrates. This is not a form. It is a process that takes weeks.",
  },
  {
    number: "04",
    title: "QA and Publication",
    body: "We run real use cases. We compare the agent's output against what the professional would have done manually. Only agents that pass are published. This is not an open marketplace. This is a professional standard.",
  },
];

const HowItWorksSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="how-it-works"
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
            The Process
          </p>
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Other platforms ask you to upload files. We ask you to prove your judgment.
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`bg-surface border border-criteria-border rounded-xl p-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <span className="font-mono text-accent text-xl">{step.number}</span>
              <h3 className="font-display text-xl font-semibold text-text-primary mt-4 mb-4">
                {step.title}
              </h3>
              <p className="text-text-secondary text-base">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
