import { ArrowRight, Play, Users, BookOpen, Award, Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Hero = () => {
  const [showDemo, setShowDemo] = useState(false);
  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Learners' },
    { icon: BookOpen, value: '150+', label: 'Expert Courses' },
    { icon: Award, value: '5,000+', label: 'Certificates Issued' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 animate-fade-up"
            >
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                Uganda's #1 SME Learning Platform
              </span>
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            </div>

            {/* Headline */}
            <h1 
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] animate-fade-up text-balance"
              style={{ animationDelay: '0.1s' }}
            >
              Master Skills.{' '}
              <span className="gradient-text">
                Transform
              </span>
              {' '}Your Business.
            </h1>

            {/* Description */}
            <p 
              className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              Access world-class courses designed specifically for Ugandan SMEs. 
              Learn from local experts and unlock your business potential.
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link to="/courses">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  Explore Courses
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="glass" size="xl" className="w-full sm:w-auto group" onClick={() => setShowDemo(true)}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-2 group-hover:bg-primary/20 transition-colors">
                  <Play className="w-4 h-4 text-primary fill-primary" />
                </div>
                Watch Demo
              </Button>
            </div>

            {/* Demo Video Modal */}
            <Dialog open={showDemo} onOpenChange={setShowDemo}>
              <DialogContent className="sm:max-w-4xl p-0 bg-card border-border overflow-hidden">
                <div className="relative">
                  <button 
                    onClick={() => setShowDemo(false)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </button>
                  <div className="aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/ZoqgAy3h4OM?autoplay=1"
                      title="OSTECH HUB Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Stats */}
            <div 
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50 animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left group">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <stat.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-up lg:animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            {/* Main Card */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  alt="Students learning together"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="glass rounded-2xl p-4 animate-float">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center shadow-lg">
                        <Award className="w-7 h-7 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-foreground text-lg">Get Certified</p>
                        <p className="text-sm text-muted-foreground">Industry-recognized credentials</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl gradient-hero shadow-glow animate-float opacity-80" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-accent/20 backdrop-blur-xl border border-accent/30 animate-float-slow" />
            </div>

            {/* Mini Stats Card */}
            <div className="absolute -left-8 top-1/3 glass rounded-2xl p-4 shadow-elevated animate-float hidden xl:block">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full gradient-hero border-2 border-card" />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">2.5k+ enrolled</p>
                  <p className="text-xs text-muted-foreground">this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;