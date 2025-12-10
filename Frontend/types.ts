

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'guest' | 'admin';
  avatar?: string;
  enrolledCourseIds: string[];
  gradeLevel?: string;
  phone?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "10:00"
  type: 'video' | 'quiz' | 'reading' | 'mid-exam' | 'final-exam';
  content?: string; // Text content or video URL
  completed: boolean;
  questions?: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index 0-3
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  price: number;
  rating: number;
  students: number;
  category: string;
  description: string;
  modules: Module[];
  progress?: number; // 0-100
}

export interface Stat {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  grade: string;
  url: string; // Mock URL for download
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'other';
  course: string;
  date: string;
  size: string;
}

export interface Exam {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  date: string;
  duration: string;
  totalMarks: number;
  status: 'upcoming' | 'completed' | 'missed';
  type: 'mid' | 'final';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'academic' | 'exam' | 'holiday' | 'event';
  description?: string;
}

// Admin Specific Types
export interface GradeRecord {
  courseId: string;
  courseName: string;
  midExam: number;
  finalExam: number;
  quizAverage: number;
  total: number;
  letterGrade: string;
}

export interface StudentAcademicProfile {
  studentId: string;
  gpa: number;
  attendance: number; // Percentage
  rank: number;
  grades: GradeRecord[];
}