

import React, { useState, useEffect } from 'react';
import { PublicLayout, StudentLayout, AdminLayout, GlobalChatbot } from './components/Layouts';
import { HomePage, CoursesPage, CourseDetailPage, RegisterPage, AboutPage, ContactPage } from './pages/PublicPages';
import { StudentDashboard, MyCourses, LessonPlayer, QuizPage, StudentCertificates, StudentProfile } from './pages/StudentPages';
import { AdminDashboard, AdminCourseList, AdminCourseEditor, AdminStudentList, AdminStudentDetail } from './pages/AdminPages';
import { MOCK_USER, MOCK_ADMIN } from './services/mockData';
import { User } from './types';

// Simple Hash Router Hook
const useHashRoute = () => {
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || 'home');
  const [params, setParams] = useState<any>({});

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const [page, queryString] = hash.split('?');
      
      const newParams: any = {};
      if (queryString) {
        new URLSearchParams(queryString).forEach((val, key) => {
          newParams[key] = val;
        });
      }
      
      setRoute(page || 'home');
      setParams(newParams);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Init
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: string, newParams?: any) => {
    let url = `#${page}`;
    if (newParams) {
      const query = new URLSearchParams(newParams).toString();
      url += `?${query}`;
    }
    window.location.hash = url;
  };

  return { route, params, navigate };
};

const App: React.FC = () => {
  const { route, params, navigate } = useHashRoute();
  const [user, setUser] = useState<User | null>(null); // Null = Guest

  // Mock Login/Logout
  const handleLogin = (asAdmin?: boolean) => {
    if (asAdmin) {
      setUser(MOCK_ADMIN);
      navigate('admin-dashboard');
    } else {
      setUser(MOCK_USER);
      navigate('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('home');
  };

  // Intercept navigation to handle Auth logic
  const handleNavigate = (page: string, p?: any) => {
    if (page === 'home' && user) {
        if(p?.logout) {
            handleLogout();
            return;
        }
    }

    // Special trigger for admin login demo from public header
    if (page === 'admin-login-trigger') {
       handleLogin(true);
       return;
    }
    
    // Auto-login for demo purposes if clicking "dashboard" from public
    if ((page === 'dashboard') && !user) {
      handleLogin(false);
      return;
    }
    
    navigate(page, p);
  };

  // --- Router Logic ---

  // 1. Admin Routes
  if (user?.role === 'admin') {
     return (
       <>
         <AdminLayout user={user} onNavigate={(p, pm) => handleNavigate(p === 'home' ? 'home' : p, p === 'home' ? {logout:true} : pm)} currentPage={route}>
            {route === 'admin-dashboard' && <AdminDashboard onNavigate={handleNavigate} />}
            {route === 'admin-courses' && <AdminCourseList onNavigate={handleNavigate} />}
            {route === 'admin-create-course' && <AdminCourseEditor onNavigate={handleNavigate} pageParams={params} />}
            {route === 'admin-students' && <AdminStudentList onNavigate={handleNavigate} />}
            {route === 'admin-student-detail' && <AdminStudentDetail onNavigate={handleNavigate} pageParams={params} />}
            {/* Fallbacks */}
            {!['admin-dashboard', 'admin-courses', 'admin-create-course', 'admin-students', 'admin-student-detail'].includes(route) && <AdminDashboard onNavigate={handleNavigate} />}
         </AdminLayout>
         <GlobalChatbot currentPage={route} />
       </>
     );
  }
  
  // 2. Student Routes
  if (user?.role === 'student' && ['dashboard', 'my-courses', 'lesson', 'exams', 'profile', 'quiz', 'certificates', 'settings'].includes(route)) {
    return (
      <>
        <StudentLayout user={user} onNavigate={(p) => handleNavigate(p === 'home' ? 'home' : p, p === 'home' ? {logout:true} : undefined)} currentPage={route}>
          {route === 'dashboard' && <StudentDashboard user={user} onNavigate={handleNavigate} />}
          {route === 'my-courses' && <MyCourses user={user} onNavigate={handleNavigate} />}
          {route === 'lesson' && <LessonPlayer user={user} onNavigate={handleNavigate} pageParams={params} />}
          {route === 'exams' && <QuizPage user={user} onNavigate={handleNavigate} />}
          {route === 'quiz' && <QuizPage user={user} onNavigate={handleNavigate} />}
          {route === 'profile' && <StudentProfile user={user} onNavigate={handleNavigate} />}
          {route === 'certificates' && <StudentCertificates user={user} onNavigate={handleNavigate} />}
          {route === 'settings' && <StudentProfile user={user} onNavigate={handleNavigate} />}
        </StudentLayout>
        <GlobalChatbot currentPage={route} />
      </>
    );
  }

  // 3. Public Routes (Default)
  return (
    <>
      <PublicLayout user={user || undefined} onNavigate={handleNavigate} currentPage={route}>
        {route === 'home' && <HomePage onNavigate={handleNavigate} />}
        {route === 'courses' && <CoursesPage onNavigate={handleNavigate} />}
        {route === 'course-detail' && <CourseDetailPage onNavigate={handleNavigate} courseId={params.id} />}
        {route === 'register' && <RegisterPage onNavigate={handleNavigate} />}
        {route === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {route === 'contact' && <ContactPage onNavigate={handleNavigate} />}
        
        {/* Fallback for 404 */}
        {!['home', 'courses', 'course-detail', 'about', 'blog', 'register', 'contact'].includes(route) && (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-gray-600 mb-8">Page not found.</p>
            <button onClick={() => navigate('home')} className="text-primary-600 hover:underline">Go Home</button>
          </div>
        )}
      </PublicLayout>
      <GlobalChatbot currentPage={route} />
    </>
  );
};

export default App;
