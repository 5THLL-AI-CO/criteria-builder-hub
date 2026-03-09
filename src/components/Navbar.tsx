import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-criteria-border/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-lg font-bold text-text-primary tracking-widest uppercase"
        >
          CRITERIA
        </button>

        {/* Navigation links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("problem")}
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            The Problem
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("marketplace")}
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            Marketplace
          </button>
          <button
            onClick={() => scrollToSection("builder-collective")}
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            The Builder Collective
          </button>
          <button
            onClick={() => navigate("/es")}
            className="text-text-tertiary hover:text-text-primary transition-colors text-sm font-mono"
          >
            ES
          </button>
        </div>
        {/* CTA Button */}
        <button
          onClick={() => scrollToSection("builder-form")}
          className="bg-gradient-cta text-text-primary font-medium uppercase tracking-wider text-sm py-2 px-6 rounded-lg hover:brightness-105 transition-all"
        >
          Become a Builder
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
