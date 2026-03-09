const Footer = () => {
  const scrollToForm = (formId: string) => {
    const element = document.getElementById(formId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        {/* Logo */}
        <h2 className="font-display text-2xl font-bold text-text-primary tracking-widest uppercase">
          CRITERIA
        </h2>

        {/* Tagline */}
        <p className="text-text-secondary mt-4 max-w-lg mx-auto">
          The marketplace where professionals sell access to their judgment, not their time.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <a
            href="mailto:johnmoralesreyes7@gmail.com"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Contact
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            LinkedIn
          </a>
          <button
            onClick={() => scrollToForm("builder-form")}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Become a Builder
          </button>
        </div>

        {/* Join team link */}
        <button
          onClick={() => scrollToForm("team-form")}
          className="text-text-tertiary hover:text-text-secondary transition-colors mt-6 text-sm"
        >
          Join our team
        </button>

        {/* Copyright */}
        <p className="text-text-tertiary text-sm mt-8">
          © 2026 Criteria. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
