import { Shield, Smartphone, Award, Clock, CreditCard, Headphones } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Verified Trainers',
    description: 'All trainers are vetted industry experts with proven track records.',
    color: 'from-primary to-primary/70',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Learn on any device, anywhere. Platform optimized for mobile.',
    color: 'from-accent to-accent/70',
  },
  {
    icon: Award,
    title: 'Certified Courses',
    description: 'Earn recognized certificates upon completing courses.',
    color: 'from-success to-success/70',
  },
  {
    icon: Clock,
    title: 'Learn at Your Pace',
    description: 'Access courses 24/7 and learn on your own schedule.',
    color: 'from-primary to-primary/70',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payments',
    description: 'Pay with Mobile Money (MTN, Airtel) or Visa/MasterCard.',
    color: 'from-accent to-accent/70',
  },
  {
    icon: Headphones,
    title: 'Local Support',
    description: 'Kampala-based support team available in English and Luganda.',
    color: 'from-success to-success/70',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
            Why OSTECH HUB
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why SMEs Choose Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We understand the unique challenges faced by Ugandan businesses. 
            That's why we've built a platform specifically designed for your success.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group card-interactive p-6 lg:p-8 animate-fade-up"
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:shadow-glow transition-all duration-500`}>
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative line */}
              <div className="mt-5 h-1 w-12 rounded-full bg-gradient-to-r from-primary/50 to-transparent group-hover:w-20 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;