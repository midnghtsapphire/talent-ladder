import { motion } from "framer-motion";
import { Award, Briefcase, DollarSign, Gamepad2, CheckCircle } from "lucide-react";

interface LadderStep {
  id: number;
  title: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
  status: "completed" | "current" | "locked";
}

const steps: LadderStep[] = [
  {
    id: 1,
    title: "Certify",
    description: "Get CMfgA Certification",
    detail: "Cost: $75 or FREE with Grant • Time: 2 Weeks",
    icon: <Award className="w-5 h-5" />,
    status: "current",
  },
  {
    id: 2,
    title: "Simulate",
    description: "Virtual Cleanroom Training",
    detail: "Complete safety & protocol modules",
    icon: <Gamepad2 className="w-5 h-5" />,
    status: "locked",
  },
  {
    id: 3,
    title: "Apply",
    description: "Match with Employers",
    detail: "34 jobs match your profile in Phoenix, AZ",
    icon: <Briefcase className="w-5 h-5" />,
    status: "locked",
  },
  {
    id: 4,
    title: "Earn",
    description: "Start Your New Career",
    detail: "Starting Salary: $65,000+",
    icon: <DollarSign className="w-5 h-5" />,
    status: "locked",
  },
];

const CareerLadder = () => {
  return (
    <div className="relative py-8">
      {/* Vertical line connecting steps */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border" />
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="relative pl-20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Step indicator */}
            <div
              className={`absolute left-4 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                step.status === "completed"
                  ? "bg-success border-success text-background"
                  : step.status === "current"
                  ? "bg-primary border-primary text-primary-foreground glow-primary"
                  : "bg-secondary border-border text-muted-foreground"
              }`}
            >
              {step.status === "completed" ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className="font-mono text-sm">{step.id}</span>
              )}
            </div>
            
            {/* Content card */}
            <motion.div
              className={`card-industrial p-4 ${
                step.status === "current" ? "border-primary/50" : ""
              }`}
              whileHover={{ scale: step.status !== "locked" ? 1.02 : 1 }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    step.status === "current"
                      ? "bg-primary/20 text-primary"
                      : step.status === "completed"
                      ? "bg-success/20 text-success"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-semibold ${
                      step.status === "locked" ? "text-muted-foreground" : "text-foreground"
                    }`}>
                      {step.title}
                    </h4>
                    {step.status === "current" && (
                      <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                        Next Step
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${
                    step.status === "locked" ? "text-muted-foreground/60" : "text-foreground/80"
                  }`}>
                    {step.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">
                    {step.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CareerLadder;
