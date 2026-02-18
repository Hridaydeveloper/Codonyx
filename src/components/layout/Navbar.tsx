import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import codonyxLogo from "@/assets/codonyx_logo.png";

const navLinks = [
  { name: "Investments", href: "/investments" },
  { name: "Services", href: "/services" },
  { name: "Technology", href: "/technology" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={codonyxLogo} alt="Codonyx" className="h-10 w-10 object-contain" />
            <span className="font-heading text-2xl font-semibold text-white tracking-tight">
              Codonyx
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-emerald-glow ${
                  location.pathname === link.href
                    ? "text-emerald-glow"
                    : "text-white/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Sign In Button */}
          <div className="hidden lg:flex items-center">
            <Link to="/auth">
              <Button variant="primary" size="lg">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy border-t border-white/10 animate-fade-in">
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block text-sm font-medium tracking-wide uppercase text-white/70 hover:text-emerald-glow transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full mt-4">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
