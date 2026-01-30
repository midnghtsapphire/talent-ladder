import { Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FooterProps {
  onNavigate: (section: string) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
  const { toast } = useToast();

  const handleLinkClick = (linkName: string, section?: string) => {
    if (section) {
      onNavigate(section);
    } else {
      toast({
        title: `${linkName}`,
        description: "This page is coming soon. Stay tuned!",
      });
    }
  };

  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div 
              className="flex items-center gap-2 mb-4 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="p-2 bg-primary/20 rounded-lg">
                <Wrench className="w-4 h-4 text-primary" />
              </div>
              <span className="font-bold">
                Industrial<span className="text-primary">Ladder</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Bridging the gap between talent and the $300B semiconductor revolution.
            </p>
          </div>
          
          {/* Platform Links */}
          <div>
            <h5 className="font-semibold mb-3 text-sm">Platform</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => handleLinkClick("Certifications", "certifications")} 
                  className="hover:text-foreground transition-colors"
                >
                  Certifications
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("Career Paths", "careers")} 
                  className="hover:text-foreground transition-colors"
                >
                  Career Paths
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("Grant Finder", "grants")} 
                  className="hover:text-foreground transition-colors"
                >
                  Grant Finder
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("Simulations")} 
                  className="hover:text-foreground transition-colors"
                >
                  Simulations
                </button>
              </li>
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h5 className="font-semibold mb-3 text-sm">Resources</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => handleLinkClick("CHIPS Act Guide")} 
                  className="hover:text-foreground transition-colors"
                >
                  CHIPS Act Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("Salary Data")} 
                  className="hover:text-foreground transition-colors"
                >
                  Salary Data
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("Success Stories")} 
                  className="hover:text-foreground transition-colors"
                >
                  Success Stories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("Blog")} 
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h5 className="font-semibold mb-3 text-sm">Company</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => handleLinkClick("About")} 
                  className="hover:text-foreground transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("For Employers", "employers")} 
                  className="hover:text-foreground transition-colors"
                >
                  For Employers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("Partners")} 
                  className="hover:text-foreground transition-colors"
                >
                  Partners
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("Contact")} 
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 Industrial Ladder. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <button onClick={() => handleLinkClick("Privacy Policy")} className="hover:text-foreground">
              Privacy
            </button>
            <button onClick={() => handleLinkClick("Terms of Service")} className="hover:text-foreground">
              Terms
            </button>
            <button onClick={() => handleLinkClick("Accessibility")} className="hover:text-foreground">
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
