
import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, ProgressBar, Icons, Badge, Input, Label, Select } from '../components/SharedComponents';
import { Course, Lesson, ChatMessage, User, Certificate, Resource } from '../types';
import { COURSES, CERTIFICATES, RECENT_RESOURCES } from '../services/mockData';
import { generateLessonHelp, analyzeVideo } from '../services/geminiService';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface StudentPageProps {
  user: User;
  onNavigate: (page: string, params?: any) => void;
  pageParams?: any;
}

// --- Dashboard ---
export const StudentDashboard: React.FC<StudentPageProps> = ({ user, onNavigate }) => {
  const data = [
    { name: 'Mon', hours: 2 }, { name: 'Tue', hours: 3.5 }, { name: 'Wed', hours: 1.5 },
    { name: 'Thu', hours: 4 }, { name: 'Fri', hours: 3 }, { name: 'Sat', hours: 5 }, { name: 'Sun', hours: 2 },
  ];

  const myCourses = COURSES.filter(c => user.enrolledCourseIds.includes(c.id));

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Academic Year 2024 - Semester 1</p>
         </div>
         <span className="text-sm text-gray-500 font-medium bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-full">{user.gradeLevel || 'Grade 11A'}</span>
       </div>

       {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary-600 to-primary-800 text-white border-none">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-primary-100 text-sm font-medium">Active Subjects</p>
                   <p className="text-3xl font-bold mt-1">6</p>
                </div>
                <div className="bg-white/20 p-3 rounded-lg"><Icons.BookOpen className="w-6 h-6 text-white"/></div>
             </div>
          </Card>
          <Card className="p-6">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Assignments Due</p>
                   <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">3</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg"><Icons.Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400"/></div>
             </div>
          </Card>
          <Card className="p-6">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Average Grade</p>
                   <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">88%</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg"><Icons.GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400"/></div>
             </div>
          </Card>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area: Chart & Resources */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <Card className="p-6">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Study Time (Hours)</h3>
               <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff' }} 
                        itemStyle={{ color: '#000' }}
                      />
                      <Line type="monotone" dataKey="hours" stroke="#0066CC" strokeWidth={3} dot={{r: 4, fill: '#0066CC', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
            </Card>

            {/* Learning Resources / PDF Section */}
            <Card className="p-6">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white">Learning Resources</h3>
                 <Button variant="ghost" size="sm" onClick={() => {}}>View All</Button>
               </div>
               <div className="space-y-3">
                 {RECENT_RESOURCES.map(res => (
                   <div key={res.id} className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="w-10 h-10 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-600 dark:text-red-400 mr-3">
                        <Icons.FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{res.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{res.course} • {res.date}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                         <span className="text-xs text-gray-400 hidden sm:block">{res.size}</span>
                         <button className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                           <Icons.Download className="w-5 h-5" />
                         </button>
                      </div>
                   </div>
                 ))}
               </div>
            </Card>
          </div>

          {/* Sidebar: Recent Activity & Continue Learning */}
          <div className="lg:col-span-1 space-y-6">
             <Card className="p-6">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Continue Learning</h3>
               <div className="space-y-4">
                 {myCourses.slice(0, 3).map(course => (
                   <div key={course.id} className="group cursor-pointer" onClick={() => onNavigate('lesson', { courseId: course.id })}>
                      <div className="flex space-x-3 mb-2">
                         <img src={course.thumbnail} alt="" className="w-16 h-10 object-cover rounded" />
                         <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400">{course.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Resume Unit 1</p>
                         </div>
                      </div>
                      <ProgressBar progress={course.progress || 0} className="h-1.5" />
                   </div>
                 ))}
                 <Button variant="outline" className="w-full mt-4" size="sm" onClick={() => onNavigate('my-courses')}>View All Subjects</Button>
               </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                 <button onClick={() => onNavigate('exams')} className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition text-center">
                    <Icons.Clock className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-xs font-medium">Exams</span>
                 </button>
                 <button onClick={() => onNavigate('certificates')} className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40 transition text-center">
                    <Icons.GraduationCap className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-xs font-medium">Grades</span>
                 </button>
              </div>
            </Card>
          </div>
       </div>
    </div>
  );
};

// --- Certificates Page ---
export const StudentCertificates: React.FC<StudentPageProps> = ({ user }) => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Certificates</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and download your academic achievements.</p>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATES.map(cert => (
            <Card key={cert.id} className="p-6 flex items-start space-x-4">
               <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icons.GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
               </div>
               <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">{cert.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Issued: {cert.issueDate} • {cert.grade}</p>
                  <div className="flex space-x-3">
                     <Button size="sm" variant="outline" className="text-xs">
                        <Icons.Download className="w-3 h-3 mr-2" /> Download PDF
                     </Button>
                     <Button size="sm" variant="ghost" className="text-xs">View Details</Button>
                  </div>
               </div>
            </Card>
          ))}
          {/* Empty State visual if needed */}
          {CERTIFICATES.length === 0 && (
             <div className="col-span-full py-12 text-center text-gray-500">
               <Icons.GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
               <p>No certificates earned yet. Keep learning!</p>
             </div>
          )}
       </div>
    </div>
  );
};

