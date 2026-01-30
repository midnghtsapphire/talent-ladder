import { Wrench } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
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
          
          {/* Links */}
          <div>
            <h5 className="font-semibold mb-3 text-sm">Platform</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Certifications</a></li>
              <li><a href="#" className="hover:text-foreground">Career Paths</a></li>
              <li><a href="#" className="hover:text-foreground">Grant Finder</a></li>
              <li><a href="#" className="hover:text-foreground">Simulations</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-3 text-sm">Resources</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">CHIPS Act Guide</a></li>
              <li><a href="#" className="hover:text-foreground">Salary Data</a></li>
              <li><a href="#" className="hover:text-foreground">Success Stories</a></li>
              <li><a href="#" className="hover:text-foreground">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-3 text-sm">Company</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">For Employers</a></li>
              <li><a href="#" className="hover:text-foreground">Partners</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 Industrial Ladder. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
