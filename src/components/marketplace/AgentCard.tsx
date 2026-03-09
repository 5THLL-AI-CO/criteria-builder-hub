import { cn } from "@/lib/utils";

interface AgentCardProps {
  category: string;
  agentName: string;
  initials: string;
  professional: string;
  description: string;
  calibration: string;
  status: string;
  isComingSoon?: boolean;
  onClick: () => void;
}

const AgentCard = ({
  category,
  agentName,
  initials,
  professional,
  description,
  calibration,
  status,
  isComingSoon = false,
  onClick,
}: AgentCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative bg-surface border border-criteria-border rounded-xl p-8 cursor-pointer transition-all duration-200 flex flex-col h-full",
        isComingSoon
          ? "hover:border-accent/20 hover:opacity-60"
          : "hover:border-accent/30 hover:-translate-y-0.5"
      )}
    >
      {isComingSoon && (
        <div className="absolute top-4 right-4 bg-criteria-border/80 text-text-tertiary text-xs font-medium uppercase tracking-wider px-2 py-1 rounded">
          Coming Soon
        </div>
      )}

      <div className={cn(isComingSoon && "opacity-45")}>
        {/* Category tag */}
        <span className="inline-block bg-criteria-border text-text-tertiary text-xs font-medium uppercase tracking-wider px-2 py-1 rounded">
          {category}
        </span>

        {/* Agent name */}
        <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mt-4">
          {agentName}
        </h3>

        {/* Professional row */}
        <div className="flex items-center gap-3 mt-4">
          <div className="w-10 h-10 rounded-full bg-criteria-border flex items-center justify-center flex-shrink-0">
            <span className="text-text-primary text-sm font-medium">{initials}</span>
          </div>
          <span className="text-text-secondary text-sm">{professional}</span>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-base mt-4 line-clamp-2">
          {description}
        </p>

        {/* Bottom metric row */}
        <div className="border-t border-criteria-border pt-4 mt-auto flex justify-between items-center">
          <span className="font-mono text-sm text-text-secondary">
            Calibration: {calibration}
          </span>
          <span className="font-mono text-sm text-text-secondary">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