// --- Student Profile Page ---
export const StudentProfile: React.FC<StudentPageProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
       
       <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
          <button 
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'personal' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Personal Info
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'security' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Security
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
             <Card className="p-6 text-center">
                <div className="relative inline-block mb-4">
                   <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-lg mx-auto" />
                   <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full shadow hover:bg-primary-700">
                      <Icons.Camera className="w-4 h-4" />
                   </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{user.gradeLevel || 'Student'}</p>
                <div className="text-left space-y-3 border-t border-gray-100 dark:border-gray-700 pt-4">
                   <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Icons.Mail className="w-4 h-4 mr-3 text-gray-400" /> {user.email}
                   </div>
                   <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Icons.Phone className="w-4 h-4 mr-3 text-gray-400" /> {user.phone || 'N/A'}
                   </div>
                </div>
             </Card>
          </div>

          {/* Form Area */}
          <div className="md:col-span-2">
             <Card className="p-6">
                {activeTab === 'personal' && (
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                     <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Edit Profile Details</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                           <Label>Full Name</Label>
                           <Input defaultValue={user.name} />
                        </div>
                        <div>
                           <Label>Grade Level</Label>
                           <Select defaultValue={user.gradeLevel}>
                              <option>Grade 9</option>
                              <option>Grade 10</option>
                              <option>Grade 11</option>
                              <option>Grade 12</option>
                           </Select>
                        </div>
                        <div className="sm:col-span-2">
                           <Label>Email Address</Label>
                           <Input defaultValue={user.email} disabled className="bg-gray-50 dark:bg-gray-700 text-gray-500" />
                        </div>
                        <div>
                           <Label>Phone Number</Label>
                           <Input defaultValue={user.phone} />
                        </div>
                        <div>
                           <Label>Date of Birth</Label>
                           <div className="relative">
                              <Input type="date" />
                           </div>
                        </div>
                        <div className="sm:col-span-2">
                           <Label>Bio</Label>
                           <textarea className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm dark:bg-gray-800 dark:text-white" rows={3} placeholder="Tell us about yourself..."></textarea>
                        </div>
                     </div>
                     <div className="flex justify-end pt-4">
                        <Button>Save Changes</Button>
                     </div>
                  </form>
                )}

                {activeTab === 'security' && (
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                     <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Change Password</h3>
                     <div>
                        <Label>Current Password</Label>
                        <Input type="password" />
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                           <Label>New Password</Label>
                           <Input type="password" />
                        </div>
                        <div>
                           <Label>Confirm New Password</Label>
                           <Input type="password" />
                        </div>
                     </div>
                     <div className="flex justify-end pt-4">
                        <Button variant="outline" className="mr-2">Cancel</Button>
                        <Button>Update Password</Button>
                     </div>
                  </form>
                )}
             </Card>
          </div>
       </div>
    </div>
  );
};

