import { Link } from 'react-router-dom';
import { Star, Clock, Users, BookOpen, ArrowUpRight } from 'lucide-react';
import { Course } from '@/types';
import { formatPrice } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

const CourseCard = ({ course, featured = false }: CourseCardProps) => {
  const levelColors = {
    Beginner: 'bg-success/10 text-success border-success/20',
    Intermediate: 'bg-accent/10 text-accent border-accent/20',
    Advanced: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <Link
      to={`/course/${course.id}`}
      className={`group block card-interactive overflow-hidden ${
        featured ? 'md:flex' : ''
      }`}
    >
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${featured ? 'md:w-2/5' : ''}`}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className={`w-full object-cover transition-all duration-700 group-hover:scale-110 ${
            featured ? 'h-52 md:h-full' : 'h-52'
          }`}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Level Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${levelColors[course.level]} border font-medium backdrop-blur-sm`}>
            {course.level}
          </Badge>
        </div>

        {/* Arrow Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <ArrowUpRight className="w-5 h-5 text-foreground" />
        </div>
      </div>

      {/* Content */}
      <div className={`p-5 ${featured ? 'md:w-3/5 md:p-6' : ''}`}>
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {course.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-3 ${
          featured ? 'text-xl md:text-2xl' : 'text-lg'
        }`}>
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
          {course.shortDescription}
        </p>

        {/* Trainer */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <img
              src={course.trainerAvatar}
              alt={course.trainerName}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-border"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-card" />
          </div>
          <div>
            <span className="text-sm font-medium text-foreground">{course.trainerName}</span>
            <p className="text-xs text-muted-foreground">Instructor</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="font-semibold text-foreground">{course.rating}</span>
            <span className="text-xs">({course.reviews})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessons} lessons</span>
          </div>
        </div>

        {/* Price & Enrollment */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            {course.price === 0 ? (
              <span className="font-display text-2xl font-bold text-success">
                Free
              </span>
            ) : (
              <span className="font-display text-2xl font-bold gradient-text">
                {formatPrice(course.price, course.currency)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{course.students.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;