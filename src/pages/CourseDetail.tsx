import { useParams, Link } from 'react-router-dom';
import { Star, Clock, BookOpen, Users, Play, Check, Award, Globe, ChevronRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { courses, formatPrice } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
          <Link to="/courses">
            <Button variant="hero">Browse All Courses</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const levelColors = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-amber-100 text-amber-700',
    Advanced: 'bg-red-100 text-red-700',
  };

  // Generate curriculum based on course category
  const getCurriculum = () => {
    const curriculumByCategory: Record<string, { module: string; lessons: { title: string; duration: string; description: string; free: boolean }[] }[]> = {
      'Digital Marketing': [
        {
          module: 'Module 1: Foundations of Digital Marketing',
          lessons: [
            { title: 'Introduction to Digital Marketing', duration: '15 min', description: 'Overview of digital marketing landscape in Africa', free: true },
            { title: 'Understanding Your Target Audience', duration: '25 min', description: 'Learn to identify and analyze your ideal customers', free: true },
            { title: 'Setting Up Your Digital Presence', duration: '30 min', description: 'Creating profiles on key platforms', free: false },
          ]
        },
        {
          module: 'Module 2: Social Media Marketing',
          lessons: [
            { title: 'Facebook Marketing Essentials', duration: '45 min', description: 'Master Facebook for business growth', free: false },
            { title: 'Instagram for Business', duration: '40 min', description: 'Visual marketing strategies that convert', free: false },
            { title: 'WhatsApp Business Mastery', duration: '35 min', description: 'Leverage WhatsApp for customer engagement', free: false },
          ]
        },
        {
          module: 'Module 3: Content & SEO',
          lessons: [
            { title: 'Content Creation Strategies', duration: '50 min', description: 'Create engaging content that resonates', free: false },
            { title: 'SEO Basics for SMEs', duration: '45 min', description: 'Get found on Google search', free: false },
            { title: 'Paid Advertising Fundamentals', duration: '60 min', description: 'Running effective ad campaigns', free: false },
          ]
        },
      ],
      'Financial Literacy': [
        {
          module: 'Module 1: Business Finance Basics',
          lessons: [
            { title: 'Understanding Business Finance', duration: '20 min', description: 'Core financial concepts every entrepreneur needs', free: true },
            { title: 'Bookkeeping Fundamentals', duration: '35 min', description: 'Recording transactions accurately', free: true },
            { title: 'Setting Up Your Accounts', duration: '30 min', description: 'Chart of accounts and organization', free: false },
          ]
        },
        {
          module: 'Module 2: Cash Flow Management',
          lessons: [
            { title: 'Cash Flow Basics', duration: '40 min', description: 'Understanding money in and out', free: false },
            { title: 'Managing Receivables', duration: '35 min', description: 'Getting paid on time', free: false },
            { title: 'Controlling Expenses', duration: '45 min', description: 'Smart spending strategies', free: false },
          ]
        },
        {
          module: 'Module 3: Financial Planning',
          lessons: [
            { title: 'Budgeting for Growth', duration: '50 min', description: 'Creating effective business budgets', free: false },
            { title: 'Tax Obligations in Uganda', duration: '45 min', description: 'Understanding URA requirements', free: false },
            { title: 'Financial Reporting', duration: '55 min', description: 'Reading and creating financial statements', free: false },
          ]
        },
      ],
      'Technology & IT': [
        {
          module: 'Module 1: Getting Started',
          lessons: [
            { title: 'Introduction to Technology for Business', duration: '15 min', description: 'Why technology matters for SMEs', free: true },
            { title: 'Setting Up Your Digital Tools', duration: '30 min', description: 'Essential software and apps', free: true },
            { title: 'Online Security Basics', duration: '25 min', description: 'Protecting your business online', free: false },
          ]
        },
        {
          module: 'Module 2: E-commerce Essentials',
          lessons: [
            { title: 'Choosing Your Platform', duration: '40 min', description: 'Comparing e-commerce options', free: false },
            { title: 'Setting Up Your Online Store', duration: '60 min', description: 'Step-by-step store creation', free: false },
            { title: 'Payment Integration', duration: '45 min', description: 'Mobile Money and card payments', free: false },
          ]
        },
        {
          module: 'Module 3: Growing Your Online Business',
          lessons: [
            { title: 'Order Management', duration: '35 min', description: 'Handling orders efficiently', free: false },
            { title: 'Delivery & Logistics', duration: '40 min', description: 'Getting products to customers', free: false },
            { title: 'Scaling Your E-commerce', duration: '50 min', description: 'Growing beyond the basics', free: false },
          ]
        },
      ],
      'Leadership Skills': [
        {
          module: 'Module 1: Leadership Foundations',
          lessons: [
            { title: 'What Makes a Great Leader', duration: '20 min', description: 'Core leadership principles', free: true },
            { title: 'African Leadership Philosophy', duration: '25 min', description: 'Ubuntu and servant leadership', free: true },
            { title: 'Self-Assessment', duration: '30 min', description: 'Understanding your leadership style', free: false },
          ]
        },
        {
          module: 'Module 2: Building Your Team',
          lessons: [
            { title: 'Hiring the Right People', duration: '45 min', description: 'Recruitment strategies that work', free: false },
            { title: 'Training & Development', duration: '40 min', description: 'Growing your team capabilities', free: false },
            { title: 'Creating Company Culture', duration: '35 min', description: 'Building a positive workplace', free: false },
          ]
        },
        {
          module: 'Module 3: Advanced Leadership',
          lessons: [
            { title: 'Conflict Resolution', duration: '40 min', description: 'Managing workplace challenges', free: false },
            { title: 'Motivation & Retention', duration: '45 min', description: 'Keeping your best people', free: false },
            { title: 'Leading Through Change', duration: '50 min', description: 'Navigating business transitions', free: false },
          ]
        },
      ],
    };

    // Default curriculum for categories not specifically defined
    const defaultCurriculum = [
      {
        module: 'Module 1: Introduction',
        lessons: [
          { title: 'Welcome & Course Overview', duration: '15 min', description: 'What you will learn in this course', free: true },
          { title: 'Understanding the Fundamentals', duration: '30 min', description: 'Core concepts and principles', free: true },
          { title: 'Getting Started', duration: '25 min', description: 'Setting up for success', free: false },
        ]
      },
      {
        module: 'Module 2: Core Concepts',
        lessons: [
          { title: 'Key Principles & Strategies', duration: '45 min', description: 'Essential knowledge for success', free: false },
          { title: 'Practical Applications', duration: '50 min', description: 'Applying what you learn', free: false },
          { title: 'Tools & Resources', duration: '40 min', description: 'Using the right tools', free: false },
        ]
      },
      {
        module: 'Module 3: Advanced Topics',
        lessons: [
          { title: 'Advanced Techniques', duration: '55 min', description: 'Taking your skills to the next level', free: false },
          { title: 'Case Studies', duration: '45 min', description: 'Real-world examples and analysis', free: false },
          { title: 'Final Project', duration: '60 min', description: 'Apply everything you have learned', free: false },
        ]
      },
    ];

    return curriculumByCategory[course.category] || defaultCurriculum;
  };

  const curriculum = getCurriculum();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/courses" className="hover:text-primary">Courses</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium truncate">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="gradient-hero py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Course Info */}
            <div className="lg:col-span-2 text-primary-foreground">
              <Badge className={`${levelColors[course.level]} mb-4`}>{course.level}</Badge>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl">
                {course.shortDescription}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-primary-foreground/70">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>

              {/* Trainer */}
              <div className="flex items-center gap-3">
                <img
                  src={course.trainerAvatar}
                  alt={course.trainerName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-foreground/30"
                />
                <div>
                  <p className="text-sm text-primary-foreground/70">Created by</p>
                  <p className="font-semibold">{course.trainerName}</p>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="bg-card rounded-2xl shadow-hover p-6 sticky top-24">
              <div className="relative rounded-xl overflow-hidden mb-6">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-primary fill-primary ml-1" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                {course.price === 0 ? (
                  <span className="font-display text-3xl font-bold text-success">
                    Free Course
                  </span>
                ) : (
                  <span className="font-display text-3xl font-bold text-foreground">
                    {formatPrice(course.price, course.currency)}
                  </span>
                )}
              </div>

              <Link to={course.price === 0 ? `/course/${course.id}/learn` : `/checkout?courseId=${course.id}`}>
                <Button variant="hero" size="xl" className="w-full mb-4">
                  {course.price === 0 ? 'Start Learning' : 'Enroll Now'}
                </Button>
              </Link>

              {course.price > 0 && (
                <p className="text-center text-sm text-muted-foreground mb-6">
                  30-day money-back guarantee
                </p>
              )}
              {course.price === 0 && (
                <p className="text-center text-sm text-success mb-6">
                  No payment required
                </p>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{course.duration} of content</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Certificate of completion</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Lifetime access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  About This Course
                </h2>
                <div className="prose prose-neutral max-w-none">
                  {course.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* What You'll Learn */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  What You'll Learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Practical skills you can apply immediately',
                    'Industry best practices and standards',
                    'Real-world case studies and examples',
                    'Hands-on projects and exercises',
                    'Expert tips and strategies',
                    'Access to exclusive resources',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Course Curriculum
                </h2>
                <div className="space-y-6">
                  {curriculum.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="border border-border rounded-2xl overflow-hidden">
                      <div className="bg-secondary px-5 py-4">
                        <h3 className="font-semibold text-foreground">{module.module}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {module.lessons.length} lessons • {module.lessons.reduce((acc, l) => {
                            const mins = parseInt(l.duration);
                            return acc + mins;
                          }, 0)} min
                        </p>
                      </div>
                      <div className="divide-y divide-border">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${lesson.free ? 'bg-success/10' : 'bg-primary/10'}`}>
                                <Play className={`w-4 h-4 ${lesson.free ? 'text-success' : 'text-primary'}`} />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{lesson.title}</p>
                                <p className="text-sm text-muted-foreground">{lesson.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{lesson.duration}</p>
                              </div>
                            </div>
                            {lesson.free && (
                              <Badge variant="secondary" className="bg-success/10 text-success shrink-0">
                                Free Preview
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trainer Card */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Your Instructor
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={course.trainerAvatar}
                    alt={course.trainerName}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{course.trainerName}</p>
                    <p className="text-sm text-muted-foreground">Expert Trainer</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  An experienced professional with years of practical experience in the field. Passionate about teaching and helping SMEs grow.
                </p>
              </div>

              {/* Tags */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Topics Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CourseDetail;
