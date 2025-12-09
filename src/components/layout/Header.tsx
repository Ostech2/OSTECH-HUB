import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/trainer', label: 'Trainer' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-500",
      isScrolled 
        ? "glass-strong shadow-elevated" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl gradient-hero flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-500 group-hover:scale-105">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent animate-pulse-soft" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl md:text-2xl font-bold tracking-tight">
                <span className="gradient-text">OSTECH</span>
                <span className="text-foreground"> HUB</span>
              </span>
              <span className="text-xs text-primary font-bold tracking-wider uppercase hidden sm:block">
                Digital Learning Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300",
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-secondary"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="w-5 h-5" />
            </Button>
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="gap-2">
                <BookOpen className="w-4 h-4" />
                My Learning
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="hero" size="sm" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-secondary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 animate-slide-up",
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary hover:text-primary"
                  )}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border">
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <BookOpen className="w-4 h-4" />
                    My Learning
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="hero" className="w-full gap-2">
                    <Sparkles className="w-4 h-4" />
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;