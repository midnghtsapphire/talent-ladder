import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, DollarSign, Clock, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import OpportunityModal from "./OpportunityModal";
import { useToast } from "@/hooks/use-toast";

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  certRequired: string;
  timeToQualify: string;
}

const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "Semiconductor Equipment Technician",
    company: "TSMC Arizona",
    location: "Phoenix, AZ",
    salary: "$68,000 - $82,000",
    certRequired: "CMfgT + NIMS Level 1",
    timeToQualify: "8 weeks",
  },
  {
    id: "2",
    title: "CNC Machinist - Tool & Die",
    company: "Intel Corporation",
    location: "Columbus, OH",
    salary: "$62,000 - $78,000",
    certRequired: "NIMS CNC Milling",
    timeToQualify: "6 weeks",
  },
  {
    id: "3",
    title: "Metrology Technician",
    company: "Samsung Austin",
    location: "Taylor, TX",
    salary: "$58,000 - $72,000",
    certRequired: "CMfgA",
    timeToQualify: "4 weeks",
  },
  {
    id: "4",
    title: "Cleanroom Process Technician",
    company: "Micron Technology",
    location: "Syracuse, NY",
    salary: "$55,000 - $68,000",
    certRequired: "CMfgA",
    timeToQualify: "3 weeks",
  },
];

interface OpportunitiesCarouselProps {
  onScrollToAssessment?: () => void;
}

const OpportunitiesCarousel = ({ onScrollToAssessment }: OpportunitiesCarouselProps) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { toast } = useToast();

  const handleViewPath = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
  };

  const handleApply = () => {
    setSelectedOpportunity(null);
    toast({
      title: "Great choice!",
      description: "Let's start by assessing your current skills.",
    });
    onScrollToAssessment?.();
  };

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {opportunities.map((opp, index) => (
          <motion.div
            key={opp.id}
            className="flex-shrink-0 w-80 card-industrial p-5 snap-start"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onViewportEnter={() => setActiveIndex(index)}
          >
            {/* Header */}
            <div className="mb-4">
              <h4 className="font-semibold text-foreground mb-1 line-clamp-1">
                {opp.title}
              </h4>
              <p className="text-sm text-primary">{opp.company}</p>
            </div>
            
            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {opp.location}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-3 h-3 text-success" />
                <span className="text-success font-medium">{opp.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                Qualify in {opp.timeToQualify}
              </div>
            </div>
            
            {/* Cert badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                Requires: {opp.certRequired}
              </span>
            </div>
            
            {/* CTA */}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full group"
              onClick={() => handleViewPath(opp)}
            >
              View Path
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="flex justify-center gap-1 mt-4">
        {opportunities.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === activeIndex ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* Modal */}
      <OpportunityModal
        isOpen={!!selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        opportunity={selectedOpportunity}
        onApply={handleApply}
      />
    </div>
  );
};

export default OpportunitiesCarousel;
