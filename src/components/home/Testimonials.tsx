import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Mary Namutebi',
    role: 'Owner, Namutebi Fashions',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&q=80',
    content: 'The digital marketing course transformed my business. I now reach customers across Uganda through Facebook and Instagram. My sales have doubled in just 3 months!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Robert Ssempijja',
    role: 'CEO, TechStart Uganda',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    content: 'The business planning course helped me secure funding for my startup. The trainer was excellent and the content was very practical for the Ugandan market.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Grace Akello',
    role: 'Director, Akello Farms',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&q=80',
    content: 'As a farmer, I never thought online learning would work for me. But the agribusiness course was so practical. I learned about value addition and now export my products!',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary-foreground rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-primary-foreground rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-primary-foreground rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-2 mb-4">
            Success Stories from Our Learners
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            See how businesses across Uganda are transforming through our courses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl p-6 shadow-card animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Quote className="w-10 h-10 text-accent/30 mb-4" />
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
