export interface User {
  id: string;
  email: string;
  name: string;
  role: 'learner' | 'trainer' | 'admin';
  avatar?: string;
  bio?: string;
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  trainerId: string;
  trainerName: string;
  trainerAvatar?: string;
  price: number;
  currency: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  reviews: number;
  tags: string[];
  demoVideo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Enrollment {
  id: string;
  courseId: string;
  learnerId: string;
  progress: number;
  completedLessons: number[];
  enrolledAt: Date;
  completedAt?: Date;
  certificateUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  courseCount: number;
}
