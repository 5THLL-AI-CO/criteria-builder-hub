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

const initialFormState: FormState = {
  data: {},
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
};

const GetInvolvedSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [builderForm, setBuilderForm] = useState<FormState>(initialFormState);
  const [requestForm, setRequestForm] = useState<FormState>(initialFormState);
  const [teamForm, setTeamForm] = useState<FormState>(initialFormState);

  const handleInputChange = (
    formSetter: React.Dispatch<React.SetStateAction<FormState>>,
    name: string,
    value: string
  ) => {
    formSetter((prev) => ({
      ...prev,
      data: { ...prev.data, [name]: value },
      errors: { ...prev.errors, [name]: false },
    }));
  };

  const validateAndSubmit = async (
    formState: FormState,
    formSetter: React.Dispatch<React.SetStateAction<FormState>>,
    requiredFields: string[],
    endpoint: string,
    hiddenType: string
  ) => {
    const newErrors: Record<string, boolean> = {};
    requiredFields.forEach((field) => {
      if (!formState.data[field]?.trim()) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      formSetter((prev) => ({ ...prev, errors: newErrors }));
      return;
    }

    formSetter((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState.data,
          _type: hiddenType,
        }),
      });

      if (response.ok) {
        formSetter((prev) => ({ ...prev, isSubmitted: true, isSubmitting: false }));
      }
    } catch (error) {
      console.error("Form submission error:", error);
      formSetter((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const inputClasses = (hasError: boolean) =>
    cn(
      "w-full bg-background border border-criteria-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent",
      hasError && "border-destructive"
    );

  return (
    <section
      id="get-involved"
      ref={ref}
      className="bg-background py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-4">
            Get Involved
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Three ways to be part of what we're building
          </h2>
        </div>

        {/* Three forms */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* FORM 1: Become a Builder */}
          <div
            id="builder-form"
            className={`bg-surface border border-criteria-border border-t-[3px] border-t-accent rounded-2xl p-8 md:p-10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-2">
              For Professionals
            </p>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-2">
              Become a Builder
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              Apply to encode your professional judgment into a Criteria agent. We accept experienced professionals who can demonstrate elite-level expertise in their field.
            </p>

            {builderForm.isSubmitted ? (
              <div className="flex items-start gap-3 text-text-secondary">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p>Application received. We review every submission personally. Expect a response within 5 business days.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Replace mjgagqqv with your Formspree endpoint for builder applications
                  validateAndSubmit(
                    builderForm,
                    setBuilderForm,
                    ["fullName", "email", "profession", "expertise"],
                    "https://formspree.io/f/mjgagqqv",
                    "builder-application"
                  );
                }}
                className="flex flex-col gap-4"
              >
                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Full name *</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={builderForm.data.fullName || ""}
                    onChange={(e) => handleInputChange(setBuilderForm, "fullName", e.target.value)}
                    className={inputClasses(builderForm.errors.fullName)}
                  />
                  {builderForm.errors.fullName && <p className="text-destructive text-xs mt-1">Required</p>}
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Email *</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={builderForm.data.email || ""}
                    onChange={(e) => handleInputChange(setBuilderForm, "email", e.target.value)}
                    className={inputClasses(builderForm.errors.email)}
                  />
                  {builderForm.errors.email && <p className="text-destructive text-xs mt-1">Required</p>}
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Profession and specialization *</label>
                  <input
                    type="text"
                    placeholder="e.g. Commercial Lawyer, M&A"
                    value={builderForm.data.profession || ""}
                    onChange={(e) => handleInputChange(setBuilderForm, "profession", e.target.value)}
                    className={inputClasses(builderForm.errors.profession)}
                  />
                  {builderForm.errors.profession && <p className="text-destructive text-xs mt-1">Required</p>}
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Years of experience</label>
                  <input
                    type="text"
                    placeholder="e.g. 13"
                    value={builderForm.data.years || ""}
                    onChange={(e) => handleInputChange(setBuilderForm, "years", e.target.value)}
                    className={inputClasses(false)}
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Why are you an elite professional in your field? *</label>
                  <textarea
                    rows={4}
                    placeholder="Describe what makes your expertise distinctive. What do you know that generic AI cannot replicate?"
                    value={builderForm.data.expertise || ""}
                    onChange={(e) => handleInputChange(setBuilderForm, "expertise", e.target.value)}
                    className={cn(inputClasses(builderForm.errors.expertise), "resize-y")}
                  />
                  {builderForm.errors.expertise && <p className="text-destructive text-xs mt-1">Required</p>}
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">What agent would you like to build?</label>
                  <textarea
                    rows={3}
                    placeholder="Describe the service you want to agentize and who would use it."
                    value={builderForm.data.agentIdea || ""}
                    onChange={(e) => handleInputChange(setBuilderForm, "agentIdea", e.target.value)}
                    className={cn(inputClasses(false), "resize-y")}
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">LinkedIn profile URL</label>
                  <input
                    type="text"
                    placeholder="https://linkedin.com/in/"
                    value={builderForm.data.linkedin || ""}
                    onChange={(e) => handleInputChange(setBuilderForm, "linkedin", e.target.value)}
                    className={inputClasses(false)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={builderForm.isSubmitting}
                  className="w-full mt-4 bg-gradient-cta text-text-primary font-medium uppercase tracking-wider py-4 px-8 rounded-lg hover:brightness-105 transition-all disabled:opacity-50"
                >
                  {builderForm.isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>

          {/* FORM 2: Request an Agent */}
          <div
            id="request-form"
            className={`bg-surface border border-criteria-border border-t-[3px] border-t-link rounded-2xl p-8 md:p-10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-2">
              For Clients
            </p>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-2">
              Request an Agent
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              Tell us what professional service you need agentized. Every request helps us prioritize which agents to build next.
            </p>

            {requestForm.isSubmitted ? (
              <div className="flex items-start gap-3 text-text-secondary">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p>Request received. We use every submission to prioritize which agents to build. We'll notify you when a matching agent launches.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Replace xdawarrk with your Formspree endpoint for agent requests
                  validateAndSubmit(
                    requestForm,
                    setRequestForm,
                    ["email", "service"],
                    "https://formspree.io/f/xdawarrk",
                    "agent-request"
                  );
                }}
                className="flex flex-col gap-4"
              >
                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">I am a:</label>
                  <div className="flex gap-2">
                    {["Individual", "Company"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleInputChange(setRequestForm, "userType", option)}
                        className={cn(
                          "flex-1 py-2 px-4 rounded-lg border transition-all text-sm",
                          requestForm.data.userType === option
                            ? "bg-accent/10 border-accent text-text-primary"
                            : "border-criteria-border text-text-secondary hover:border-accent/50"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Email *</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={requestForm.data.email || ""}
                    onChange={(e) => handleInputChange(setRequestForm, "email", e.target.value)}
                    className={inputClasses(requestForm.errors.email)}
                  />
                  {requestForm.errors.email && <p className="text-destructive text-xs mt-1">Required</p>}
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">What service do you need? *</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Contract review for SaaS companies, child behavioral assessment, tax optimization for freelancers"
                    value={requestForm.data.service || ""}
                    onChange={(e) => handleInputChange(setRequestForm, "service", e.target.value)}
                    className={cn(inputClasses(requestForm.errors.service), "resize-y")}
                  />
                  {requestForm.errors.service && <p className="text-destructive text-xs mt-1">Required</p>}
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Is this a one-time need or recurring?</label>
                  <div className="flex gap-2">
                    {["One-time", "Recurring"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleInputChange(setRequestForm, "frequency", option)}
                        className={cn(
                          "flex-1 py-2 px-4 rounded-lg border transition-all text-sm",
                          requestForm.data.frequency === option
                            ? "bg-accent/10 border-accent text-text-primary"
                            : "border-criteria-border text-text-secondary hover:border-accent/50"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">What would you be willing to pay?</label>
                  <select
                    value={requestForm.data.budget || ""}
                    onChange={(e) => handleInputChange(setRequestForm, "budget", e.target.value)}
                    className={cn(inputClasses(false), "appearance-none bg-background")}
                  >
                    <option value="">Select a range</option>
                    <option value="Under $50">Under $50</option>
                    <option value="$50 to $150">$50 to $150</option>
                    <option value="$150 to $300">$150 to $300</option>
                    <option value="$300 to $500">$300 to $500</option>
                    <option value="$500+">$500+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Company name (optional)</label>
                  <input
                    type="text"
                    placeholder="Optional"
                    value={requestForm.data.company || ""}
                    onChange={(e) => handleInputChange(setRequestForm, "company", e.target.value)}
                    className={inputClasses(false)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={requestForm.isSubmitting}
                  className="w-full mt-4 bg-gradient-cta text-text-primary font-medium uppercase tracking-wider py-4 px-8 rounded-lg hover:brightness-105 transition-all disabled:opacity-50"
                >
                  {requestForm.isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            )}
          </div>

          {/* FORM 3: Join Our Team */}
          <div
            id="team-form"
            className={`bg-surface border border-criteria-border border-t-[3px] border-t-criteria-border rounded-2xl p-8 md:p-10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <p className="text-text-tertiary text-xs font-medium uppercase tracking-wider mb-2">
              For Talent
            </p>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-2">
              Join Our Team
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              We're building the infrastructure for professional AI agents. We're looking for engineers, product minds, and service designers who understand both AI and professional services.
            </p>

            {teamForm.isSubmitted ? (
              <div className="flex items-start gap-3 text-text-secondary">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p>Thanks for your interest. We'll review your profile and reach out if there's a fit.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Replace REPLACE_TEAM_FORM_ID with your Formspree endpoint for team applications
                  validateAndSubmit(
                    teamForm,
                    setTeamForm,
                    ["fullName", "email", "portfolio"],
                    "https://formspree.io/f/mlgpgyyb",
                    "team-application"
                  );
                }}
                className="flex flex-col gap-4"
              >
                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Full name *</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={teamForm.data.fullName || ""}
                    onChange={(e) => handleInputChange(setTeamForm, "fullName", e.target.value)}
                    className={inputClasses(teamForm.errors.fullName)}
                  />
                  {teamForm.errors.fullName && <p className="text-destructive text-xs mt-1">Required</p>}
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Email *</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={teamForm.data.email || ""}
                    onChange={(e) => handleInputChange(setTeamForm, "email", e.target.value)}
                    className={inputClasses(teamForm.errors.email)}
                  />
                  {teamForm.errors.email && <p className="text-destructive text-xs mt-1">Required</p>}
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Role you're interested in</label>
                  <select
                    value={teamForm.data.role || ""}
                    onChange={(e) => handleInputChange(setTeamForm, "role", e.target.value)}
                    className={cn(inputClasses(false), "appearance-none bg-background")}
                  >
                    <option value="">Select a role</option>
                    <option value="AI/ML Engineer">AI/ML Engineer</option>
                    <option value="Full-stack Engineer">Full-stack Engineer</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Service Designer">Service Designer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">LinkedIn or portfolio URL *</label>
                  <input
                    type="text"
                    placeholder="https://"
                    value={teamForm.data.portfolio || ""}
                    onChange={(e) => handleInputChange(setTeamForm, "portfolio", e.target.value)}
                    className={inputClasses(teamForm.errors.portfolio)}
                  />
                  {teamForm.errors.portfolio && <p className="text-destructive text-xs mt-1">Required</p>}
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">Why Criteria?</label>
                  <textarea
                    rows={3}
                    placeholder="What draws you to this problem? What relevant experience do you bring?"
                    value={teamForm.data.whyCriteria || ""}
                    onChange={(e) => handleInputChange(setTeamForm, "whyCriteria", e.target.value)}
                    className={cn(inputClasses(false), "resize-y")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={teamForm.isSubmitting}
                  className="w-full mt-4 bg-transparent border border-accent text-text-secondary font-medium uppercase tracking-wider py-4 px-8 rounded-lg hover:bg-accent/10 transition-all disabled:opacity-50"
                >
                  {teamForm.isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
