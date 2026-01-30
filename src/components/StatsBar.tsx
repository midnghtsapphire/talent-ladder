import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

const stats: Stat[] = [
  { label: "CHIPS Act Investment", value: "$280", suffix: "B+" },
  { label: "Technicians Needed", value: "100", suffix: "K" },
  { label: "Average Starting Salary", value: "$65", suffix: "K" },
  { label: "Training Time", value: "6", suffix: " weeks" },
];

const StatsBar = () => {
  return (
    <div className="border-y border-border bg-secondary/30">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="stat-value text-primary mb-1">
                {stat.value}
                <span className="text-2xl text-accent">{stat.suffix}</span>
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
