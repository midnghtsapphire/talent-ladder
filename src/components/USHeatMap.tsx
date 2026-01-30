import { motion } from "framer-motion";

interface HotspotData {
  id: string;
  name: string;
  state: string;
  x: number;
  y: number;
  jobs: number;
  investment: string;
  anchor: string;
}

const hotspots: HotspotData[] = [
  { id: "phoenix", name: "Phoenix", state: "AZ", x: 22, y: 58, jobs: 21000, investment: "$65B", anchor: "TSMC" },
  { id: "taylor", name: "Taylor", state: "TX", x: 42, y: 68, jobs: 18000, investment: "$40B", anchor: "Samsung" },
  { id: "columbus", name: "Columbus", state: "OH", x: 70, y: 42, jobs: 15000, investment: "$100B", anchor: "Intel" },
  { id: "syracuse", name: "Syracuse", state: "NY", x: 80, y: 30, jobs: 12000, investment: "$50B", anchor: "Micron" },
];

interface USHeatMapProps {
  onSelectHotspot?: (hotspot: HotspotData | null) => void;
  selectedHotspot?: string | null;
}

const USHeatMap = ({ onSelectHotspot, selectedHotspot }: USHeatMapProps) => {
  return (
    <div className="relative w-full aspect-[1.8/1] max-w-4xl mx-auto">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl" />
      
      {/* Simplified US Map outline */}
      <svg
        viewBox="0 0 100 60"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* US Outline - Simplified */}
        <path
          d="M5,20 L15,15 L25,12 L35,10 L50,10 L65,12 L75,15 L85,18 L92,22 L95,30 L93,38 L90,45 L85,50 L75,52 L65,50 L55,48 L45,50 L35,52 L25,50 L15,48 L8,42 L5,35 L5,20 Z"
          fill="hsl(var(--secondary))"
          stroke="hsl(var(--border))"
          strokeWidth="0.5"
          className="opacity-60"
        />
        
        {/* Grid overlay */}
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="hsl(var(--border))" strokeWidth="0.1" opacity="0.3"/>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100" height="60" fill="url(#grid)" />
        
        {/* Hotspot dots with pulsing animation */}
        {hotspots.map((spot, index) => (
          <g key={spot.id}>
            {/* Outer glow ring */}
            <motion.circle
              cx={spot.x}
              cy={spot.y}
              r="4"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.5"
              initial={{ opacity: 0.3, scale: 1 }}
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            />
            {/* Inner dot */}
            <motion.circle
              cx={spot.x}
              cy={spot.y}
              r="2"
              fill={selectedHotspot === spot.id ? "hsl(var(--accent))" : "hsl(var(--primary))"}
              className="cursor-pointer"
              whileHover={{ scale: 1.5 }}
              onClick={() => onSelectHotspot?.(selectedHotspot === spot.id ? null : spot)}
            />
            {/* Jobs count label */}
            <text
              x={spot.x}
              y={spot.y - 5}
              textAnchor="middle"
              className="text-[2px] fill-foreground font-mono"
            >
              {(spot.jobs / 1000).toFixed(0)}K jobs
            </text>
          </g>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Active Investment Zone</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>Selected</span>
        </div>
      </div>
      
      {/* Stats display */}
      <motion.div 
        className="absolute top-4 right-4 text-right"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="font-mono text-2xl font-bold text-primary">84,000+</p>
        <p className="text-xs text-muted-foreground">Open Positions</p>
      </motion.div>
    </div>
  );
};

export { USHeatMap, type HotspotData };
