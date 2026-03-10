import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComingSoonModalESProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  category: string;
}

const ComingSoonModalES = ({ isOpen, onClose, agentName, category }: ComingSoonModalESProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError(true); return; }
    setIsSubmitting(true);
    try {
      // Replace REPLACE_REQUEST_FORM_ID with your Formspree endpoint
      const response = await fetch("https://formspree.io/f/xdawarrk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, _agent: agentName, _type: "waitlist" }),
      });
      if (response.ok) setIsSubmitted(true);
    } catch (error) {
      console.error("Error al enviar formulario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/85 flex items-center justify-center p-4" onClick={handleBackdropClick}>
      <div className="relative bg-surface border border-criteria-border rounded-2xl p-8 md:p-12 max-w-md w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors">
          <X className="w-6 h-6" />
        </button>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">{agentName}</h2>
        <span className="inline-block bg-criteria-border text-text-tertiary text-xs font-medium uppercase tracking-wider px-2 py-1 rounded mt-4">{category}</span>
        <p className="text-text-secondary mt-6">
          Este agente está actualmente en desarrollo. Un profesional verificado está siendo incorporado para calibrar este servicio. Únete a la lista de espera para ser notificado cuando se lance.
        </p>
        {isSubmitted ? (
          <div className="flex items-center gap-3 mt-6 text-text-secondary">
            <CheckCircle className="w-5 h-5 text-accent" />
            <p>Estás en la lista. Te notificaremos cuando este agente se lance.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6">
            <input type="email" placeholder="tu@email.com" value={email}
              onChange={(e) => { setEmail(e.target.value); setError(false); }}
              className={cn("w-full bg-background border border-criteria-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent", error && "border-destructive")} />
            {error && <p className="text-destructive text-xs mt-1">Por favor ingresa un correo válido</p>}
            <button type="submit" disabled={isSubmitting}
              className="w-full mt-4 bg-transparent border border-accent text-text-secondary font-medium uppercase tracking-wider py-3 px-6 rounded-lg hover:bg-accent/10 transition-all disabled:opacity-50">
              {isSubmitting ? "Enviando..." : "Notifícame Cuando Esté Disponible"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ComingSoonModalES;
