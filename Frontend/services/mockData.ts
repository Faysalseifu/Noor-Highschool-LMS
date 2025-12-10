

import { Course, User, Certificate, Resource, Exam, StudentAcademicProfile, CalendarEvent } from '../types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Samuel Abebe',
  email: 'samuel@noorhighschool.com',
  role: 'student',
  avatar: 'https://picsum.photos/100/100?random=user',
  enrolledCourseIds: ['Math11', 'Phy10', 'Eng11'], // Updated to match new Course ID format
  gradeLevel: 'Grade 11',
  phone: '+251 911 234 567'
};

export const MOCK_ADMIN: User = {
  id: 'a1',
  name: 'Admin User',
  email: 'admin@noorhighschool.com',
  role: 'admin',
  avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
  enrolledCourseIds: [],
  gradeLevel: 'Staff',
  phone: '+251 900 000 000'
};

export const MOCK_STUDENTS_LIST: User[] = [
  MOCK_USER,
  { id: 'u2', name: 'Bethlehem Tadesse', email: 'beth@noorhighschool.com', role: 'student', gradeLevel: 'Grade 10', phone: '+251 922 000 001', enrolledCourseIds: ['Phy10', 'ICT10'], avatar: 'https://ui-avatars.com/api/?name=Beth+Tadesse&background=random' },
  { id: 'u3', name: 'Dawit Kebede', email: 'dawit@noorhighschool.com', role: 'student', gradeLevel: 'Grade 12', phone: '+251 933 000 002', enrolledCourseIds: ['Civ12'], avatar: 'https://ui-avatars.com/api/?name=Dawit+Kebede&background=random' },
  { id: 'u4', name: 'Fatima Omar', email: 'fatima@noorhighschool.com', role: 'student', gradeLevel: 'Grade 9', phone: '+251 944 000 003', enrolledCourseIds: [], avatar: 'https://ui-avatars.com/api/?name=Fatima+Omar&background=random' },
  { id: 'u5', name: 'Yonas Alemu', email: 'yonas@noorhighschool.com', role: 'student', gradeLevel: 'Grade 11', phone: '+251 955 000 004', enrolledCourseIds: ['Math11'], avatar: 'https://ui-avatars.com/api/?name=Yonas+Alemu&background=random' },
];

export const MOCK_STUDENT_GRADES: Record<string, StudentAcademicProfile> = {
  'u1': {
    studentId: 'u1',
    gpa: 3.8,
    attendance: 95,
    rank: 4,
    grades: [
      { courseId: 'Math11', courseName: 'Grade 11 Mathematics', midExam: 85, finalExam: 90, quizAverage: 88, total: 88, letterGrade: 'A' },
      { courseId: 'Phy10', courseName: 'Grade 10 Physics', midExam: 78, finalExam: 82, quizAverage: 85, total: 81, letterGrade: 'B' },
      { courseId: 'Eng11', courseName: 'English Literature', midExam: 92, finalExam: 94, quizAverage: 90, total: 93, letterGrade: 'A' },
    ]
  },
  'u2': {
    studentId: 'u2',
    gpa: 3.2,
    attendance: 88,
    rank: 45,
    grades: [
      { courseId: 'Phy10', courseName: 'Grade 10 Physics', midExam: 65, finalExam: 70, quizAverage: 75, total: 69, letterGrade: 'C' },
      { courseId: 'ICT10', courseName: 'ICT Fundamentals', midExam: 88, finalExam: 92, quizAverage: 90, total: 90, letterGrade: 'A' },
    ]
  }
};

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert1',
    title: 'Grade 10 Completion Certificate',
    issueDate: 'June 20, 2024',
    grade: 'Grade 10',
    url: '#'
  },
  {
    id: 'cert2',
    title: 'Academic Excellence in Physics',
    issueDate: 'January 15, 2024',
    grade: 'Grade 10',
    url: '#'
  },
  {
    id: 'cert3',
    title: 'School Science Fair Participation',
    issueDate: 'March 10, 2023',
    grade: 'Grade 9',
    url: '#'
  }
];

