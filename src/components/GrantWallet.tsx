import { motion } from "framer-motion";
import { Wallet, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface GrantSource {
  name: string;
  amount: number;
  type: string;
  eligible: boolean;
}

const grants: GrantSource[] = [
  { name: "CHIPS Workforce Grant", amount: 2500, type: "Federal", eligible: true },
  { name: "Ohio TechCred", amount: 1500, type: "State", eligible: true },
  { name: "Veteran Upskill Program", amount: 500, type: "Federal", eligible: false },
];

interface GrantWalletProps {
  onApplyClick: () => void;
}

const GrantWallet = ({ onApplyClick }: GrantWalletProps) => {
  const totalEligible = grants
    .filter(g => g.eligible)
    .reduce((sum, g) => sum + g.amount, 0);

  return (
    <motion.div
      className="card-industrial p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-2xl" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/20 rounded-lg">
            <Wallet className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold">Grant Wallet</h3>
            <p className="text-xs text-muted-foreground">Auto-calculated eligibility</p>
          </div>
        </div>
        <Sparkles className="w-5 h-5 text-accent animate-pulse" />
      </div>
      
      {/* Total Amount */}
      <div className="mb-6">
        <p className="text-xs text-muted-foreground mb-1">You qualify for</p>
        <p className="stat-value text-accent">
          ${totalEligible.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground">in training grants</p>
      </div>
      
      {/* Grant breakdown */}
      <div className="space-y-3 mb-6">
        {grants.map((grant, index) => (
          <motion.div
            key={grant.name}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              grant.eligible 
                ? "bg-success/5 border-success/20" 
                : "bg-muted/50 border-border opacity-50"
            }`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div>
              <p className={`text-sm font-medium ${grant.eligible ? "text-foreground" : "text-muted-foreground"}`}>
                {grant.name}
              </p>
              <p className="text-xs text-muted-foreground">{grant.type}</p>
            </div>
            <div className="text-right">
              <p className={`font-mono font-semibold ${grant.eligible ? "text-success" : "text-muted-foreground"}`}>
                ${grant.amount.toLocaleString()}
              </p>
              {grant.eligible && (
                <span className="text-[10px] text-success">✓ Eligible</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* CTA */}
      <Button variant="accent" className="w-full group" onClick={onApplyClick}>
        Apply for CHIPS Funding
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};

export default GrantWallet;
