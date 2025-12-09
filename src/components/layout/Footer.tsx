import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-1 gradient-hero" />
      
      <div className="bg-foreground text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="space-y-6 lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-bold">
                    OSTECH<span className="text-accent"> HUB</span>
                  </span>
                </div>
              </Link>
              <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
                Empowering SMEs across Uganda with quality digital education. Learn from industry experts and grow your business.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Instagram, href: '#' },
                  { icon: Linkedin, href: '#' },
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
                Quick Links
                <div className="h-0.5 w-8 bg-primary rounded-full" />
              </h4>
              <ul className="space-y-3">
                {['About Us', 'Courses', 'Become a Trainer', 'Pricing', 'Blog'].map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span>{link}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
                Categories
                <div className="h-0.5 w-8 bg-accent rounded-full" />
              </h4>
              <ul className="space-y-3">
                {['Business Management', 'Digital Marketing', 'Financial Literacy', 'Technology & IT', 'Leadership Skills'].map((category) => (
                  <li key={category}>
                    <a 
                      href="#" 
                      className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span>{category}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
                Contact Us
                <div className="h-0.5 w-8 bg-success rounded-full" />
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="text-primary-foreground/70 text-sm block">Plot 45, Kampala Road</span>
                    <span className="text-primary-foreground/70 text-sm">Kampala, Uganda</span>
                  </div>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-primary-foreground/70 text-sm">+256 700 123 456</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-primary-foreground/70 text-sm">hello@ostechhub.ug</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © 2024 OSTECH HUB. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;