export const ACADEMIC_CALENDAR: CalendarEvent[] = [
  { id: 'e1', title: 'Start of Semester 1', date: 'Sept 11, 2024', type: 'academic', description: 'Classes begin for all grade levels.' },
  { id: 'e2', title: 'Unit 1 Quiz Week', date: 'Oct 15 - Oct 20, 2024', type: 'exam', description: 'Assessments for Unit 1 across all subjects.' },
  { id: 'e3', title: 'Mid-Semester Examinations', date: 'Nov 10 - Nov 15, 2024', type: 'exam', description: 'Mandatory Mid-terms covering Units 1-3.' },
  { id: 'e4', title: 'Parent-Teacher Conference', date: 'Nov 25, 2024', type: 'event', description: 'Review of student mid-term performance.' },
  { id: 'e5', title: 'Unit 4 & 5 Assessments', date: 'Dec 20 - Dec 24, 2024', type: 'exam', description: 'Pre-break assessments.' },
  { id: 'e6', title: 'Semester 1 Final Exams', date: 'Jan 15 - Jan 25, 2025', type: 'exam', description: 'Comprehensive finals.' },
  { id: 'e7', title: 'Semester Break', date: 'Feb 1 - Feb 10, 2025', type: 'holiday', description: 'School closed.' },
  { id: 'e8', title: 'Start of Semester 2', date: 'Feb 11, 2025', type: 'academic' },
];

export const MOCK_EXAMS: Exam[] = [
  { id: 'mid1', title: 'Mid-Term Physics Exam', courseId: 'Phy10', courseName: 'Grade 10 Physics', date: 'Nov 12, 2024', duration: '90 mins', totalMarks: 60, status: 'completed', type: 'mid' },
  { id: 'final1', title: 'Final Math Exam', courseId: 'Math11', courseName: 'Grade 11 Mathematics', date: 'Jan 15, 2025', duration: '120 mins', totalMarks: 100, status: 'upcoming', type: 'final' },
  { id: 'quiz1', title: 'Unit 1 Quiz', courseId: 'Math11', courseName: 'Grade 11 Mathematics', date: 'Sept 15, 2024', duration: '20 mins', totalMarks: 10, status: 'completed', type: 'mid' }, 
];

export const RECENT_RESOURCES: Resource[] = [
  { id: 'r1', title: 'Grade 11 Math Formula Sheet.pdf', type: 'pdf', course: 'Mathematics', date: '2 days ago', size: '1.2 MB' },
  { id: 'r2', title: 'Physics Lab Report Guidelines.pdf', type: 'pdf', course: 'Physics', date: '1 week ago', size: '850 KB' },
  { id: 'r3', title: 'English Literature Reading List.pdf', type: 'pdf', course: 'English', date: '2 weeks ago', size: '2.4 MB' },
  { id: 'r4', title: 'Civics & Ethics Chapter 1 Summary.docx', type: 'doc', course: 'Civics', date: '3 weeks ago', size: '500 KB' },
];

