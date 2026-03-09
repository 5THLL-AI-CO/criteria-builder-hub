import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const profiles = [
  {
    initials: "JM",
    name: "John Morales R.",
    title: "Commercial Lawyer, 13 years",
    agent: "Terms & Conditions Review",
    metric: "First agent in calibration",
  },
  {
    initials: "PT",
    name: "[Pilot Professional]",
    title: "Child Psychologist, 15 years",
    agent: "Family Dynamics Assessment",
    metric: "8,000 digitized evaluations",
  },
  {
    initials: "CE",
    name: "[Pilot Professional]",
    title: "Employability Coach",
    agent: "Career Transition Strategy",
    metric: "Former Head of Waze Latam",
  },
];

const AnimatedCounter = ({ target, suffix = "", isVisible }: { target: number; suffix?: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target, isVisible]);

  return (
    <span className="font-mono text-4xl md:text-5xl font-bold text-text-primary">
      {count}{suffix}
    </span>
  );
};

const BuilderCollectiveSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="builder-collective"
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
            The Builder Collective
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Not an open marketplace. A verified professional standard
          </h2>
          <p className="text-text-secondary text-lg md:text-xl mt-6 max-w-2xl mx-auto">
            Criteria agents are built by professionals with verified credentials, calibrated against real cases, and published only after rigorous QA. Few apply. Fewer are accepted.
          </p>
        </div>

        {/* Counters */}
        <div
          className={`flex flex-wrap justify-center gap-12 md:gap-20 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="text-center">
            <AnimatedCounter target={3} isVisible={isVisible} />
            <p className="text-text-tertiary text-xs uppercase tracking-wider mt-2">Professionals Accepted</p>
          </div>
          <div className="text-center">
            <AnimatedCounter target={12} isVisible={isVisible} />
            <p className="text-text-tertiary text-xs uppercase tracking-wider mt-2">Applications in Review</p>
          </div>
          <div className="text-center">
            <AnimatedCounter target={50} suffix="h+" isVisible={isVisible} />
            <p className="text-text-tertiary text-xs uppercase tracking-wider mt-2">Minimum Calibration Per Agent</p>
          </div>
        </div>

        {/* Profile cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className={`bg-surface border border-criteria-border border-l-[3px] border-l-accent rounded-xl p-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-criteria-border flex items-center justify-center flex-shrink-0">
                  <span className="text-text-primary text-lg font-medium">{profile.initials}</span>
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold text-text-primary">{profile.name}</h4>
                  <p className="text-text-secondary text-sm">{profile.title}</p>
                </div>
              </div>
              <p className="text-text-secondary mt-4">Agent: {profile.agent}</p>
              <p className="text-text-tertiary text-sm mt-2">{profile.metric}</p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div
          className={`bg-surface border border-criteria-border rounded-xl p-8 max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <blockquote className="text-text-secondary text-lg italic">
            "I've spent 15 years doing child evaluations. Calibrating my agent forced me to articulate decisions I made by instinct. Now that instinct serves families while I sleep."
          </blockquote>
          <p className="text-text-tertiary text-sm mt-4">
            Pilot Professional, Child Psychologist
          </p>
        </div>
      </div>
    </section>
  );
};

export default BuilderCollectiveSection;
