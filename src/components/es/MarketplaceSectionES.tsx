import { useState, useEffect } from "react";
import AgentCardES from "./marketplace/AgentCardES";
import AgentDetailModalES from "./marketplace/AgentDetailModalES";
import ComingSoonModalES from "./marketplace/ComingSoonModalES";
import { agentsES, agentDetailsES } from "./marketplace/agentDataES";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const MarketplaceSectionES = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [comingSoonAgent, setComingSoonAgent] = useState<{ name: string; category: string } | null>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal();

  useEffect(() => {
    if (selectedAgentId || comingSoonAgent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedAgentId, comingSoonAgent]);

  const handleCardClick = (agent: typeof agentsES[0]) => {
    if (agent.isComingSoon) {
      setComingSoonAgent({ name: agent.agentName, category: agent.category });
    } else {
      setSelectedAgentId(agent.id);
    }
  };

  return (
    <>
      <div className="h-[200px] bg-gradient-to-b from-background to-[#0E0E24]" />
      <section id="marketplace" ref={sectionRef} className="bg-[#0E0E24] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4">Explora el Marketplace</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">Donde el criterio profesional se vuelve accesible</h2>
            <p className="text-text-secondary text-lg md:text-xl mt-6 max-w-2xl mx-auto">
              Cada agente es construido por un profesional verificado. Cada resultado es calibrado contra casos reales. Explora por profesión, especialidad o necesidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agentsES.map((agent, index) => (
              <div key={agent.id} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: `${index * 100}ms` }}>
                <AgentCardES {...agent} onClick={() => handleCardClick(agent)} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="h-[200px] bg-gradient-to-b from-[#0E0E24] to-background" />

      {selectedAgentId && agentDetailsES[selectedAgentId] && (
        <AgentDetailModalES isOpen={true} onClose={() => setSelectedAgentId(null)} agent={agentDetailsES[selectedAgentId]} />
      )}
      {comingSoonAgent && (
        <ComingSoonModalES isOpen={true} onClose={() => setComingSoonAgent(null)} agentName={comingSoonAgent.name} category={comingSoonAgent.category} />
      )}
    </>
  );
};

export default MarketplaceSectionES;
