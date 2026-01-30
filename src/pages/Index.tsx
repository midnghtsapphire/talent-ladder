import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { USHeatMap, HotspotData } from "@/components/USHeatMap";
import HotspotCard from "@/components/HotspotCard";
import QuickAssessment from "@/components/QuickAssessment";
import CareerLadder from "@/components/CareerLadder";
import GrantWallet from "@/components/GrantWallet";
import StatsBar from "@/components/StatsBar";
import OpportunitiesCarousel from "@/components/OpportunitiesCarousel";
import AuthModal from "@/components/AuthModal";
import GrantApplicationModal from "@/components/GrantApplicationModal";
import { Button } from "@/components/ui/button";
import { ArrowDown, Cpu, Award, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useAssessments } from "@/hooks/useAssessments";

const Index = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotData | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [grantModalOpen, setGrantModalOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { submitPendingAssessment } = useAssessments();

  // Refs for scroll navigation
  const assessmentRef = useRef<HTMLDivElement>(null);
  const careersRef = useRef<HTMLDivElement>(null);
  const opportunitiesRef = useRef<HTMLDivElement>(null);
  const grantsRef = useRef<HTMLDivElement>(null);

  // Submit pending assessment when user logs in
  useEffect(() => {
    if (user) {
      submitPendingAssessment();
    }
  }, [user]);

  const handleAssessmentSubmit = (zipCode: string, currentJob: string) => {
    console.log("Assessment submitted:", { zipCode, currentJob });
    setHasStarted(true);
    toast({
      title: "Assessment Complete!",
      description: `We found opportunities near ${zipCode} for ${currentJob}s.`,
    });
    careersRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSignIn = () => {
    setAuthMode("signin");
    setAuthModalOpen(true);
  };

  const handleGetStarted = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  const handleNavigate = (section: string) => {
    switch (section) {
      case "certifications":
      case "careers":
        careersRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "opportunities":
        opportunitiesRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "grants":
        grantsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "employers":
        toast({
          title: "Employer Portal",
          description: "Our employer portal is coming soon. Contact us for early access!",
        });
        break;
      default:
        break;
    }
  };

  const scrollToAssessment = () => {
    assessmentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCareerStepClick = (stepId: number, stepTitle: string) => {
    toast({
      title: `Starting: ${stepTitle}`,
      description: "Let's begin this step of your career journey!",
    });
  };

  const handleFindCareerPath = () => {
    assessmentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleExploreGrants = () => {
    grantsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRequireAuth = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSignIn={handleSignIn}
        onGetStarted={handleGetStarted}
        onNavigate={handleNavigate}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 circuit-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Cpu className="w-4 h-4" />
                <span>Powered by the CHIPS Act</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                The Machines Cost{" "}
                <span className="text-gradient-accent">$300 Million.</span>
                <br />
                They Need{" "}
                <span className="text-gradient-primary">You</span>
                {" "}to Fix Them.
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                No experience? No problem. We'll map your path from where you are to a 
                $65K+ career in semiconductor manufacturing—with grants to pay for it.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" onClick={handleFindCareerPath}>
                  Find My Career Path
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </Button>
                <Button variant="outline" size="xl" onClick={() => handleNavigate("employers")}>
                  For Employers
                </Button>
              </div>
            </motion.div>
            
            {/* Right: Map + Assessment */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <USHeatMap
                onSelectHotspot={setSelectedHotspot}
                selectedHotspot={selectedHotspot?.id}
              />
              
              {/* Hotspot detail card */}
              <AnimatePresence>
                {selectedHotspot && (
                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <HotspotCard
                      hotspot={selectedHotspot}
                      onClose={() => setSelectedHotspot(null)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Bar */}
      <StatsBar />
      
      {/* Quick Assessment Section */}
      <section ref={assessmentRef} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
        <div className="container relative">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Path Starts <span className="text-primary">Here</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter your zip code and current role. We'll calculate your fastest route to a high-paying tech career.
            </p>
          </motion.div>
          
          <QuickAssessment 
            onSubmit={handleAssessmentSubmit} 
            onRequireAuth={handleRequireAuth}
          />
        </div>
      </section>
      
      {/* Career Ladder + Grant Wallet */}
      <section ref={careersRef} className="py-20 bg-secondary/10">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your <span className="text-primary">Personalized</span> Roadmap
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow the ladder. Each step brings you closer to a career that pays.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Ladder */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Career Ladder</h3>
              </div>
              <CareerLadder onStepClick={handleCareerStepClick} />
            </div>
            
            {/* Grant Wallet */}
            <div ref={grantsRef}>
              <div className="flex items-center gap-2 mb-6">
                <Wallet className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Your Funding</h3>
              </div>
              <GrantWallet onApplyClick={() => setGrantModalOpen(true)} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Opportunities Carousel */}
      <section ref={opportunitiesRef} className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-accent">Opportunities</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real jobs at real companies. See how fast you can qualify.
            </p>
          </motion.div>
          
          <OpportunitiesCarousel 
            onScrollToAssessment={scrollToAssessment}
            onRequireAuth={handleRequireAuth}
          />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container relative">
          <motion.div
            className="card-industrial p-8 md:p-12 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Climb?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join 10,000+ workers who've found their path to high-paying industrial careers. 
              The CHIPS Act is creating opportunities. Will you grab one?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" onClick={scrollToAssessment}>
                Start My Free Assessment
              </Button>
              <Button variant="accent" size="xl" onClick={handleExploreGrants}>
                Explore Grants
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer onNavigate={handleNavigate} />

      {/* Modals */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialMode={authMode}
      />
      <GrantApplicationModal
        isOpen={grantModalOpen}
        onClose={() => setGrantModalOpen(false)}
        onRequireAuth={handleRequireAuth}
      />
    </div>
  );
};

export default Index;
