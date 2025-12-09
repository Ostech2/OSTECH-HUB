import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, DollarSign, Laptop, Users, Leaf, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { categories, courses } from '@/data/mockData';
import { Button } from '@/components/ui/button';

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
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Course Categories
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Explore our comprehensive range of courses designed to help Ugandan SMEs thrive in every aspect of business.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon] || Briefcase;
              const categoryCourses = courses.filter(
                (course) => course.category.toLowerCase().includes(category.name.toLowerCase().split(' ')[0].toLowerCase())
              );

              return (
                <div
                  key={category.id}
                  className="group bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Category Header */}
                  <div className="gradient-hero p-6">
                    <div className="w-16 h-16 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                      {category.name}
                    </h2>
                    <p className="text-primary-foreground/80">
                      {category.courseCount} Courses Available
                    </p>
                  </div>

                  {/* Category Content */}
                  <div className="p-6">
                    <p className="text-muted-foreground mb-6">
                      {getCategoryDescription(category.slug)}
                    </p>

                    {/* Sample Courses */}
                    {categoryCourses.length > 0 && (
                      <div className="space-y-3 mb-6">
                        <p className="text-sm font-semibold text-foreground">Popular Courses:</p>
                        {categoryCourses.slice(0, 2).map((course) => (
                          <Link
                            key={course.id}
                            to={`/course/${course.id}`}
                            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                          >
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-12 h-10 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {course.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {course.students.toLocaleString()} students
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    <Link to={`/courses?category=${category.slug}`}>
                      <Button variant="outline" className="w-full group">
                        Browse {category.name}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We're constantly adding new courses. Let us know what topics you'd like to learn about.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/courses">
              <Button variant="hero" size="lg">
                View All Courses
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const getCategoryDescription = (slug: string): string => {
  const descriptions: Record<string, string> = {
    business: 'Learn essential business management skills including strategic planning, operations, and organizational leadership to grow your enterprise.',
    marketing: 'Master digital marketing strategies, social media management, SEO, and paid advertising to reach more customers online.',
    finance: 'Understand financial management, bookkeeping, budgeting, and investment strategies to make smarter money decisions.',
    technology: 'Develop technical skills in web development, e-commerce, mobile apps, and digital tools for modern business.',
    leadership: 'Build leadership capabilities, team management skills, and communication strategies to inspire your team.',
    agriculture: 'Learn modern farming techniques, agribusiness strategies, and value addition to maximize your agricultural profits.',
  };
  return descriptions[slug] || 'Explore courses designed to help you succeed in this field.';
};

export default Categories;
