import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, TrendingUp, Play, ChevronRight, GraduationCap, Download } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { courses, enrollments, currentUser, formatPrice } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Certificate from '@/components/course/Certificate';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
const Dashboard = () => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  const enrolledCourses = enrollments.map((enrollment) => {
    const course = courses.find((c) => c.id === enrollment.courseId);
    return { ...enrollment, course };
  });

  const completedCourses = enrolledCourses.filter((e) => e.progress === 100);
  const inProgressCourses = enrolledCourses.filter((e) => e.progress < 100);
  const totalHoursLearned = 24; // Mock value

  const stats = [
    { icon: BookOpen, label: 'Enrolled Courses', value: enrolledCourses.length, color: 'text-primary' },
    { icon: Award, label: 'Completed', value: completedCourses.length, color: 'text-accent' },
    { icon: Clock, label: 'Hours Learned', value: totalHoursLearned, color: 'text-primary' },
    { icon: TrendingUp, label: 'Avg Progress', value: '65%', color: 'text-accent' },
  ];

  const handleViewCertificate = (course: typeof courses[0]) => {
    setSelectedCourse(course);
    setShowCertificate(true);
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current || !selectedCourse) return;
    
    try {
      toast.loading('Generating certificate...');
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `${selectedCourse.title.replace(/\s+/g, '_')}_Certificate.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast.dismiss();
      toast.success('Certificate downloaded successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to download certificate');
    }
  };

  return (
    <Layout>
      <div className="bg-secondary/50 min-h-screen">
        {/* Header */}
        <section className="gradient-hero py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ring-4 ring-primary-foreground/30"
              />
              <div className="text-primary-foreground">
                <p className="text-primary-foreground/80 text-sm">Welcome back,</p>
                <h1 className="font-display text-2xl md:text-3xl font-bold">{currentUser.name}</h1>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 -mt-16 relative z-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-5 shadow-card animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-3`}>
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="font-display text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Continue Learning */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                Continue Learning
              </h2>
              <Link to="/courses" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                Browse More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {inProgressCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressCourses.map((enrollment, index) => (
                  <Link
                    key={enrollment.id}
                    to={`/course/${enrollment.courseId}`}
                    className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <img
                        src={enrollment.course?.thumbnail}
                        alt={enrollment.course?.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-primary-foreground flex items-center justify-center">
                          <Play className="w-5 h-5 text-primary fill-primary ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {enrollment.course?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {enrollment.completedLessons.length} of {enrollment.course?.lessons} lessons completed
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold text-primary">{enrollment.progress}%</span>
                        </div>
                        <Progress value={enrollment.progress} className="h-2" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-2xl p-8 text-center shadow-soft">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No courses in progress</p>
                <Link to="/courses">
                  <Button variant="hero">Browse Courses</Button>
                </Link>
              </div>
            )}
          </section>

          {/* Completed Courses */}
          {completedCourses.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                  Completed Courses
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCourses.map((enrollment, index) => (
                  <div
                    key={enrollment.id}
                    className="bg-card rounded-2xl overflow-hidden shadow-soft animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <img
                        src={enrollment.course?.thumbnail}
                        alt={enrollment.course?.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg">
                          <Award className="w-5 h-5 text-accent-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground line-clamp-2 mb-3">
                        {enrollment.course?.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          Completed
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => enrollment.course && handleViewCertificate(enrollment.course)}
                        >
                          View Certificate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-4xl p-6">
          <DialogTitle className="text-xl font-bold mb-4">Your Certificate</DialogTitle>
          {selectedCourse && (
            <>
              <div className="overflow-auto max-h-[70vh] flex justify-center">
                <Certificate
                  ref={certificateRef}
                  studentName={currentUser.name}
                  courseName={selectedCourse.title}
                  completionDate={new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  trainerName={selectedCourse.trainerName}
                />
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="hero" onClick={downloadCertificate} className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Certificate
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Dashboard;
