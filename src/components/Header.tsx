import { motion } from "framer-motion";
import { Wrench, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
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
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Certifications
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Opportunities
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Grants
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            For Employers
          </a>
        </nav>
        
        {/* CTA */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button variant="default" size="sm" className="hidden md:inline-flex">
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
            <a href="#" className="text-sm py-2">Certifications</a>
            <a href="#" className="text-sm py-2">Opportunities</a>
            <a href="#" className="text-sm py-2">Grants</a>
            <a href="#" className="text-sm py-2">For Employers</a>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" size="sm" className="flex-1">Sign In</Button>
              <Button variant="default" size="sm" className="flex-1">Get Started</Button>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
