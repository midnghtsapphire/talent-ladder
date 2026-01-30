import { motion } from "framer-motion";
import { MapPin, Building2, Users, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { HotspotData } from "./USHeatMap";

interface HotspotCardProps {
  hotspot: HotspotData;
  onClose: () => void;
}

const HotspotCard = ({ hotspot, onClose }: HotspotCardProps) => {
  return (
    <motion.div
      className="card-industrial p-6 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
      >
        ×
      </button>
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">
          {hotspot.name}, {hotspot.state}
        </h3>
      </div>
      
      {/* Anchor tenant */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-primary/10 rounded-lg">
        <Building2 className="w-4 h-4 text-primary" />
        <span className="text-sm">
          Anchor: <span className="font-semibold text-primary">{hotspot.anchor}</span>
        </span>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
            <Users className="w-3 h-3" />
            Open Positions
          </div>
          <p className="font-mono text-xl font-semibold text-foreground">
            {hotspot.jobs.toLocaleString()}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
            <TrendingUp className="w-3 h-3" />
            Investment
          </div>
          <p className="font-mono text-xl font-semibold text-accent">
            {hotspot.investment}
          </p>
        </div>
      </div>
      
      {/* CTA */}
      <Button variant="glow" className="w-full">
        Explore {hotspot.name} Opportunities
      </Button>
    </motion.div>
  );
};

export default HotspotCard;
