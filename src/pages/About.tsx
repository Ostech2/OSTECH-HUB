import { Link } from 'react-router-dom';
import { Target, Users, Award, Globe, Heart, Lightbulb, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import founderImage from '@/assets/founder-kamugisha-osbert.png';

const About = () => {
  const founder = {
    name: 'Kamugisha Osbert',
    role: 'Founder & CEO',
    image: founderImage,
    bio: 'Visionary entrepreneur passionate about making quality business education accessible to every entrepreneur in Uganda.',
  };

  const values = [
    {
      icon: Target,
      title: 'Practical Learning',
      description: 'Every course is designed with real-world application in mind. Learn skills you can use immediately.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in the power of community learning and peer support among entrepreneurs.',
    },
    {
      icon: Award,
      title: 'Quality Content',
      description: 'Our trainers are vetted experts with proven track records in their respective fields.',
    },
    {
      icon: Globe,
      title: 'Local Focus',
      description: 'Content tailored specifically for the Ugandan and East African business context.',
    },
    {
      icon: Heart,
      title: 'Affordable Access',
      description: 'Quality education should be accessible. We offer flexible pricing and payment options.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously improving our platform and courses based on learner feedback.',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Active Learners' },
    { value: '150+', label: 'Expert Courses' },
    { value: '50+', label: 'Certified Trainers' },
    { value: '5,000+', label: 'Certificates Issued' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border-2 border-primary-foreground rounded-full" />
          <div className="absolute bottom-10 left-10 w-48 h-48 border-2 border-primary-foreground rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Empowering Uganda's Entrepreneurs
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              OSTECH HUB is on a mission to bridge the digital skills gap for small and medium enterprises across Uganda, 
              providing accessible, quality education that transforms businesses and lives.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background relative z-10">
        <div className="container mx-auto px-4 -mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 text-center shadow-card animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="font-display text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                From Vision to Reality
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  OSTECH HUB was founded in 2022 with a simple yet powerful vision: to make quality business education 
                  accessible to every entrepreneur in Uganda, regardless of their location or background.
                </p>
                <p>
                  We recognized that while Uganda has incredible entrepreneurial spirit, many SMEs struggle to access 
                  the skills and knowledge needed to thrive in an increasingly digital economy. Traditional education 
                  often doesn't address the practical challenges faced by small business owners.
                </p>
                <p>
                  Today, we partner with industry experts, successful business owners, and organizations across Uganda 
                  to deliver courses that are practical, relevant, and immediately applicable. Our learners come from 
                  all 112 districts of Uganda, united by their drive to grow and succeed.
                </p>
              </div>
              <Link to="/courses" className="inline-block mt-6">
                <Button variant="hero">
                  Explore Our Courses
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Team collaboration"
                className="rounded-2xl shadow-hover w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-card">
                <p className="font-display text-2xl font-bold text-primary">Since 2022</p>
                <p className="text-sm text-muted-foreground">Transforming businesses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do at OSTECH HUB.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Leadership</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-12">
              Meet the Founder
            </h2>
            
            <div className="bg-card rounded-2xl overflow-hidden shadow-card animate-fade-up max-w-md mx-auto">
              <div className="relative overflow-hidden">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-72 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-foreground">{founder.name}</h3>
                <p className="text-primary font-medium mb-3">{founder.role}</p>
                <p className="text-muted-foreground leading-relaxed">{founder.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="animate-fade-up">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Get in Touch</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                We'd Love to Hear From You
              </h2>
              <p className="text-muted-foreground mb-8">
                Have questions about our courses or want to partner with us? Reach out and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Visit Us</h3>
                    <p className="text-muted-foreground">Plot 45, Kampala Road<br />Kampala, Uganda</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Call Us</h3>
                    <p className="text-muted-foreground">+256 700 123 456</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email Us</h3>
                    <p className="text-muted-foreground">hello@ostechhub.ug</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <Input placeholder="Mukasa" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Subject</label>
                  <Input placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea placeholder="Tell us more about your inquiry..." rows={4} />
                </div>
                <Button variant="hero" className="w-full">
                  Send Message
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
