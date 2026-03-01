import { UtensilsCrossed, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-main section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">TasteFinder</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Discover the best restaurants near you. Curated recommendations for every taste and budget.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/restaurants" className="hover:opacity-100 transition-opacity">All Restaurants</Link></li>
              <li><Link to="/restaurants" className="hover:opacity-100 transition-opacity">Top Rated</Link></li>
              <li><Link to="/restaurants" className="hover:opacity-100 transition-opacity">Near You</Link></li>
              <li><Link to="/restaurants" className="hover:opacity-100 transition-opacity">New Openings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100 transition-opacity">About Us</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Contact</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Careers</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Newsletter</h4>
            <p className="text-sm opacity-70 mb-4">Get weekly restaurant picks delivered to your inbox.</p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button size="icon" variant="default" aria-label="Subscribe">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm opacity-50">
          © {new Date().getFullYear()} TasteFinder. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