// Add this at the bottom or top
export const DEMO_PDF_PAGES = [
  // Page 1
  `<div class="text-center space-y-8 mt-20">
     <h1 class="text-6xl font-black text-gray-900 leading-tight">Procrastination<br>Reflection</h1>
     <div class="text-2xl text-gray-600 font-medium">10 Academy – AI Mastery Program</div>
     <div class="text-xl text-gray-500">By: Faysal</div>
   </div>`,
  // Page 2
  `<div class="space-y-8">
      <h2 class="text-4xl font-bold text-gray-900">My Procrastination Story</h2>
      <p class="text-xl leading-relaxed text-gray-700">
        I had a non-technical assignment due, but somehow I started it with less
        than an hour left. I felt stressed and confused about why I always push
        things to the last minute. Still, I knew I would finish somehow, even
        though I didn't like working under that pressure.
      </p>
      <div class="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
        <p class="text-blue-800 italic">"Why do I do this to myself?"</p>
      </div>
   </div>`,
   // Page 3
   `<div class="space-y-8">
      <h2 class="text-4xl font-bold text-gray-900">Last-Minute Feelings</h2>
      <div class="grid grid-cols-2 gap-6">
         <div class="bg-indigo-100 p-6 rounded-lg text-center font-bold text-indigo-800 text-xl">Stress</div>
         <div class="bg-indigo-100 p-6 rounded-lg text-center font-bold text-indigo-800 text-xl">Regret</div>
         <div class="bg-indigo-100 p-6 rounded-lg text-center font-bold text-indigo-800 text-xl">Why am I like this? moments</div>
         <div class="bg-indigo-100 p-6 rounded-lg text-center font-bold text-indigo-800 text-xl">Confidence that I'll finish... but not happily</div>
      </div>
   </div>`,
   // Page 4
   `<div class="space-y-8">
      <h2 class="text-4xl font-bold text-gray-900">Outcome</h2>
      <p class="text-xl text-gray-700">I completed the task, but the results vary:</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div class="border-2 border-gray-200 p-4 rounded-xl text-gray-600 font-medium">Sometimes I lose points</div>
         <div class="border-2 border-gray-200 p-4 rounded-xl text-gray-600 font-medium">Sometimes the quality is low</div>
         <div class="border-2 border-gray-200 p-4 rounded-xl text-gray-600 font-medium">I often miss review time to improve before submitting</div>
      </div>
   </div>`,
   // Page 5
   `<div class="space-y-8">
      <h2 class="text-4xl font-bold text-gray-900">Core Procrastination Triggers</h2>
      <div class="space-y-4">
         <div class="bg-purple-100 p-4 rounded-full flex items-center px-8"><span class="text-3xl font-bold text-purple-800 mr-6">1</span> <span class="text-xl">Boredom</span></div>
         <div class="bg-purple-100 p-4 rounded-full flex items-center px-8"><span class="text-3xl font-bold text-purple-800 mr-6">2</span> <span class="text-xl">Multitasking</span></div>
         <div class="bg-purple-100 p-4 rounded-full flex items-center px-8"><span class="text-3xl font-bold text-purple-800 mr-6">3</span> <span class="text-xl">Unhelpful mindset (later... later...)</span></div>
         <div class="bg-purple-100 p-4 rounded-full flex items-center px-8"><span class="text-3xl font-bold text-purple-800 mr-6">4</span> <span class="text-xl">Mental resistance to starting hard tasks</span></div>
      </div>
   </div>`,
   // Page 11 (Week 1 Challenge)
   `<div class="text-center space-y-6 mt-10">
      <div class="text-2xl text-red-600 font-bold tracking-widest uppercase">10 Academy</div>
      <h1 class="text-5xl font-bold text-gray-900">Artificial Intelligence Mastery</h1>
      <div class="h-1 w-20 bg-gray-300 mx-auto"></div>
      <h2 class="text-3xl text-gray-800">Week 1 Challenge Document</h2>
      <p class="text-2xl text-gray-600">Predicting Price Moves with News Sentiment</p>
      <p class="text-gray-500 mt-8">Date: 19 Nov - 25 Nov 2025</p>
   </div>`,
   // Page 12 (TOC)
   `<div class="space-y-6">
      <div class="flex justify-between items-start">
         <h2 class="text-3xl font-bold text-gray-900">Table of Contents</h2>
         <div class="bg-red-600 text-white font-bold p-2">IO Academy</div>
      </div>
      <ul class="space-y-2 text-lg text-gray-700 border-l-2 border-gray-100 pl-6">
         <li class="flex justify-between"><span>Challenge Overview</span> <span>2</span></li>
         <li class="flex justify-between"><span>Business Objective</span> <span>2</span></li>
         <li class="flex justify-between"><span>Dataset Overview</span> <span>4</span></li>
         <li class="flex justify-between"><span>Team & Key Dates</span> <span>5</span></li>
         <li class="flex justify-between"><span>Deliverables and Tasks</span> <span>6</span></li>
         <li class="ml-4 flex justify-between text-sm text-gray-500"><span>Task 1: Git and GitHub</span> <span>6</span></li>
         <li class="ml-4 flex justify-between text-sm text-gray-500"><span>Task 2: Quantitative analysis</span> <span>7</span></li>
         <li class="ml-4 flex justify-between text-sm text-gray-500"><span>Task 3: Correlation</span> <span>8</span></li>
      </ul>
   </div>`,
   // Page 13 (Overview)
   `<div class="space-y-6">
      <h2 class="text-3xl font-bold text-gray-900">Challenge Overview</h2>
      <p class="text-lg leading-relaxed text-gray-700">
         This project focuses on the detailed analysis of a large corpus of financial news data to
         discover correlations between news sentiment and stock market movements. This
         challenge is designed to refine your skills in Data Engineering (DE), Financial Analytics
         (FA), and Machine Learning Engineering (MLE).
      </p>
      <p class="text-lg leading-relaxed text-gray-700">
         Engage with as many tasks as possible. The volume and complexity of the tasks are
         designed to simulate the pressures and deadlines typical in the financial analytics field.
      </p>
   </div>`,
   // Page 24 (Data Viz Title)
   `<div class="flex items-center justify-center h-full text-center">
      <div>
         <div class="bg-red-600 text-white font-bold inline-block p-2 mb-8">IO Academy</div>
         <h1 class="text-6xl font-thin text-gray-900">Data Visualization and<br>Interpretation</h1>
      </div>
   </div>`,
   // Page 25 (What is Data Viz)
   `<div class="space-y-8">
      <div class="flex justify-between">
         <h2 class="text-3xl font-bold text-gray-600">What is Data Visualization?</h2>
         <div class="bg-red-600 text-white px-2 font-bold">IO</div>
      </div>
      <ul class="space-y-6 text-xl text-gray-700 list-disc pl-8">
         <li>The practice of transforming data into visual formats such as charts, graphs, and maps.</li>
         <li>Graphical representation of data</li>
         <li>Helps reveal patterns, trends, insights</li>
         <li>Communicates complex information clearly</li>
      </ul>
   </div>`
];

