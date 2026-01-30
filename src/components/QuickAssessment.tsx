import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAssessments } from "@/hooks/useAssessments";

interface QuickAssessmentProps {
  onSubmit: (zipCode: string, currentJob: string) => void;
  onRequireAuth?: () => void;
}

const jobSuggestions = [
  "Uber Driver",
  "Line Cook",
  "Retail Associate",
  "Warehouse Worker",
  "Server",
  "Cashier",
  "Other"
];

const QuickAssessment = ({ onSubmit, onRequireAuth }: QuickAssessmentProps) => {
  const [zipCode, setZipCode] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { submitAssessment, isSubmitting } = useAssessments();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode && currentJob) {
      // Submit to database
      const result = await submitAssessment({
        zipCode,
        currentOccupation: currentJob,
      });

      // If user needs to auth, prompt them but still proceed with UI
      if (result.requiresAuth && onRequireAuth) {
        // Data is saved to localStorage, proceed with local experience
      }

      // Call the parent handler for UI updates
      onSubmit(zipCode, currentJob);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="card-industrial p-6 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="font-semibold mb-4 text-center">Start Your Journey</h3>
      
      <div className="space-y-4">
        {/* Zip Code Input */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Your Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="pl-10 bg-background border-border focus:border-primary"
            maxLength={5}
          />
        </div>
        
        {/* Current Job Input */}
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Current Job (e.g., Uber Driver)"
            value={currentJob}
            onChange={(e) => setCurrentJob(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="pl-10 bg-background border-border focus:border-primary"
          />
          
          {/* Quick suggestions */}
          {showSuggestions && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {jobSuggestions.map((job) => (
                <button
                  key={job}
                  type="button"
                  className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors"
                  onClick={() => {
                    setCurrentJob(job);
                    setShowSuggestions(false);
                  }}
                >
                  {job}
                </button>
              ))}
            </motion.div>
          )}
        </div>
        
        {/* Submit */}
        <Button 
          type="submit" 
          variant="hero" 
          className="w-full"
          disabled={!zipCode || !currentJob || isSubmitting}
        >
          {isSubmitting ? "Finding..." : "Find My Path"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        No experience required. We'll show you the shortest path.
      </p>
    </motion.form>
  );
};

export default QuickAssessment;
