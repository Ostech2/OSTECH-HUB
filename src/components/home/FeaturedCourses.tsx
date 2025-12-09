import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { courses } from '@/data/mockData';
import CourseCard from '@/components/course/CourseCard';
import { Button } from '@/components/ui/button';

const FeaturedCourses = () => {
  const featuredCourses = courses.slice(0, 6);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Popular Courses
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              Featured Courses
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Hand-picked courses to accelerate your learning journey and transform your business.
            </p>
          </div>
          <Link to="/courses" className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <Button variant="outline" size="lg" className="group">
              View All Courses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredCourses.map((course, index) => (
            <div
              key={course.id}
              className="animate-fade-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;