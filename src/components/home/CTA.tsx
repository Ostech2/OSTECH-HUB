import { ArrowRight, Sparkles, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const benefits = [
  'Access to 150+ premium courses',
  'Learn from local industry experts',
  'Earn recognized certificates',
  'Flexible Mobile Money payments',
];

const CTA = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 gradient-hero" />
          
          {/* Mesh overlay */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
          </div>

          {/* Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="0.5" cy="0.5" r="0.5" fill="currentColor" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-primary-foreground text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Start Your Learning Journey Today
                </div>
                
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
                  Ready to Transform Your Business?
                </h2>
                
                <p className="text-primary-foreground/90 text-lg md:text-xl max-w-lg">
                  Join thousands of Ugandan entrepreneurs who are growing their businesses with practical skills.
                </p>

                {/* Benefits */}
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li 
                      key={index} 
                      className="flex items-center gap-3 text-primary-foreground/90 animate-fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/courses">
                    <Button variant="accent" size="xl" className="w-full sm:w-auto group">
                      Browse Courses
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button 
                      variant="glass" 
                      size="xl" 
                      className="w-full sm:w-auto border-white/20 text-primary-foreground hover:bg-white/10"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Create Free Account
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Content - Stats */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '10K+', label: 'Active Students' },
                    { value: '150+', label: 'Expert Courses' },
                    { value: '98%', label: 'Success Rate' },
                    { value: '24/7', label: 'Support Available' },
                  ].map((stat, index) => (
                    <div 
                      key={index}
                      className="glass rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300"
                      style={{ background: 'rgba(255,255,255,0.1)' }}
                    >
                      <div className="font-display text-4xl font-bold text-primary-foreground mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-primary-foreground/80">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;