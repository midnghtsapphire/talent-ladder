import { motion } from "framer-motion";
import { Wrench, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface HeaderProps {
  onSignIn: () => void;
  onGetStarted: () => void;
  onNavigate: (section: string) => void;
}

const Header = ({ onSignIn, onGetStarted, onNavigate }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="p-2 bg-primary/20 rounded-lg">
            <Wrench className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-lg">
            Industrial<span className="text-primary">Ladder</span>
          </span>
        </motion.div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => handleNavClick("certifications")} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Certifications
          </button>
          <button 
            onClick={() => handleNavClick("opportunities")} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Opportunities
          </button>
          <button 
            onClick={() => handleNavClick("grants")} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Grants
          </button>
          <button 
            onClick={() => handleNavClick("employers")} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            For Employers
          </button>
        </nav>
        
        {/* CTA */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex" onClick={onSignIn}>
            Sign In
          </Button>
          <Button variant="default" size="sm" className="hidden md:inline-flex" onClick={onGetStarted}>
            Get Started
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden border-t border-border bg-background"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <nav className="container py-4 flex flex-col gap-3">
            <button onClick={() => handleNavClick("certifications")} className="text-sm py-2 text-left">
              Certifications
            </button>
            <button onClick={() => handleNavClick("opportunities")} className="text-sm py-2 text-left">
              Opportunities
            </button>
            <button onClick={() => handleNavClick("grants")} className="text-sm py-2 text-left">
              Grants
            </button>
            <button onClick={() => handleNavClick("employers")} className="text-sm py-2 text-left">
              For Employers
            </button>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" size="sm" className="flex-1" onClick={onSignIn}>
                Sign In
              </Button>
              <Button variant="default" size="sm" className="flex-1" onClick={onGetStarted}>
                Get Started
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