export const COURSES: Course[] = [
  {
    id: 'ai-mastery', 
    title: 'AI Mastery Program',
    instructor: 'Dr. Faysal',
    thumbnail: 'https://picsum.photos/800/600?random=ai',
    price: 0, 
    rating: 5.0,
    students: 50,
    category: 'Technology',
    description: 'Advanced AI and Data Science training program.',
    progress: 10,
    modules: [
       {
         id: 'm1_ai',
         title: 'Week 1: Foundations',
         lessons: [
            { 
               id: 'l1_pdf_demo', 
               title: 'Week 1 Challenge Document', 
               duration: '10 Pages', 
               type: 'reading', 
               completed: false, 
               content: 'mock-pdf://demo' 
            }
         ]
       }
    ]
  },
  {
    id: 'Math11', // ID format: Subject + Grade
    title: 'Grade 11 Mathematics',
    instructor: 'Mr. Dawit',
    thumbnail: 'https://picsum.photos/800/600?random=10',
    price: 0, 
    rating: 4.8,
    students: 120,
    category: 'Mathematics',
    description: 'Comprehensive coverage of Algebra, Functions, and Geometry for Grade 11 students.',
    progress: 45,
    modules: [
      {
        id: 'm1',
        title: 'Unit 1: Relations and Functions',
        lessons: [
          { id: 'l1', title: 'Introduction to Relations', duration: '15:00', type: 'video', completed: true, content: 'https://www.youtube.com/embed/SjHOi1k_zKs' },
          { id: 'l2', title: 'Types of Functions', duration: '20:00', type: 'video', completed: true, content: 'https://www.youtube.com/embed/52tpYl2tTqk' },
          { id: 'l3', title: 'Unit 1 Quiz (Mandatory)', duration: '5 Questions', type: 'quiz', completed: true, questions: [
             { id: 'q1', text: 'What is a function?', options: ['Relation', 'Set', 'Graph', 'None'], correctAnswer: 0 }
          ]}
        ]
      },
      {
        id: 'm2',
        title: 'Unit 2: Rational Expressions',
        lessons: [
          { id: 'l4', title: 'Simplifying Rational Expressions', duration: '18:00', type: 'video', completed: false, content: 'https://www.youtube.com/embed/qszqeXKjCqA' },
          { id: 'l5', title: 'Graphing Rational Functions', duration: '22:00', type: 'video', completed: false, content: 'https://www.youtube.com/embed/b6M8k18_CqU' },
          { id: 'l6', title: 'Unit 2 Quiz (Mandatory)', duration: '5 Questions', type: 'quiz', completed: false }
        ]
      },
      {
        id: 'm3',
        title: 'Unit 3: Coordinate Geometry',
        lessons: [
           { id: 'l7', title: 'Distance Formula', duration: '12:00', type: 'video', completed: false, content: 'https://www.youtube.com/embed/0OlG-2741Ew' },
           { id: 'l8', title: 'Unit 3 Quiz (Mandatory)', duration: '5 Questions', type: 'quiz', completed: false }
        ]
      },
      {
        id: 'm_mid',
        title: 'Mid-Term Assessment',
        lessons: [
           { 
             id: 'exam_mid_math11', 
             title: 'First Semester Mid-Exam', 
             duration: '90 Minutes', 
             type: 'mid-exam', 
             completed: false,
             questions: [
                { id: 'mq1', text: 'Solve for x: 2x + 5 = 15', options: ['5', '10', '2', '7'], correctAnswer: 0 },
                { id: 'mq2', text: 'Which of the following is a quadratic function?', options: ['y=x+1', 'y=x^2', 'y=1/x', 'y=2^x'], correctAnswer: 1 },
                { id: 'mq3', text: 'Evaluate f(x)=3x-1 when x=2', options: ['4', '5', '6', '7'], correctAnswer: 1 },
                { id: 'mq4', text: 'What is the slope of y=4x-2?', options: ['-2', '4', '2', '0'], correctAnswer: 1 }
             ]
           }
        ]
      }
    ]
  },
  {
    id: 'Phy10', // ID format: Subject + Grade
    title: 'Grade 10 Physics',
    instructor: 'Mrs. Sara',
    thumbnail: 'https://picsum.photos/800/600?random=11',
    price: 0,
    rating: 4.7,
    students: 115,
    category: 'Physics',
    description: 'Explore the fundamental principles of Mechanics, Optics, and Electromagnetism.',
    progress: 15,
    modules: [
      {
        id: 'm1',
        title: 'Unit 1: Motion in 2D',
        lessons: [
          { id: 'l1', title: 'Projectile Motion', duration: '40:00', type: 'video', completed: true, content: 'https://www.youtube.com/embed/rfd479V0q8o' },
          { id: 'l2', title: 'Uniform Circular Motion', duration: '45:00', type: 'video', completed: false, content: 'https://www.youtube.com/embed/tW0ke2j3jsw' },
          { id: 'l3', title: 'Unit 1 Quiz', duration: '5 Questions', type: 'quiz', completed: false }
        ]
      }
    ]
  },
  {
    id: 'Eng11', // ID format: Subject + Grade
    title: 'English Language & Literature',
    instructor: 'Mr. James',
    thumbnail: 'https://picsum.photos/800/600?random=12',
    price: 0,
    rating: 4.9,
    students: 200,
    category: 'English',
    description: 'Improve reading comprehension, grammar skills, and literary analysis.',
    progress: 0,
    modules: [
       {
        id: 'm1',
        title: 'Unit 1: Advanced Grammar',
        lessons: [
          { id: 'l1', title: 'Conditional Sentences', duration: '30:00', type: 'video', completed: false, content: 'https://www.youtube.com/embed/jZ0y3qJ3y3o' },
          { id: 'l2', title: 'Unit 1 Quiz', duration: '5 Questions', type: 'quiz', completed: false }
        ]
      }
    ]
  },
  {
    id: 'ICT10', // ID format: Subject + Grade
    title: 'ICT: Computer Science Fundamentals',
    instructor: 'Ms. Betelhem',
    thumbnail: 'https://picsum.photos/800/600?random=13',
    price: 0,
    rating: 4.8,
    students: 150,
    category: 'ICT',
    description: 'Introduction to programming logic, algorithms, and database management.',
    progress: 0,
    modules: []
  },
  {
    id: 'Civ12', // ID format: Subject + Grade
    title: 'Grade 12 Civics',
    instructor: 'Mr. Kebede',
    thumbnail: 'https://picsum.photos/800/600?random=14',
    price: 0,
    rating: 4.6,
    students: 100,
    category: 'Civics',
    description: 'Understanding ethics, constitutionalism, and international relations.',
    progress: 0,
    modules: []
  },
   {
    id: 'Bio11', // ID format: Subject + Grade
    title: 'Grade 11 Biology',
    instructor: 'Dr. Almaz',
    thumbnail: 'https://picsum.photos/800/600?random=15',
    price: 0,
    rating: 4.9,
    students: 130,
    category: 'Biology',
    description: 'Cell biology, genetics, and human physiology.',
    progress: 0,
    modules: []
  }
];