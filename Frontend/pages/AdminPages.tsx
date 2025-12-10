

import React, { useState } from 'react';
import { Button, Card, Badge, Input, Label, Select, Icons, ProgressBar } from '../components/SharedComponents';
import { COURSES, MOCK_USER, MOCK_STUDENTS_LIST, MOCK_STUDENT_GRADES } from '../services/mockData';
import { Course, Module, Lesson, User, GradeRecord } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';

interface AdminPageProps {
  onNavigate: (page: string, params?: any) => void;
  pageParams?: any;
}

// --- Admin Dashboard ---
export const AdminDashboard: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const data = [
    { name: 'Jan', students: 1100 }, { name: 'Feb', students: 1120 }, { name: 'Mar', students: 1150 },
    { name: 'Apr', students: 1180 }, { name: 'May', students: 1200 }, { name: 'Jun', students: 1250 },
  ];

  return (
    <div className="space-y-6">
       <h1 className="text-2xl font-bold text-gray-900">School Overview</h1>
       
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-gray-500 text-sm font-medium">Total Students</p>
                   <p className="text-3xl font-bold text-gray-900 mt-1">1,250</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg"><Icons.User className="w-6 h-6 text-blue-600"/></div>
             </div>
             <p className="text-xs text-green-600 mt-2 flex items-center"><Icons.CheckCircle className="w-3 h-3 mr-1"/> +5% from last month</p>
          </Card>
          <Card className="p-6">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-gray-500 text-sm font-medium">Active Courses</p>
                   <p className="text-3xl font-bold text-gray-900 mt-1">42</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg"><Icons.BookOpen className="w-6 h-6 text-purple-600"/></div>
             </div>
             <p className="text-xs text-gray-500 mt-2">Across 4 grade levels</p>
          </Card>
          <Card className="p-6">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-gray-500 text-sm font-medium">Teachers</p>
                   <p className="text-3xl font-bold text-gray-900 mt-1">68</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg"><Icons.GraduationCap className="w-6 h-6 text-orange-600"/></div>
             </div>
             <p className="text-xs text-green-600 mt-2">Full Staffed</p>
          </Card>
          <Card className="p-6">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-gray-500 text-sm font-medium">Pending Requests</p>
                   <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg"><Icons.Bell className="w-6 h-6 text-red-600"/></div>
             </div>
             <p className="text-xs text-red-600 mt-2">Action Required</p>
          </Card>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
             <h3 className="text-lg font-bold text-gray-900 mb-6">Student Enrollment Growth</h3>
             <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </Card>
          <Card className="p-6">
             <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
             <div className="space-y-3">
               <button onClick={() => onNavigate('admin-create-course')} className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center transition">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 mr-3">
                     <Icons.BookOpen className="w-4 h-4"/>
                  </div>
                  <span className="font-medium text-gray-700">Add New Course</span>
               </button>
               <button onClick={() => onNavigate('admin-students')} className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center transition">
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600 mr-3">
                     <Icons.User className="w-4 h-4"/>
                  </div>
                  <span className="font-medium text-gray-700">Register Student</span>
               </button>
               <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center transition">
                  <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center text-orange-600 mr-3">
                     <Icons.FileText className="w-4 h-4"/>
                  </div>
                  <span className="font-medium text-gray-700">Publish Announcement</span>
               </button>
             </div>
          </Card>
       </div>
    </div>
  );
};

