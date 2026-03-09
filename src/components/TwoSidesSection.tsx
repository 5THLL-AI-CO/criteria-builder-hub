import { useScrollReveal } from "@/hooks/useScrollReveal";

const TwoSidesSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const scrollToForm = (formId: string) => {
    const element = document.getElementById(formId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="two-sides"
      ref={ref}
      className="bg-background py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4">
            For Professionals & Clients
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Built for two audiences. Designed so both win
          </h2>
        </div>

        {/* Two cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* For Professionals */}
          <div
            className={`bg-surface border border-criteria-border rounded-xl p-8 md:p-10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-4">
              Encode your judgment. Earn for every use. Forever.
            </h3>
            <div className="text-text-secondary space-y-4">
              <p>
                Your criteria is your intellectual property. It is never shared, never used to train other agents, never accessible to anyone but the clients who pay for the output.
              </p>
              <p>
                You invest a $200 refundable deposit and a minimum of 50 hours of calibration. If your agent passes QA, the deposit is returned and you earn lifetime revenue share on every consultation.
              </p>
              <p>
                Building your agent on Criteria is not a signup. It is a professional recognition.
              </p>
            </div>
            <button
              onClick={() => scrollToForm("builder-form")}
              className="mt-8 bg-gradient-cta text-text-primary font-medium uppercase tracking-wider py-4 px-8 rounded-lg hover:brightness-105 transition-all"
            >
              Become a Builder
            </button>
          </div>

          {/* For Clients */}
          <div
            className={`bg-surface border border-criteria-border rounded-xl p-8 md:p-10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-4">
              Expert judgment. Without the wait. Without the cost.
            </h3>
            <div className="text-text-secondary space-y-4">
              <p>
                Every agent on Criteria has been calibrated against real cases by a verified professional. You get the output in hours, not weeks. At a fraction of the cost of a traditional engagement.
              </p>
              <p>
                You are not buying a chatbot. You are buying the judgment of someone who has spent 15 years learning what to look for and what questions to ask.
              </p>
            </div>
            <button
              onClick={() => scrollToForm("request-form")}
              className="mt-8 bg-transparent border border-accent text-text-secondary font-medium uppercase tracking-wider py-4 px-8 rounded-lg hover:bg-accent/10 transition-all"
            >
              Request an Agent
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoSidesSection;
