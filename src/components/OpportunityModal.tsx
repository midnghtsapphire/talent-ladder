import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, DollarSign, Clock, Award, Building2, CheckCircle, ArrowRight, Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { useJobApplications } from "@/hooks/useJobApplications";
import { useAuth } from "@/contexts/AuthContext";

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  certRequired: string;
  timeToQualify: string;
}

interface OpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity | null;
  onApply: () => void;
  onRequireAuth?: () => void;
}

const OpportunityModal = ({ isOpen, onClose, opportunity, onApply, onRequireAuth }: OpportunityModalProps) => {
  const { saveOpportunity, applyToJob, isSubmitting } = useJobApplications();
  const { user } = useAuth();

  if (!opportunity) return null;

  const requirements = [
    "High school diploma or equivalent",
    `${opportunity.certRequired} certification`,
    "Ability to work in cleanroom environment",
    "Basic computer skills",
    "Physical ability to stand for extended periods",
  ];

  const benefits = [
    "Full medical, dental, and vision coverage",
    "401(k) with company match",
    "Paid training and certification programs",
    "Relocation assistance available",
    "Career advancement opportunities",
  ];

  const handleSaveForLater = async () => {
    const result = await saveOpportunity({
      jobId: opportunity.id,
      jobTitle: opportunity.title,
      company: opportunity.company,
      location: opportunity.location,
      salaryRange: opportunity.salary,
      certificationRequired: opportunity.certRequired,
    });

    if (result.requiresAuth && onRequireAuth) {
      onRequireAuth();
    }
  };

  const handleApply = async () => {
    const result = await applyToJob({
      jobId: opportunity.id,
      jobTitle: opportunity.title,
      company: opportunity.company,
      location: opportunity.location,
      salaryRange: opportunity.salary,
      certificationRequired: opportunity.certRequired,
    });

    if (result.requiresAuth && onRequireAuth) {
      onRequireAuth();
      return;
    }

    if (result.success) {
      onApply();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <div className="card-industrial p-6 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-primary text-sm mb-2">
                  <Building2 className="w-4 h-4" />
                  {opportunity.company}
                </div>
                <h2 className="text-2xl font-bold mb-3">{opportunity.title}</h2>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {opportunity.location}
                  </div>
                  <div className="flex items-center gap-1 text-success">
                    <DollarSign className="w-4 h-4" />
                    {opportunity.salary}
                  </div>
                  <div className="flex items-center gap-1 text-accent">
                    <Clock className="w-4 h-4" />
                    Qualify in {opportunity.timeToQualify}
                  </div>
                </div>
              </div>

              {/* Certification badge */}
              <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Required Certification</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  This position requires <span className="text-primary font-medium">{opportunity.certRequired}</span>.
                  We'll help you get certified for free with available grants.
                </p>
              </div>

              {/* Two columns */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Requirements */}
                <div>
                  <h3 className="font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="font-semibold mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <Button 
                  variant="hero" 
                  className="flex-1" 
                  onClick={handleApply}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Start My Path to This Job"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSaveForLater}
                  disabled={isSubmitting}
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save for Later
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OpportunityModal;
