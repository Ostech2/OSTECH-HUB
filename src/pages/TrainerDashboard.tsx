import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, BookOpen, Users, DollarSign, TrendingUp, Edit, Trash2, Eye, Upload, Video, FileText } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { courses, formatPrice } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const TrainerDashboard = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  
  // Filter courses by current trainer (mock: just take first 3)
  const trainerCourses = courses.slice(0, 3);
  
  const totalStudents = trainerCourses.reduce((sum, course) => sum + course.students, 0);
  const totalRevenue = trainerCourses.reduce((sum, course) => sum + course.price * course.students, 0);
  const avgRating = (trainerCourses.reduce((sum, course) => sum + course.rating, 0) / trainerCourses.length).toFixed(1);

  const stats = [
    { icon: BookOpen, label: 'Total Courses', value: trainerCourses.length, color: 'text-primary' },
    { icon: Users, label: 'Total Students', value: totalStudents.toLocaleString(), color: 'text-accent' },
    { icon: DollarSign, label: 'Total Revenue', value: formatPrice(totalRevenue), color: 'text-primary' },
    { icon: TrendingUp, label: 'Avg Rating', value: avgRating, color: 'text-accent' },
  ];

  return (
    <Layout>
      <div className="bg-secondary/50 min-h-screen">
        {/* Header */}
        <section className="gradient-hero py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-primary-foreground">
                <p className="text-primary-foreground/80 text-sm">Trainer Dashboard</p>
                <h1 className="font-display text-2xl md:text-3xl font-bold">Manage Your Courses</h1>
              </div>
              <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                <DialogTrigger asChild>
                  <Button variant="accent" size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl">Create New Course</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-6 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Course Title</label>
                      <Input placeholder="Enter course title" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Short Description</label>
                      <Input placeholder="Brief description (max 150 characters)" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full Description</label>
                      <Textarea placeholder="Detailed course description" rows={4} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Category</label>
                        <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm">
                          <option>Select category</option>
                          <option>Business Management</option>
                          <option>Digital Marketing</option>
                          <option>Financial Literacy</option>
                          <option>Technology & IT</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Level</label>
                        <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm">
                          <option>Select level</option>
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Price (UGX)</label>
                        <Input type="number" placeholder="e.g., 75000" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Duration</label>
                        <Input placeholder="e.g., 8 hours" />
                      </div>
                    </div>
                    
                    {/* Thumbnail Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Course Thumbnail</label>
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>

                    {/* Video Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Course Content</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                          <Video className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm font-medium text-foreground">Upload Video</p>
                          <p className="text-xs text-muted-foreground">MP4, WebM</p>
                        </div>
                        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                          <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm font-medium text-foreground">Upload PDF</p>
                          <p className="text-xs text-muted-foreground">PDF documents</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setIsUploadOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="hero" className="flex-1">
                        Create Course
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
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
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-3">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="font-display text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Courses Table */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">
              Your Courses
            </h2>

            <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Course</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Students</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Rating</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Revenue</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Status</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {trainerCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-16 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-foreground line-clamp-1">{course.title}</p>
                              <p className="text-sm text-muted-foreground">{course.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-foreground">{course.students.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <span className="text-accent">★</span>
                            <span className="text-foreground">{course.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-primary">
                            {formatPrice(course.price * course.students)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            Published
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TrainerDashboard;
