const FooterES = () => {
  const scrollToForm = (formId: string) => {
    const element = document.getElementById(formId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-background py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <h2 className="font-display text-2xl font-bold text-text-primary tracking-widest uppercase">CRITERIA</h2>
        <p className="text-text-secondary mt-4 max-w-lg mx-auto">
          El marketplace donde los profesionales venden acceso a su criterio, no a su tiempo.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <a href="mailto:johnmoralesreyes7@gmail.com" className="text-text-secondary hover:text-text-primary transition-colors">Contacto</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">LinkedIn</a>
          <button onClick={() => scrollToForm("builder-form")} className="text-text-secondary hover:text-text-primary transition-colors">Ser Builder</button>
        </div>
        <button onClick={() => scrollToForm("team-form")} className="text-text-tertiary hover:text-text-secondary transition-colors mt-6 text-sm">Únete al equipo</button>
        <p className="text-text-tertiary text-sm mt-8">© 2026 Criteria. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default FooterES;
