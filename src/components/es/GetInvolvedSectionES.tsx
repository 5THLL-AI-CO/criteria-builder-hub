import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface FormState {
  data: Record<string, string>;
  errors: Record<string, boolean>;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

const initialFormState: FormState = { data: {}, errors: {}, isSubmitting: false, isSubmitted: false };

const GetInvolvedSectionES = () => {
  const { ref, isVisible } = useScrollReveal();
  const [builderForm, setBuilderForm] = useState<FormState>(initialFormState);
  const [requestForm, setRequestForm] = useState<FormState>(initialFormState);
  const [teamForm, setTeamForm] = useState<FormState>(initialFormState);

  const handleInputChange = (formSetter: React.Dispatch<React.SetStateAction<FormState>>, name: string, value: string) => {
    formSetter((prev) => ({ ...prev, data: { ...prev.data, [name]: value }, errors: { ...prev.errors, [name]: false } }));
  };

  const validateAndSubmit = async (formState: FormState, formSetter: React.Dispatch<React.SetStateAction<FormState>>, requiredFields: string[], endpoint: string, hiddenType: string) => {
    const newErrors: Record<string, boolean> = {};
    requiredFields.forEach((field) => { if (!formState.data[field]?.trim()) newErrors[field] = true; });
    if (Object.keys(newErrors).length > 0) { formSetter((prev) => ({ ...prev, errors: newErrors })); return; }
    formSetter((prev) => ({ ...prev, isSubmitting: true }));
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...formState.data, _type: hiddenType }) });
      if (response.ok) formSetter((prev) => ({ ...prev, isSubmitted: true, isSubmitting: false }));
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      formSetter((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const inputClasses = (hasError: boolean) => cn("w-full bg-background border border-criteria-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent", hasError && "border-destructive");

  return (
    <section id="get-involved" ref={ref} className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4">Participa</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">Tres formas de ser parte de lo que estamos construyendo</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* FORM 1: Ser Builder */}
          <div id="builder-form" className={`bg-surface border border-criteria-border border-t-[3px] border-t-accent rounded-2xl p-8 md:p-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "100ms" }}>
            <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-2">Para Profesionales</p>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-2">Ser Builder</h3>
            <p className="text-text-secondary text-sm mb-6">Aplica para codificar tu criterio profesional en un agente de Criteria. Aceptamos profesionales experimentados que puedan demostrar expertise de élite en su campo.</p>

            {builderForm.isSubmitted ? (
              <div className="flex items-start gap-3 text-text-secondary">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p>Aplicación recibida. Revisamos cada envío personalmente. Espera una respuesta en 5 días hábiles.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); validateAndSubmit(builderForm, setBuilderForm, ["fullName", "email", "profession", "expertise"], "https://formspree.io/f/mjgagqqv", "builder-application"); }} className="flex flex-col gap-4">
                <div><label className="block text-text-secondary text-sm mb-1.5">Nombre completo *</label><input type="text" placeholder="Tu nombre completo" value={builderForm.data.fullName || ""} onChange={(e) => handleInputChange(setBuilderForm, "fullName", e.target.value)} className={inputClasses(builderForm.errors.fullName)} />{builderForm.errors.fullName && <p className="text-destructive text-xs mt-1">Obligatorio</p>}</div>
                <div><label className="block text-text-secondary text-sm mb-1.5">Correo electrónico *</label><input type="email" placeholder="tu@email.com" value={builderForm.data.email || ""} onChange={(e) => handleInputChange(setBuilderForm, "email", e.target.value)} className={inputClasses(builderForm.errors.email)} />{builderForm.errors.email && <p className="text-destructive text-xs mt-1">Obligatorio</p>}</div>
                <div><label className="block text-text-secondary text-sm mb-1.5">Profesión y especialización *</label><input type="text" placeholder="Ej. Abogado Comercial, M&A" value={builderForm.data.profession || ""} onChange={(e) => handleInputChange(setBuilderForm, "profession", e.target.value)} className={inputClasses(builderForm.errors.profession)} />{builderForm.errors.profession && <p className="text-destructive text-xs mt-1">Obligatorio</p>}</div>
                <div><label className="block text-text-secondary text-sm mb-1.5">Años de experiencia</label><input type="text" placeholder="Ej. 13" value={builderForm.data.years || ""} onChange={(e) => handleInputChange(setBuilderForm, "years", e.target.value)} className={inputClasses(false)} /></div>
                <div><label className="block text-text-secondary text-sm mb-1.5">¿Por qué eres un profesional de élite en tu campo? *</label><textarea rows={4} placeholder="Describe qué hace distintivo tu expertise. ¿Qué sabes que la IA genérica no puede replicar?" value={builderForm.data.expertise || ""} onChange={(e) => handleInputChange(setBuilderForm, "expertise", e.target.value)} className={cn(inputClasses(builderForm.errors.expertise), "resize-y")} />{builderForm.errors.expertise && <p className="text-destructive text-xs mt-1">Obligatorio</p>}</div>
                <div><label className="block text-text-secondary text-sm mb-1.5">¿Qué agente te gustaría construir?</label><textarea rows={3} placeholder="Describe el servicio que quieres agentizar y quién lo usaría." value={builderForm.data.agentIdea || ""} onChange={(e) => handleInputChange(setBuilderForm, "agentIdea", e.target.value)} className={cn(inputClasses(false), "resize-y")} /></div>
                <div><label className="block text-text-secondary text-sm mb-1.5">URL de perfil de LinkedIn</label><input type="text" placeholder="https://linkedin.com/in/" value={builderForm.data.linkedin || ""} onChange={(e) => handleInputChange(setBuilderForm, "linkedin", e.target.value)} className={inputClasses(false)} /></div>
                <button type="submit" disabled={builderForm.isSubmitting} className="w-full mt-4 bg-gradient-cta text-text-primary font-medium uppercase tracking-wider py-4 px-8 rounded-lg hover:brightness-105 transition-all disabled:opacity-50">{builderForm.isSubmitting ? "Enviando..." : "Enviar Aplicación"}</button>
              </form>
            )}
          </div>

          {/* FORM 2: Solicitar un Agente */}
          <div id="request-form" className={`bg-surface border border-criteria-border border-t-[3px] border-t-link rounded-2xl p-8 md:p-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "200ms" }}>
            <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-2">Para Clientes</p>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-2">Solicitar un Agente</h3>
            <p className="text-text-secondary text-sm mb-6">Cuéntanos qué servicio profesional necesitas agentizar. Cada solicitud nos ayuda a priorizar qué agentes construir.</p>

            {requestForm.isSubmitted ? (
              <div className="flex items-start gap-3 text-text-secondary">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p>Solicitud recibida. Usamos cada envío para priorizar qué agentes construir. Te notificaremos cuando un agente coincidente se lance.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); validateAndSubmit(requestForm, setRequestForm, ["email", "service"], "https://formspree.io/f/REPLACE_REQUEST_FORM_ID", "agent-request"); }} className="flex flex-col gap-4">
                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Soy:</label>
                  <div className="flex gap-2">
                    {[{ key: "Individual", label: "Particular" }, { key: "Company", label: "Empresa" }].map((option) => (
                      <button key={option.key} type="button" onClick={() => handleInputChange(setRequestForm, "userType", option.key)}
                        className={cn("flex-1 py-2 px-4 rounded-lg border transition-all text-sm", requestForm.data.userType === option.key ? "bg-accent/10 border-accent text-text-primary" : "border-criteria-border text-text-secondary hover:border-accent/50")}>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div><label className="block text-text-secondary text-sm mb-1.5">Correo electrónico *</label><input type="email" placeholder="tu@email.com" value={requestForm.data.email || ""} onChange={(e) => handleInputChange(setRequestForm, "email", e.target.value)} className={inputClasses(requestForm.errors.email)} />{requestForm.errors.email && <p className="text-destructive text-xs mt-1">Obligatorio</p>}</div>
                <div><label className="block text-text-secondary text-sm mb-1.5">¿Qué servicio necesitas? *</label><textarea rows={3} placeholder="Ej. Revisión de contratos para empresas SaaS, evaluación conductual infantil, optimización fiscal para freelancers" value={requestForm.data.service || ""} onChange={(e) => handleInputChange(setRequestForm, "service", e.target.value)} className={cn(inputClasses(requestForm.errors.service), "resize-y")} />{requestForm.errors.service && <p className="text-destructive text-xs mt-1">Obligatorio</p>}</div>
                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">¿Es una necesidad única o recurrente?</label>
                  <div className="flex gap-2">
                    {[{ key: "One-time", label: "Única vez" }, { key: "Recurring", label: "Recurrente" }].map((option) => (
                      <button key={option.key} type="button" onClick={() => handleInputChange(setRequestForm, "frequency", option.key)}
                        className={cn("flex-1 py-2 px-4 rounded-lg border transition-all text-sm", requestForm.data.frequency === option.key ? "bg-accent/10 border-accent text-text-primary" : "border-criteria-border text-text-secondary hover:border-accent/50")}>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">¿Cuánto estarías dispuesto a pagar?</label>
                  <select value={requestForm.data.budget || ""} onChange={(e) => handleInputChange(setRequestForm, "budget", e.target.value)} className={cn(inputClasses(false), "appearance-none bg-background")}>
                    <option value="">Selecciona un rango</option>
                    <option value="Under $50">Menos de $50</option>
                    <option value="$50 to $150">$50 a $150</option>
                    <option value="$150 to $300">$150 a $300</option>
                    <option value="$300 to $500">$300 a $500</option>
                    <option value="$500+">$500+</option>
                    <option value="Not sure yet">No estoy seguro aún</option>
                  </select>
                </div>
                <div><label className="block text-text-secondary text-sm mb-1.5">Nombre de la empresa (opcional)</label><input type="text" placeholder="Opcional" value={requestForm.data.company || ""} onChange={(e) => handleInputChange(setRequestForm, "company", e.target.value)} className={inputClasses(false)} /></div>
                <button type="submit" disabled={requestForm.isSubmitting} className="w-full mt-4 bg-gradient-cta text-text-primary font-medium uppercase tracking-wider py-4 px-8 rounded-lg hover:brightness-105 transition-all disabled:opacity-50">{requestForm.isSubmitting ? "Enviando..." : "Enviar Solicitud"}</button>
              </form>
            )}
          </div>

          {/* FORM 3: Únete al Equipo */}
          <div id="team-form" className={`bg-surface border border-criteria-border border-t-[3px] border-t-criteria-border rounded-2xl p-8 md:p-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "300ms" }}>
            <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-2">Para Talento</p>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-2">Únete al Equipo</h3>
            <p className="text-text-secondary text-sm mb-6">Estamos construyendo la infraestructura para agentes de IA profesionales. Buscamos ingenieros, mentes de producto y diseñadores de servicio que entiendan tanto IA como servicios profesionales.</p>

            {teamForm.isSubmitted ? (
              <div className="flex items-start gap-3 text-text-secondary">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p>Gracias por tu interés. Revisaremos tu perfil y te contactaremos si hay un ajuste.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); validateAndSubmit(teamForm, setTeamForm, ["fullName", "email", "portfolio"], "https://formspree.io/f/REPLACE_TEAM_FORM_ID", "team-application"); }} className="flex flex-col gap-4">
                <div><label className="block text-text-secondary text-sm mb-1.5">Nombre completo *</label><input type="text" placeholder="Tu nombre completo" value={teamForm.data.fullName || ""} onChange={(e) => handleInputChange(setTeamForm, "fullName", e.target.value)} className={inputClasses(teamForm.errors.fullName)} />{teamForm.errors.fullName && <p className="text-destructive text-xs mt-1">Obligatorio</p>}</div>
                <div><label className="block text-text-secondary text-sm mb-1.5">Correo electrónico *</label><input type="email" placeholder="tu@email.com" value={teamForm.data.email || ""} onChange={(e) => handleInputChange(setTeamForm, "email", e.target.value)} className={inputClasses(teamForm.errors.email)} />{teamForm.errors.email && <p className="text-destructive text-xs mt-1">Obligatorio</p>}</div>
                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Rol que te interesa</label>
                  <select value={teamForm.data.role || ""} onChange={(e) => handleInputChange(setTeamForm, "role", e.target.value)} className={cn(inputClasses(false), "appearance-none bg-background")}>
                    <option value="">Selecciona un rol</option>
                    <option value="AI/ML Engineer">Ingeniero AI/ML</option>
                    <option value="Full-stack Engineer">Ingeniero Full-stack</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Service Designer">Diseñador de Servicios</option>
                    <option value="Other">Otro</option>
                  </select>
                </div>
                <div><label className="block text-text-secondary text-sm mb-1.5">URL de LinkedIn o portafolio *</label><input type="text" placeholder="https://" value={teamForm.data.portfolio || ""} onChange={(e) => handleInputChange(setTeamForm, "portfolio", e.target.value)} className={inputClasses(teamForm.errors.portfolio)} />{teamForm.errors.portfolio && <p className="text-destructive text-xs mt-1">Obligatorio</p>}</div>
                <div><label className="block text-text-secondary text-sm mb-1.5">¿Por qué Criteria?</label><textarea rows={3} placeholder="¿Qué te atrae de este problema? ¿Qué experiencia relevante traes?" value={teamForm.data.whyCriteria || ""} onChange={(e) => handleInputChange(setTeamForm, "whyCriteria", e.target.value)} className={cn(inputClasses(false), "resize-y")} /></div>
                <button type="submit" disabled={teamForm.isSubmitting} className="w-full mt-4 bg-transparent border border-accent text-text-secondary font-medium uppercase tracking-wider py-4 px-8 rounded-lg hover:bg-accent/10 transition-all disabled:opacity-50">{teamForm.isSubmitting ? "Enviando..." : "Enviar"}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSectionES;
