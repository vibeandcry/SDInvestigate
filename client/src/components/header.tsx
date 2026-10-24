import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Download, Search, Menu, X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/theme-toggle";

interface HeaderProps {
  toolCount: number;
  onExport: () => void;
  onNavigateHome?: () => void;
}

export default function Header({ toolCount, onExport, onNavigateHome }: HeaderProps) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLanding = location === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Tools", path: "/directory" },
    { label: "Categories", path: "/directory" },
    { label: "About", path: "/" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isLanding
            ? "glass-strong shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <Link href="/">
              <div
                className="flex items-center gap-3 cursor-pointer"
                data-onboarding="main-header"
                onClick={onNavigateHome}
              >
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
                  <Search className="text-primary-foreground w-4 h-4" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent opacity-50 blur-md -z-10" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground tracking-tight">
                    S&D Intel
                  </h1>
                  <p className="text-[10px] text-muted-foreground -mt-0.5 tracking-wide uppercase">
                    OSINT Directory
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/directory">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Browse Tools
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Categories
              </Button>
              <div className="flex items-center gap-1 px-3 text-sm text-muted-foreground">
                <Shield className="w-3.5 h-3.5 text-accent" />
                <span className="font-medium text-foreground">{toolCount.toLocaleString()}</span>
                <span>tools</span>
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                onClick={onExport}
                size="sm"
                className="hidden sm:flex bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity glow-primary"
                data-onboarding="export-button"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-strong border-t border-border overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                <Link href="/directory">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Browse Tools
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Categories
                </Button>
                <Button
                  onClick={() => {
                    onExport();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <div className="h-16" />
    </>
  );
}