// --- Admin Course List ---
export const AdminCourseList: React.FC<AdminPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
         <Button onClick={() => onNavigate('admin-create-course')}><Icons.CheckCircle className="w-4 h-4 mr-2" /> Create New Course</Button>
      </div>

      <Card className="overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                  <tr>
                     <th className="px-6 py-4">Course Name</th>
                     <th className="px-6 py-4">Instructor</th>
                     <th className="px-6 py-4">Grade</th>
                     <th className="px-6 py-4">Students</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {COURSES.map(course => (
                     <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                           <div className="flex items-center">
                              <img src={course.thumbnail} className="w-10 h-10 rounded object-cover mr-3" alt="" />
                              <div>
                                 <div className="font-medium text-gray-900">{course.title}</div>
                                 <div className="text-xs text-gray-500">{course.category}</div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">{course.instructor}</td>
                        <td className="px-6 py-4">Grade 11</td>
                        <td className="px-6 py-4">{course.students}</td>
                        <td className="px-6 py-4"><Badge color="green">Active</Badge></td>
                        <td className="px-6 py-4">
                           <div className="flex space-x-2">
                              <button onClick={() => onNavigate('admin-create-course', { id: course.id })} className="text-blue-600 hover:text-blue-800">Edit</button>
                              <button className="text-red-600 hover:text-red-800">Delete</button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );
};

// --- Admin Create/Edit Course (With Question Editor) ---
export const AdminCourseEditor: React.FC<AdminPageProps> = ({ onNavigate, pageParams }) => {
  const isEditMode = !!pageParams?.id;
  const existingCourse = isEditMode ? COURSES.find(c => c.id === pageParams.id) : null;

  // State for form
  const [courseData, setCourseData] = useState<Partial<Course>>(existingCourse || {
    title: '',
    description: '',
    category: 'Mathematics',
    instructor: 'Mr. ',
    modules: [],
    thumbnail: ''
  });

  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(null);
  
  // Question Editor State
  const [activeLessonForQuestions, setActiveLessonForQuestions] = useState<{ mIndex: number, lIndex: number } | null>(null);

  const addModule = () => {
    const newModule: Module = { id: `m${Date.now()}`, title: 'New Module', lessons: [] };
    setCourseData(prev => ({ ...prev, modules: [...(prev.modules || []), newModule] }));
    setActiveModuleIndex((courseData.modules?.length || 0));
  };

  const updateModuleTitle = (index: number, title: string) => {
    const newModules = [...(courseData.modules || [])];
    newModules[index].title = title;
    setCourseData(prev => ({ ...prev, modules: newModules }));
  };

  const addLesson = (moduleIndex: number) => {
    const newLesson: Lesson = { 
       id: `l${Date.now()}`, 
       title: 'New Lesson', 
       duration: '00:00', 
       type: 'video', 
       completed: false,
       questions: []
    };
    const newModules = [...(courseData.modules || [])];
    newModules[moduleIndex].lessons.push(newLesson);
    setCourseData(prev => ({ ...prev, modules: newModules }));
  };

  const updateLesson = (moduleIndex: number, lessonIndex: number, field: keyof Lesson, value: any) => {
    const newModules = [...(courseData.modules || [])];
    newModules[moduleIndex].lessons[lessonIndex] = {
       ...newModules[moduleIndex].lessons[lessonIndex],
       [field]: value
    };
    setCourseData(prev => ({ ...prev, modules: newModules }));
  };

  // --- Question Editor Logic ---
  const handleEditQuestions = (mIndex: number, lIndex: number) => {
     setActiveLessonForQuestions({ mIndex, lIndex });
  };

  const addQuestion = () => {
     if (!activeLessonForQuestions) return;
     const { mIndex, lIndex } = activeLessonForQuestions;
     const newModules = [...(courseData.modules || [])];
     const lesson = newModules[mIndex].lessons[lIndex];
     
     if (!lesson.questions) lesson.questions = [];
     
     lesson.questions.push({
        id: `q${Date.now()}`,
        text: 'New Question',
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        correctAnswer: 0
     });
     
     setCourseData(prev => ({ ...prev, modules: newModules }));
  };

  const updateQuestion = (qIndex: number, field: string, value: any, optionIndex?: number) => {
     if (!activeLessonForQuestions) return;
     const { mIndex, lIndex } = activeLessonForQuestions;
     const newModules = [...(courseData.modules || [])];
     const question = newModules[mIndex].lessons[lIndex].questions![qIndex];

     if (field === 'text') question.text = value;
     if (field === 'correctAnswer') question.correctAnswer = parseInt(value);
     if (field === 'option' && optionIndex !== undefined) question.options[optionIndex] = value;

     setCourseData(prev => ({ ...prev, modules: newModules }));
  };

  const handleSave = () => {
    alert("Course Saved Successfully! (Mock)");
    onNavigate('admin-courses');
  };

  if (activeLessonForQuestions) {
     const { mIndex, lIndex } = activeLessonForQuestions;
     const lesson = courseData.modules![mIndex].lessons[lIndex];

     return (
        <div className="max-w-4xl mx-auto pb-20">
           <Button variant="ghost" onClick={() => setActiveLessonForQuestions(null)} className="mb-4">
              <Icons.ChevronRight className="rotate-180 w-4 h-4 mr-2" /> Back to Course Editor
           </Button>
           <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Edit Questions for: {lesson.title}</h1>
              <Button onClick={addQuestion}>+ Add Question</Button>
           </div>
           
           <div className="space-y-6">
              {lesson.questions?.map((q, qIndex) => (
                 <Card key={q.id} className="p-6">
                    <div className="flex justify-between mb-4">
                       <h4 className="font-bold">Question {qIndex + 1}</h4>
                       <button className="text-red-500 text-sm">Delete</button>
                    </div>
                    <div className="mb-4">
                       <Label>Question Text</Label>
                       <Input value={q.text} onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                       {q.options.map((opt, oIndex) => (
                          <div key={oIndex}>
                             <Label className="text-xs text-gray-500">Option {oIndex + 1}</Label>
                             <div className="flex items-center space-x-2">
                                <input 
                                  type="radio" 
                                  name={`correct-${q.id}`} 
                                  checked={q.correctAnswer === oIndex} 
                                  onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                                />
                                <Input value={opt} onChange={(e) => updateQuestion(qIndex, 'option', e.target.value, oIndex)} />
                             </div>
                          </div>
                       ))}
                    </div>
                    <p className="text-xs text-gray-500 italic">Select the radio button next to the correct answer.</p>
                 </Card>
              ))}
              {(!lesson.questions || lesson.questions.length === 0) && (
                 <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                    No questions added yet.
                 </div>
              )}
           </div>
        </div>
     );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
       <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
             <Button variant="ghost" onClick={() => onNavigate('admin-courses')} className="mr-4">
                <Icons.ChevronRight className="rotate-180 w-4 h-4" />
             </Button>
             <h1 className="text-2xl font-bold text-gray-900">{isEditMode ? 'Edit Course' : 'Create New Course'}</h1>
          </div>
          <div className="flex space-x-3">
             <Button variant="outline" onClick={() => onNavigate('admin-courses')}>Cancel</Button>
             <Button onClick={handleSave}>Save Course</Button>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
             {/* Basic Info */}
             <Card className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Basic Information</h3>
                <div>
                   <Label>Course Title</Label>
                   <Input value={courseData.title} onChange={e => setCourseData({...courseData, title: e.target.value})} placeholder="e.g. Grade 11 Advanced Physics" />
                </div>
                <div>
                   <Label>Description</Label>
                   <textarea 
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" 
                     rows={4}
                     value={courseData.description}
                     onChange={e => setCourseData({...courseData, description: e.target.value})}
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <Label>Subject / Category</Label>
                      <Select value={courseData.category} onChange={e => setCourseData({...courseData, category: e.target.value})}>
                         <option>Mathematics</option>
                         <option>Physics</option>
                         <option>Biology</option>
                         <option>Chemistry</option>
                         <option>English</option>
                         <option>Civics</option>
                         <option>ICT</option>
                      </Select>
                   </div>
                   <div>
                      <Label>Instructor Name</Label>
                      <Input value={courseData.instructor} onChange={e => setCourseData({...courseData, instructor: e.target.value})} />
                   </div>
                </div>
             </Card>

             {/* Curriculum Builder */}
             <Card className="p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                   <h3 className="text-lg font-bold text-gray-900">Curriculum & Content</h3>
                   <Button size="sm" onClick={addModule}>+ Add Module</Button>
                </div>
                
                {courseData.modules?.length === 0 && (
                   <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                      No modules added yet. Start by adding a module.
                   </div>
                )}

                <div className="space-y-4">
                   {courseData.modules?.map((module, mIndex) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                         <div className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer" onClick={() => setActiveModuleIndex(activeModuleIndex === mIndex ? null : mIndex)}>
                            <div className="flex items-center flex-1">
                               <Icons.ChevronRight className={`w-4 h-4 mr-2 transition-transform ${activeModuleIndex === mIndex ? 'rotate-90' : ''}`} />
                               <input 
                                 className="bg-transparent font-medium text-gray-900 focus:outline-none w-full"
                                 value={module.title}
                                 onChange={(e) => updateModuleTitle(mIndex, e.target.value)}
                                 onClick={(e) => e.stopPropagation()}
                                 placeholder="Module Title"
                               />
                            </div>
                            <span className="text-xs text-gray-500">{module.lessons.length} Lessons</span>
                         </div>
                         
                         {activeModuleIndex === mIndex && (
                            <div className="p-4 bg-white border-t border-gray-200 space-y-3">
                               {module.lessons.map((lesson, lIndex) => (
                                  <div key={lesson.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg bg-gray-50/50">
                                     <div className="mt-2 text-gray-400"><Icons.Menu className="w-4 h-4" /></div>
                                     <div className="flex-1 space-y-2">
                                        <Input 
                                           value={lesson.title} 
                                           onChange={(e) => updateLesson(mIndex, lIndex, 'title', e.target.value)}
                                           placeholder="Lesson Title"
                                           className="bg-white"
                                        />
                                        <div className="flex flex-wrap gap-2">
                                           <Select 
                                             value={lesson.type} 
                                             onChange={(e) => updateLesson(mIndex, lIndex, 'type', e.target.value)}
                                             className="w-32 bg-white"
                                           >
                                              <option value="video">Video</option>
                                              <option value="reading">PDF/Read</option>
                                              <option value="quiz">Quiz</option>
                                              <option value="mid-exam">Mid Exam</option>
                                              <option value="final-exam">Final Exam</option>
                                           </Select>
                                           
                                           {/* Context Actions based on Type */}
                                           {(lesson.type === 'quiz' || lesson.type === 'mid-exam' || lesson.type === 'final-exam') ? (
                                              <Button size="sm" variant="secondary" onClick={() => handleEditQuestions(mIndex, lIndex)} className="text-xs">
                                                 <Icons.Settings className="w-3 h-3 mr-1" /> Edit Questions
                                              </Button>
                                           ) : (
                                              <div className="relative flex-1">
                                                {/* Fake File Upload UI */}
                                                <div className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-500">
                                                   <Icons.Download className="w-4 h-4 mr-2" />
                                                   <span className="truncate">{lesson.content ? 'File Selected' : 'No file chosen'}</span>
                                                   <label className="ml-auto text-primary-600 font-medium cursor-pointer hover:underline">
                                                      Upload
                                                      <input type="file" className="hidden" onChange={() => updateLesson(mIndex, lIndex, 'content', 'mock_url')} />
                                                   </label>
                                                </div>
                                              </div>
                                           )}
                                        </div>
                                     </div>
                                     <button className="text-red-500 hover:text-red-700 mt-2" onClick={() => {
                                        const newModules = [...(courseData.modules || [])];
                                        newModules[mIndex].lessons.splice(lIndex, 1);
                                        setCourseData({...courseData, modules: newModules});
                                     }}>
                                        <Icons.X className="w-4 h-4" />
                                     </button>
                                  </div>
                               ))}
                               <Button size="sm" variant="outline" className="w-full border-dashed" onClick={() => addLesson(mIndex)}>+ Add Lesson</Button>
                            </div>
                         )}
                      </div>
                   ))}
                </div>
             </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="lg:col-span-1 space-y-6">
             <Card className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Course Settings</h3>
                
                <div>
                   <Label>Thumbnail Image</Label>
                   <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 mb-2 overflow-hidden">
                      {courseData.thumbnail ? (
                         <img src={courseData.thumbnail} alt="" className="w-full h-full object-cover" />
                      ) : (
                         <>
                           <Icons.Camera className="w-8 h-8 text-gray-400 mb-2" />
                           <span className="text-xs text-gray-500">Click to upload</span>
                         </>
                      )}
                   </div>
                   <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"/>
                </div>

                <div>
                   <Label>Enrollment Status</Label>
                   <Select>
                      <option>Open for Enrollment</option>
                      <option>Closed</option>
                      <option>Draft (Hidden)</option>
                   </Select>
                </div>
             </Card>
          </div>
       </div>
    </div>
  );
};

// --- Admin Student List ---
export const AdminStudentList: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

  const filteredStudents = MOCK_STUDENTS_LIST.filter(s => {
      const q = searchQuery.toLowerCase();
      return (
         s.name.toLowerCase().includes(q) ||
         s.email.toLowerCase().includes(q) ||
         (s.id && s.id.toLowerCase().includes(q))
      );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold text-gray-900">Manage Students</h1>
         <div className="flex space-x-2">
            <Button variant="outline"><Icons.Download className="w-4 h-4 mr-2"/> Export CSV</Button>
            <Button onClick={() => {}}><Icons.User className="w-4 h-4 mr-2" /> Add Student</Button>
         </div>
      </div>

      <Card>
         {/* Filters */}
         <div className="p-4 border-b border-gray-100 flex gap-4">
            <div className="relative flex-1 max-w-sm">
                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search by Name, ID, or Email..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <Select className="max-w-xs">
               <option>All Grades</option>
               <option>Grade 9</option>
               <option>Grade 10</option>
               <option>Grade 11</option>
               <option>Grade 12</option>
            </Select>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                  <tr>
                     <th className="px-6 py-4">Student ID</th>
                     <th className="px-6 py-4">Name</th>
                     <th className="px-6 py-4">Email</th>
                     <th className="px-6 py-4">Grade</th>
                     <th className="px-6 py-4">Enrolled Courses</th>
                     <th className="px-6 py-4">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {filteredStudents.length > 0 ? filteredStudents.map(student => (
                     <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-500 font-mono text-xs">{student.id}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                           <div className="flex items-center">
                              <img src={student.avatar} className="w-8 h-8 rounded-full mr-2" alt=""/>
                              {student.name}
                           </div>
                        </td>
                        <td className="px-6 py-4">{student.email}</td>
                        <td className="px-6 py-4">{student.gradeLevel || 'N/A'}</td>
                        <td className="px-6 py-4">{student.enrolledCourseIds.length}</td>
                        <td className="px-6 py-4">
                           <button 
                             className="text-primary-600 hover:underline font-medium"
                             onClick={() => onNavigate('admin-student-detail', { id: student.id })}
                           >
                             View Profile
                           </button>
                        </td>
                     </tr>
                  )) : (
                     <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                           No students found matching "{searchQuery}"
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );
};

// --- Admin Student Detail View ---
export const AdminStudentDetail: React.FC<AdminPageProps> = ({ onNavigate, pageParams }) => {
  const student = MOCK_STUDENTS_LIST.find(s => s.id === pageParams?.id);
  const grades = MOCK_STUDENT_GRADES[student?.id || ''] || { studentId: student?.id, gpa: 0, attendance: 0, rank: 0, grades: [] };
  const [activeTab, setActiveTab] = useState<'profile' | 'academic'>('academic');
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock editing state
  const [editForm, setEditForm] = useState(student || {} as User);

  if (!student) return <div>Student not found.</div>;

  const handleGenerateReport = () => {
      // Mock PDF Generation
      const printWindow = window.open('', '_blank');
      if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Report Card - ${student.name}</title>
                <style>
                  body { font-family: sans-serif; padding: 40px; }
                  h1 { color: #0066CC; border-bottom: 2px solid #0066CC; padding-bottom: 10px; }
                  table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                  th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                  th { background-color: #f2f2f2; }
                  .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
                </style>
              </head>
              <body>
                 <div class="header">
                    <div>
                      <h1>Noor High School</h1>
                      <p>Addis Ababa, Ethiopia</p>
                    </div>
                    <div style="text-align: right;">
                       <h2>OFFICIAL REPORT CARD</h2>
                       <p>Academic Year 2024/2025</p>
                    </div>
                 </div>
                 
                 <h3>Student Information</h3>
                 <p><strong>Name:</strong> ${student.name}</p>
                 <p><strong>ID:</strong> ${student.id}</p>
                 <p><strong>Grade Level:</strong> ${student.gradeLevel}</p>
                 
                 <h3>Academic Performance</h3>
                 <table>
                    <thead>
                       <tr>
                         <th>Subject</th>
                         <th>Mid Exam</th>
                         <th>Final Exam</th>
                         <th>Total</th>
                         <th>Grade</th>
                       </tr>
                    </thead>
                    <tbody>
                       ${grades.grades.map(g => `
                          <tr>
                             <td>${g.courseName}</td>
                             <td>${g.midExam}</td>
                             <td>${g.finalExam}</td>
                             <td>${g.total}</td>
                             <td><strong>${g.letterGrade}</strong></td>
                          </tr>
                       `).join('')}
                    </tbody>
                 </table>
                 
                 <div style="margin-top: 40px;">
                    <p><strong>GPA:</strong> ${grades.gpa}</p>
                    <p><strong>Attendance:</strong> ${grades.attendance}%</p>
                    <p><strong>Class Rank:</strong> ${grades.rank}</p>
                 </div>
                 
                 <div style="margin-top: 60px; border-top: 1px solid #000; display: inline-block; padding-top: 10px;">
                    Principal's Signature
                 </div>
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.print();
      }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
       <Button variant="ghost" onClick={() => onNavigate('admin-students')} className="mb-2">
          <Icons.ChevronRight className="rotate-180 w-4 h-4 mr-2" /> Back to Students
       </Button>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Profile Card */}
          <div className="md:col-span-1 space-y-6">
             <Card className="p-6 text-center">
                <img src={student.avatar} alt="" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-100" />
                <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
                <p className="text-gray-500 text-sm mb-4">{student.email}</p>
                <Badge color="blue">{student.gradeLevel || 'Student'}</Badge>
                
                <div className="mt-6 border-t border-gray-100 pt-6 text-left space-y-3">
                   <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Student ID</span>
                      <span className="font-mono text-sm">{student.id}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Phone</span>
                      <span className="text-sm">{student.phone || 'N/A'}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Enrolled</span>
                      <span className="text-sm">{student.enrolledCourseIds.length} Courses</span>
                   </div>
                </div>
             </Card>
             
             <Card className="p-4">
                 <h4 className="font-bold text-gray-900 mb-2">Actions</h4>
                 <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('profile')}>
                       <Icons.Settings className="w-4 h-4 mr-2" /> Edit Info
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50">
                       <Icons.LogOut className="w-4 h-4 mr-2" /> Suspend Account
                    </Button>
                 </div>
             </Card>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-2">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                   <button 
                     onClick={() => setActiveTab('academic')}
                     className={`flex-1 py-4 text-sm font-medium text-center ${activeTab === 'academic' ? 'bg-gray-50 text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
                   >
                     Academic Performance
                   </button>
                   <button 
                     onClick={() => setActiveTab('profile')}
                     className={`flex-1 py-4 text-sm font-medium text-center ${activeTab === 'profile' ? 'bg-gray-50 text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
                   >
                     Edit Profile
                   </button>
                </div>

                <div className="p-6">
                   {activeTab === 'academic' && (
                      <div className="space-y-6">
                         {/* Stats Row */}
                         <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-4 bg-blue-50 rounded-lg">
                               <div className="text-2xl font-bold text-blue-700">{grades.gpa || '-'}</div>
                               <div className="text-xs text-blue-600 font-medium uppercase">GPA</div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                               <div className="text-2xl font-bold text-green-700">{grades.attendance}%</div>
                               <div className="text-xs text-green-600 font-medium uppercase">Attendance</div>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg">
                               <div className="text-2xl font-bold text-purple-700">#{grades.rank}</div>
                               <div className="text-xs text-purple-600 font-medium uppercase">Class Rank</div>
                            </div>
                         </div>

                         {/* Grades Table */}
                         <div>
                            <div className="flex justify-between items-center mb-4">
                               <h3 className="text-lg font-bold text-gray-900">Current Semester Grades</h3>
                               <Button size="sm" onClick={handleGenerateReport}>
                                  <Icons.Download className="w-4 h-4 mr-2" /> Generate Report Card
                               </Button>
                            </div>
                            <div className="overflow-x-auto">
                               <table className="w-full text-sm text-left border border-gray-100 rounded-lg">
                                  <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                                     <tr>
                                        <th className="px-4 py-3">Subject</th>
                                        <th className="px-4 py-3 text-center">Quiz Avg</th>
                                        <th className="px-4 py-3 text-center">Mid Exam</th>
                                        <th className="px-4 py-3 text-center">Final Exam</th>
                                        <th className="px-4 py-3 text-center">Total</th>
                                        <th className="px-4 py-3 text-center">Grade</th>
                                     </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-100">
                                     {grades.grades.length > 0 ? grades.grades.map((g, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                           <td className="px-4 py-3 font-medium text-gray-900">{g.courseName}</td>
                                           <td className="px-4 py-3 text-center">{g.quizAverage}</td>
                                           <td className="px-4 py-3 text-center">{g.midExam}</td>
                                           <td className="px-4 py-3 text-center">{g.finalExam}</td>
                                           <td className="px-4 py-3 text-center font-bold">{g.total}</td>
                                           <td className="px-4 py-3 text-center">
                                              <Badge color={g.letterGrade === 'A' ? 'green' : g.letterGrade === 'B' ? 'blue' : 'yellow'}>
                                                 {g.letterGrade}
                                              </Badge>
                                           </td>
                                        </tr>
                                     )) : (
                                        <tr><td colSpan={6} className="text-center py-4 text-gray-500">No grades recorded yet.</td></tr>
                                     )}
                                  </tbody>
                               </table>
                            </div>
                         </div>
                      </div>
                   )}

                   {activeTab === 'profile' && (
                      <div className="space-y-4">
                         <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-bold text-gray-900">Edit Student Information</h3>
                            <Button onClick={() => { alert('Changes saved!'); setIsEditing(false); }}>Save Changes</Button>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                               <Label>First Name</Label>
                               <Input defaultValue={student.name.split(' ')[0]} />
                            </div>
                            <div>
                               <Label>Last Name</Label>
                               <Input defaultValue={student.name.split(' ')[1]} />
                            </div>
                            <div className="col-span-2">
                               <Label>Email Address</Label>
                               <Input defaultValue={student.email} />
                            </div>
                            <div>
                               <Label>Phone Number</Label>
                               <Input defaultValue={student.phone} />
                            </div>
                            <div>
                               <Label>Grade Level</Label>
                               <Select defaultValue={student.gradeLevel}>
                                  <option>Grade 9</option>
                                  <option>Grade 10</option>
                                  <option>Grade 11</option>
                                  <option>Grade 12</option>
                               </Select>
                            </div>
                         </div>
                      </div>
                   )}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