// --- My Courses ---
export const MyCourses: React.FC<StudentPageProps> = ({ user, onNavigate }) => {
  const myCourses = COURSES.filter(c => user.enrolledCourseIds.includes(c.id));
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Subjects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map(course => (
          <Card key={course.id} className="flex flex-col">
            <div className="aspect-video bg-gray-100 relative">
               <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                 <Button variant="primary" onClick={() => onNavigate('lesson', { courseId: course.id })}>
                    <Icons.PlayCircle className="w-4 h-4 mr-2" /> Go to Class
                 </Button>
               </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{course.instructor}</p>
              <div className="mt-auto space-y-2">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>Semester Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <ProgressBar progress={course.progress || 0} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// --- Lesson Player with AI ---
export const LessonPlayer: React.FC<StudentPageProps> = ({ onNavigate, pageParams }) => {
  const courseId = pageParams?.courseId || 'c1';
  const course = COURSES.find(c => c.id === courseId) || COURSES[0];
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(course.modules[0]?.lessons[0] || null);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'ai'>('overview');
  
  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiModel, setAiModel] = useState<'pro' | 'fast'>('pro'); 
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Video Analysis State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoAnalysis, setVideoAnalysis] = useState<string | null>(null);
  const [isAnalyzingVideo, setIsAnalyzingVideo] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: chatInput, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setIsAiThinking(true);

    const aiResponseText = await generateLessonHelp(
      userMsg.text, 
      `${course.title} - ${activeLesson?.title || "Topic"}`,
      chatHistory.map(m => ({ role: m.role, text: m.text })),
      aiModel
    );

    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: aiResponseText, timestamp: new Date() };
    setChatHistory(prev => [...prev, aiMsg]);
    setIsAiThinking(false);
  };

  const handleVideoUpload = async () => {
    if (!selectedFile) return;

    setIsAnalyzingVideo(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const result = await analyzeVideo(base64, selectedFile.type, "Analyze this video and list key educational concepts.");
        setVideoAnalysis(result);
        setIsAnalyzingVideo(false);
      };
      reader.onerror = () => {
        alert("Error reading file");
        setIsAnalyzingVideo(false);
      };
    } catch (e) {
      console.error(e);
      setIsAnalyzingVideo(false);
    }
  };

  if (!activeLesson) return <div>Loading...</div>;

  // Helper to determine if a module is locked
  const isModuleLocked = (moduleIndex: number) => {
    if (moduleIndex === 0) return false;
    const prevModule = course.modules[moduleIndex - 1];
    const prevQuiz = prevModule.lessons.find(l => l.type === 'quiz');
    // If previous module has a quiz, it must be completed.
    if (prevQuiz && !prevQuiz.completed) return true;
    return false;
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-6rem)] -m-4 sm:-m-6 lg:-m-8">
      {/* Sidebar List */}
      <div className="w-full lg:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden">
         <div className="p-4 border-b border-gray-100 dark:border-gray-700">
           <Button variant="ghost" size="sm" onClick={() => onNavigate('dashboard')} className="mb-2 -ml-2 text-gray-500 dark:text-gray-400">
             <Icons.ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Dashboard
           </Button>
           <h2 className="font-bold text-gray-900 dark:text-white line-clamp-1">{course.title}</h2>
         </div>
         <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1">
            {course.modules.length > 0 ? course.modules.map((module, mIndex) => {
              const locked = isModuleLocked(mIndex);
              return (
                <div key={module.id} className={`mb-4 ${locked ? 'opacity-50 pointer-events-none' : ''}`}>
                   <div className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex justify-between items-center">
                     <span>{module.title}</span>
                     {locked && <Icons.Lock className="w-3 h-3 text-gray-400" />}
                   </div>
                   {module.lessons.map(lesson => (
                     <button 
                       key={lesson.id}
                       onClick={() => !locked && setActiveLesson(lesson)}
                       className={`w-full flex items-center px-3 py-3 rounded-lg text-sm text-left transition-colors ${
                         activeLesson.id === lesson.id 
                            ? 'bg-primary-50 dark:bg-gray-700 text-primary-700 dark:text-primary-400 font-medium' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                       }`}
                     >
                       {lesson.completed ? <Icons.CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" /> : 
                       (lesson.type === 'video' ? <Icons.PlayCircle className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" /> : 
                        lesson.type === 'quiz' ? <Icons.Clock className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" /> :
                        <Icons.BookOpen className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />)}
                       <span className="truncate">{lesson.title}</span>
                       <span className="ml-auto text-xs text-gray-400 pl-2">{lesson.duration}</span>
                     </button>
                   ))}
                </div>
              );
            }) : <div className="p-4 text-sm text-gray-500">No lessons available yet.</div>}
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 h-full overflow-hidden">
        {/* Video Player Area */}
        <div className="bg-black aspect-video w-full flex items-center justify-center relative max-h-[60vh]">
           {activeLesson.type === 'video' ? (
             activeLesson.content && activeLesson.content.includes('youtube') ? (
                 <iframe 
                    className="w-full h-full"
                    src={activeLesson.content}
                    title={activeLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                 ></iframe>
             ) : (
                <video controls className="w-full h-full" src={activeLesson.content} poster="https://picsum.photos/800/450?grayscale" />
             )
           ) : activeLesson.type === 'quiz' ? (
              <div className="text-white flex flex-col items-center">
                 <Icons.Clock className="w-16 h-16 opacity-50 mb-4 text-orange-400" />
                 <p className="text-xl font-bold">End of Chapter Quiz</p>
                 <p className="text-gray-400 text-sm mt-2">You must pass this quiz to unlock the next chapter.</p>
                 <Button className="mt-4" onClick={() => onNavigate('quiz', { lessonId: activeLesson.id })}>Start Quiz</Button>
              </div>
           ) : (
             <div className="text-white flex flex-col items-center">
                <Icons.BookOpen className="w-16 h-16 opacity-50 mb-4" />
                <p>Reading Material View</p>
             </div>
           )}
        </div>

        {/* Content Tabs */}
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
             {['Overview', 'My Notes', 'AI Tutor'].map((tab: any) => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0] as any)}
                 className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-colors ${
                   activeTab === tab.toLowerCase().split(' ')[0] 
                      ? 'border-primary-600 text-primary-600 dark:text-primary-400' 
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                 }`}
               >
                 {tab === 'AI Tutor' && <Icons.Star className="w-4 h-4 inline mr-1 mb-0.5" />}
                 {tab}
               </button>
             ))}
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 relative">
             {activeTab === 'overview' && (
               <div className="max-w-3xl">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{activeLesson.title}</h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Review the material for this topic. Don't forget to complete the assessment quiz at the end of the unit.</p>
                  <Button onClick={() => alert('Marked Complete!')}><Icons.CheckCircle className="w-4 h-4 mr-2" /> Mark as Complete</Button>
               </div>
             )}

             {activeTab === 'notes' && (
               <div className="h-full flex flex-col">
                  <textarea className="flex-1 w-full p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="Type your class notes here..."></textarea>
                  <Button className="mt-4 self-end">Save Notes</Button>
               </div>
             )}

             {activeTab === 'ai' && (
               <div className="flex flex-col h-full max-w-2xl mx-auto space-y-4">
                  
                  {/* Model Toggle Switch */}
                  <div className="flex justify-center mb-2">
                     <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg flex space-x-1">
                        <button 
                          onClick={() => setAiModel('pro')}
                          className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                            aiModel === 'pro' 
                               ? 'bg-white dark:bg-gray-600 text-primary-700 dark:text-primary-300 shadow-sm' 
                               : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <Icons.Brain className="w-4 h-4 mr-1.5" />
                          Deep Reasoning (Pro)
                        </button>
                        <button 
                          onClick={() => setAiModel('fast')}
                          className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                            aiModel === 'fast' 
                               ? 'bg-white dark:bg-gray-600 text-yellow-600 dark:text-yellow-400 shadow-sm' 
                               : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <Icons.Zap className="w-4 h-4 mr-1.5" />
                          Fast Answers (Flash)
                        </button>
                     </div>
                  </div>

                  {/* Video Analysis Section Toggle */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3">
                     <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200 flex items-center mb-2">
                        <Icons.Video className="w-4 h-4 mr-2" /> Analyze Video Content
                     </h4>
                     <div className="flex items-center gap-2">
                        <input 
                           type="file" 
                           accept="video/*" 
                           onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                           className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-200"
                        />
                        <Button size="sm" onClick={handleVideoUpload} disabled={!selectedFile || isAnalyzingVideo}>
                           {isAnalyzingVideo ? 'Analyzing...' : 'Analyze'}
                        </Button>
                     </div>
                     {videoAnalysis && (
                        <div className="mt-3 bg-white dark:bg-gray-900 p-3 rounded border border-blue-100 dark:border-blue-800 text-sm text-gray-700 dark:text-gray-300 animate-in fade-in">
                           <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">AI Analysis:</h5>
                           {videoAnalysis}
                        </div>
                     )}
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 space-y-4 mb-4 overflow-y-auto pr-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                     {chatHistory.length === 0 && (
                       <div className="text-center text-gray-400 mt-4">
                         <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${aiModel === 'pro' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600'}`}>
                           {aiModel === 'pro' ? <Icons.Brain className="w-6 h-6" /> : <Icons.Zap className="w-6 h-6" />}
                         </div>
                         <p>I am your AI study companion.</p>
                         <p className="text-xs">Using {aiModel === 'pro' ? 'Gemini 3 Pro' : 'Gemini 2.5 Flash Lite'}</p>
                       </div>
                     )}
                     {chatHistory.map((msg) => (
                       <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                            msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                          }`}>
                            {msg.text}
                          </div>
                       </div>
                     ))}
                     {isAiThinking && (
                       <div className="flex justify-start">
                         <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3 text-sm flex items-center text-gray-500 dark:text-gray-400">
                           <Icons.Loader2 className="w-4 h-4 animate-spin mr-2" /> 
                           {aiModel === 'fast' ? 'Generating fast answer...' : 'Thinking deeply...'}
                         </div>
                       </div>
                     )}
                     <div ref={chatEndRef} />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
                      placeholder={`Ask a question (${aiModel === 'fast' ? 'Quick Mode' : 'Deep Mode'})...`}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim() || isAiThinking}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50"
                    >
                      <Icons.Send className="w-4 h-4" />
                    </button>
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Quiz Page ---
export const QuizPage: React.FC<StudentPageProps> = ({ onNavigate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = 5; // Mandatory 5 questions per user request

  return (
    <div className="max-w-3xl mx-auto py-8">
       <Button variant="ghost" onClick={() => onNavigate('dashboard')} className="mb-4"><Icons.ChevronRight className="rotate-180 mr-1 w-4 h-4"/> Back to Dashboard</Button>
       <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
               <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Unit Assessment</h1>
               <p className="text-gray-500 dark:text-gray-400 text-sm">Question {currentQuestion + 1} of {totalQuestions}</p>
            </div>
            <Badge color="yellow">Mandatory to Proceed</Badge>
          </div>
          
          <div className="space-y-6">
               <div className="border-b border-gray-100 dark:border-gray-700 pb-6">
                  <p className="font-medium text-gray-900 dark:text-white mb-3 text-lg">
                     {currentQuestion === 0 && "Which organelle is known as the powerhouse of the cell?"}
                     {currentQuestion === 1 && "What is the primary function of the cell membrane?"}
                     {currentQuestion === 2 && "Which molecule carries genetic information?"}
                     {currentQuestion === 3 && "What is the process by which plants make food?"}
                     {currentQuestion === 4 && "How many chromosomes do humans typically have?"}
                  </p>
                  <div className="space-y-2">
                     {['Mitochondria', 'Nucleus', 'Ribosome', 'Golgi Apparatus'].map((opt, i) => (
                       <label key={i} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                          <input type="radio" name={`q${currentQuestion}`} className="text-primary-600 focus:ring-primary-500 h-4 w-4" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{opt}</span>
                       </label>
                     ))}
                  </div>
               </div>
          </div>

          <div className="mt-8 flex justify-between">
             <Button variant="outline" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(c => c - 1)}>Previous</Button>
             
             {currentQuestion < totalQuestions - 1 ? (
                <Button onClick={() => setCurrentQuestion(c => c + 1)}>Next Question</Button>
             ) : (
                <Button size="lg" onClick={() => { alert('Quiz Passed! Next Chapter Unlocked.'); onNavigate('dashboard'); }}>Submit & Unlock Next Unit</Button>
             )}
          </div>
       </Card>
    </div>
  );
};
