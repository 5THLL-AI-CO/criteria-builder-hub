import { useState, useEffect } from "react";
import AgentCard from "./marketplace/AgentCard";
import AgentDetailModal from "./marketplace/AgentDetailModal";
import ComingSoonModal from "./marketplace/ComingSoonModal";
import { agents, agentDetails } from "./marketplace/agentData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const MarketplaceSection = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [comingSoonAgent, setComingSoonAgent] = useState<{ name: string; category: string } | null>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedAgentId || comingSoonAgent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedAgentId, comingSoonAgent]);

  const handleCardClick = (agent: typeof agents[0]) => {
    if (agent.isComingSoon) {
      setComingSoonAgent({ name: agent.agentName, category: agent.category });
    } else {
      setSelectedAgentId(agent.id);
    }
  };

  return (
    <>
      {/* Gradient transition at start */}
      <div className="h-[200px] bg-gradient-to-b from-background to-[#0E0E24]" />

      <section
        id="marketplace"
        ref={sectionRef}
        className="bg-[#0E0E24] py-20 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div
            className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4">
              Explore the Marketplace
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
              Where professional judgment becomes accessible
            </h2>
            <p className="text-text-secondary text-lg md:text-xl mt-6 max-w-2xl mx-auto">
              Every agent is built by a verified professional. Every output is calibrated against real cases. Browse by profession, specialty, or need.
            </p>
          </div>

          {/* Agent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent, index) => (
              <div
                key={agent.id}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <AgentCard
                  category={agent.category}
                  agentName={agent.agentName}
                  initials={agent.initials}
                  professional={agent.professional}
                  description={agent.description}
                  calibration={agent.calibration}
                  status={agent.status}
                  isComingSoon={agent.isComingSoon}
                  onClick={() => handleCardClick(agent)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient transition at end */}
      <div className="h-[200px] bg-gradient-to-b from-[#0E0E24] to-background" />

      {/* Detail Modal */}
      {selectedAgentId && agentDetails[selectedAgentId] && (
        <AgentDetailModal
          isOpen={true}
          onClose={() => setSelectedAgentId(null)}
          agent={agentDetails[selectedAgentId]}
        />
      )}

      {/* Coming Soon Modal */}
      {comingSoonAgent && (
        <ComingSoonModal
          isOpen={true}
          onClose={() => setComingSoonAgent(null)}
          agentName={comingSoonAgent.name}
          category={comingSoonAgent.category}
        />
      )}
    </>
  );
};

export default MarketplaceSection;
