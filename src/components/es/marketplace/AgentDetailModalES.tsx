import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AgentDetailData } from "@/components/marketplace/agentData";

interface AgentDetailModalESProps {
  isOpen: boolean;
  onClose: () => void;
  agent: AgentDetailData;
}

const AgentDetailModalES = ({ isOpen, onClose, agent }: AgentDetailModalESProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    agent.formFields.forEach((field) => {
      if (field.required && !formData[field.name]?.trim()) newErrors[field.name] = true;
    });
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setIsSubmitting(true);
    try {
      // Replace REPLACE_REQUEST_FORM_ID with your Formspree endpoint
      const response = await fetch("https://formspree.io/f/REPLACE_REQUEST_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, _agent: agent.agentName, _type: "consultation-request" }),
      });
      if (response.ok) setIsSubmitted(true);
    } catch (error) {
      console.error("Error al enviar formulario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/85 flex items-center justify-center p-4 overflow-y-auto" onClick={handleBackdropClick}>
      <div className="relative bg-surface border border-criteria-border rounded-2xl p-8 md:p-12 max-w-4xl w-full my-8 animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 md:gap-12">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-criteria-border border-2 border-criteria-border flex items-center justify-center flex-shrink-0">
                <span className="text-text-primary text-2xl font-medium">{agent.initials}</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-text-primary flex items-center gap-2">
                  {agent.name}
                  <CheckCircle className="w-4 h-4 text-accent" />
                </h3>
                <p className="text-text-secondary text-base">{agent.credential}</p>
                <p className="text-text-tertiary text-sm">{agent.location}</p>
              </div>
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mt-6">{agent.agentName}</h2>
            <p className="text-text-secondary text-base mt-3 max-w-xl">{agent.description}</p>

            <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mt-8">Lo que hace este agente</p>
            <div className="flex flex-col gap-2 mt-4">
              {agent.steps.map((step, index) => (
                <div key={index} className="bg-background border border-criteria-border rounded-lg p-4 flex gap-3">
                  <span className="font-mono text-accent text-sm">0{index + 1}</span>
                  <p className="text-text-secondary text-sm">{step}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-8 mt-8">
              {agent.metrics.map((metric, index) => (
                <div key={index}>
                  <p className="font-mono text-xl text-text-primary">{metric.value}</p>
                  <p className="text-text-tertiary text-xs uppercase tracking-wider">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background border border-criteria-border rounded-xl p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-text-primary">{agent.formHeader}</h3>
            {isSubmitted ? (
              <div className="flex items-center gap-3 mt-6 text-text-secondary">
                <CheckCircle className="w-5 h-5 text-accent" />
                <p>Solicitud recibida. Nos pondremos en contacto en 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                {agent.formFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-text-secondary text-sm mb-1.5">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea rows={3} placeholder={field.placeholder} value={formData[field.name] || ""} onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className={cn("w-full bg-surface border border-criteria-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent resize-y", errors[field.name] && "border-destructive")} />
                    ) : (
                      <input type="text" placeholder={field.placeholder} value={formData[field.name] || ""} onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className={cn("w-full bg-surface border border-criteria-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent", errors[field.name] && "border-destructive")} />
                    )}
                    {errors[field.name] && <p className="text-destructive text-xs mt-1">Este campo es obligatorio</p>}
                  </div>
                ))}

                <div className="border-t border-criteria-border pt-4 mt-2">
                  {agent.pricing.map((item, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                      <span className="text-text-secondary text-sm">{item.label}</span>
                      <span className="font-mono text-text-primary text-lg">{item.price}</span>
                    </div>
                  ))}
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-gradient-cta text-text-primary font-medium uppercase tracking-wider py-4 px-8 rounded-lg hover:brightness-105 transition-all disabled:opacity-50 mt-4">
                  {isSubmitting ? "Enviando..." : agent.ctaText}
                </button>
                <p className="text-text-tertiary text-xs text-center">Resultado entregado en 1 hora. Tus datos se manejan de forma segura.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailModalES;
