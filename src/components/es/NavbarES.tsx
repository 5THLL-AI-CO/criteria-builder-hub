import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarES = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);
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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection("problem")} className="text-text-secondary hover:text-text-primary transition-colors text-sm">
            El Problema
          </button>
          <button onClick={() => scrollToSection("how-it-works")} className="text-text-secondary hover:text-text-primary transition-colors text-sm">
            Cómo Funciona
          </button>
          <button onClick={() => scrollToSection("marketplace")} className="text-text-secondary hover:text-text-primary transition-colors text-sm">
            Marketplace
          </button>
          <button onClick={() => scrollToSection("builder-collective")} className="text-text-secondary hover:text-text-primary transition-colors text-sm">
            El Colectivo Builder
          </button>
          <button onClick={() => navigate("/en")} className="text-text-tertiary hover:text-text-primary transition-colors text-sm font-mono">
            EN
          </button>
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollToSection("builder-form")}
          className="hidden md:block bg-gradient-cta text-text-primary font-medium uppercase tracking-wider text-sm py-2 px-6 rounded-lg hover:brightness-105 transition-all"
        >
          Ser Builder
        </button>

        {/* Mobile: EN + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => navigate("/en")}
            className="text-text-tertiary hover:text-text-primary transition-colors text-sm font-mono"
          >
            EN
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-text-primary p-1"
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-criteria-border/50 px-6 py-4 flex flex-col gap-4">
          <button onClick={() => scrollToSection("problem")} className="text-text-secondary hover:text-text-primary transition-colors text-sm text-left">
            El Problema
          </button>
          <button onClick={() => scrollToSection("how-it-works")} className="text-text-secondary hover:text-text-primary transition-colors text-sm text-left">
            Cómo Funciona
          </button>
          <button onClick={() => scrollToSection("marketplace")} className="text-text-secondary hover:text-text-primary transition-colors text-sm text-left">
            Marketplace
          </button>
          <button onClick={() => scrollToSection("builder-collective")} className="text-text-secondary hover:text-text-primary transition-colors text-sm text-left">
            El Colectivo Builder
          </button>
          <button
            onClick={() => scrollToSection("builder-form")}
            className="bg-gradient-cta text-text-primary font-medium uppercase tracking-wider text-sm py-2 px-6 rounded-lg hover:brightness-105 transition-all text-center mt-2"
          >
            Ser Builder
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavbarES;
