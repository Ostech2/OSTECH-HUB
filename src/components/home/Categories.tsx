import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, DollarSign, Laptop, Users, Leaf, ArrowRight } from 'lucide-react';
import { categories } from '@/data/mockData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase,
  TrendingUp,
  DollarSign,
  Laptop,
  Users,
  Leaf,
};

const Categories = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Browse by Category</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Explore Our Course Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From business management to technology, find courses tailored to help your SME thrive in the digital economy.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Briefcase;
            return (
              <Link
                key={category.id}
                to={`/courses?category=${category.slug}`}
                className="group p-6 bg-card rounded-2xl border border-border shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {category.courseCount} Courses
                </p>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View All Categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
