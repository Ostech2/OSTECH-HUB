import { useParams, Link } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, BookOpen, Clock, Award, Download } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { courses, currentUser } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Certificate from '@/components/course/Certificate';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

const CourseLearning = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

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

  // Generate lessons based on course data
  const lessons = Array.from({ length: course.lessons }, (_, i) => ({
    id: i + 1,
    title: `Lesson ${i + 1}: ${i === 0 ? 'Introduction' : i === course.lessons - 1 ? 'Summary & Next Steps' : `Module ${i}`}`,
    duration: `${Math.floor(Math.random() * 15) + 5} min`,
    videoUrl: course.demoVideo || 'https://www.youtube.com/embed/ZoqgAy3h4OM',
  }));

  const markComplete = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
    }
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const progress = Math.round((completedLessons.length / lessons.length) * 100);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    
    try {
      toast.loading('Generating certificate...');
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `${course.title.replace(/\s+/g, '_')}_Certificate.png`;
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
      {/* Breadcrumb */}
      <div className="bg-secondary py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/courses" className="hover:text-primary">Courses</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/course/${course.id}`} className="hover:text-primary truncate">{course.title}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Learning</span>
          </nav>
        </div>
      </div>

      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Video Player */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-card">
                <div className="aspect-video bg-foreground/5">
                  <iframe
                    src={`${course.demoVideo || 'https://www.youtube.com/embed/ZoqgAy3h4OM'}?rel=0`}
                    title={lessons[currentLesson].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Badge className="bg-success/10 text-success border-success/20 mb-2">
                        Free Course
                      </Badge>
                      <h2 className="font-display text-2xl font-bold text-foreground">
                        {lessons[currentLesson].title}
                      </h2>
                      <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" />
                        {lessons[currentLesson].duration}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      disabled={currentLesson === 0}
                      onClick={() => setCurrentLesson(currentLesson - 1)}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button 
                      variant="hero"
                      onClick={markComplete}
                    >
                      {completedLessons.includes(currentLesson) ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : currentLesson === lessons.length - 1 ? (
                        'Complete Course'
                      ) : (
                        'Mark Complete & Continue'
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Course Description */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  About This Course
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
              </div>
            </div>

            {/* Sidebar - Lessons List */}
            <div className="space-y-6">
              {/* Progress */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Your Progress
                </h3>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-semibold text-foreground">{progress}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {completedLessons.length} of {lessons.length} lessons completed
                </p>
                
                {progress === 100 && (
                  <div className="mt-4 p-4 bg-success/10 rounded-xl text-center">
                    <Award className="w-8 h-8 text-success mx-auto mb-2" />
                    <p className="font-semibold text-success">Course Completed!</p>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">Congratulations on finishing</p>
                    <Button 
                      variant="hero" 
                      size="sm" 
                      onClick={() => setShowCertificate(true)}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Get Certificate
                    </Button>
                  </div>
                )}
              </div>

              {/* Lessons List */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Course Content
                  </h3>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(index)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                        currentLesson === index 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          completedLessons.includes(index)
                            ? 'bg-success text-success-foreground'
                            : currentLesson === index
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-muted-foreground'
                        }`}>
                          {completedLessons.includes(index) ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            currentLesson === index ? 'text-primary' : 'text-foreground'
                          }`}>
                            Lesson {index + 1}
                          </p>
                          <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-4xl p-6">
          <DialogTitle className="text-xl font-bold mb-4">Your Certificate</DialogTitle>
          <div className="overflow-auto max-h-[70vh] flex justify-center">
            <Certificate
              ref={certificateRef}
              studentName={currentUser.name}
              courseName={course.title}
              completionDate={new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              trainerName={course.trainerName}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="hero" onClick={downloadCertificate} className="gap-2">
              <Download className="w-4 h-4" />
              Download Certificate
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CourseLearning;