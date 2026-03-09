import { useScrollReveal } from "@/hooks/useScrollReveal";

const ProblemSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="problem"
      ref={ref}
      className="bg-background py-20 md:py-32"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Label */}
        <p
          className={`text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          The Problem
        </p>

        {/* Heading */}
        <h2
          className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          AI's productivity gains have a winner. It's not the professionals. It's not their clients.
        </h2>

        {/* Body paragraphs */}
        <div
          className={`text-text-secondary text-lg md:text-xl mt-8 space-y-6 max-w-2xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <p>
            The AI boom is making dominant firms more efficient. They do the same work with fewer people, charge clients the same rates, and keep the difference. Independent professionals and their clients see none of those benefits.
          </p>
          <p>
            Worse: professionals using enterprise AI tools are training their own replacement. Every document they feed into their firm's system builds an institutional asset they don't own and won't profit from. Meanwhile, their clients still pay the same and wait just as long.
          </p>
        </div>

        {/* Pull quote */}
        <div
          className={`bg-surface border border-criteria-border rounded-xl p-8 mt-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <blockquote className="text-text-secondary text-lg md:text-xl italic">
            "80% of the world's data is private. We're not going to have access to it. If you can get access to that data and build a business on top of it, you have a real moat."
          </blockquote>
          <p className="text-text-tertiary text-sm mt-4">
            Kevin Weil, VP of Product, OpenAI
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
