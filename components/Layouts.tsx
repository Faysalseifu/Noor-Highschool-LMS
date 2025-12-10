import React, { useState, useEffect, useRef } from 'react';
import { Icons, Button } from './SharedComponents';
import { User, ChatMessage } from '../types';
import { generateGlobalChatResponse } from '../services/geminiService';

interface LayoutProps {
  children: React.ReactNode;
  user?: User;
  onNavigate: (page: string, params?: any) => void;
  currentPage: string;
}

// --- Global Chatbot Component ---
export const GlobalChatbot: React.FC<{ currentPage: string }> = ({ currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial Welcome Message based on Page
  useEffect(() => {
    // Reset or add context message when page changes
    let contextMsg = "";
    switch(currentPage) {
      case 'home': contextMsg = "Welcome to Noor High School! Ask me about admissions or our mission."; break;
      case 'dashboard': contextMsg = "Hi! I can help you find your grades, schedule, or latest assignments here."; break;
      case 'register': contextMsg = "Need help creating your Student ID? Ask me!"; break;
      case 'my-courses': contextMsg = "Here are your enrolled subjects. Need help picking a new one?"; break;
      default: contextMsg = "How can I help you navigate Noor High School's platform today?"; break;
    }

    setMessages([{
      id: 'init',
      role: 'model',
      text: contextMsg,
      timestamp: new Date()
    }]);
  }, [currentPage]);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    const response = await generateGlobalChatResponse(
      userMsg.text, 
      currentPage, 
      messages.filter(m => m.id !== 'init').map(m => ({ role: m.role, text: m.text }))
    );

    setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'model', text: response, timestamp: new Date() }]);
    setIsThinking(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
       {/* Chat Window */}
       {isOpen && (
         <div className="mb-4 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
            {/* Header */}
            <div className="bg-primary-600 p-4 flex justify-between items-center text-white">
               <div className="flex items-center">
                  <div className="bg-white/20 p-1.5 rounded-lg mr-2">
                    <Icons.MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Noor Assistant</h3>
                    <p className="text-[10px] text-primary-100 opacity-90">Powered by Gemini</p>
                  </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
                  <Icons.Minimize2 className="w-4 h-4" />
               </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900/50">
               {messages.map(msg => (
                 <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary-600 text-white rounded-br-none' 
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-bl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                 </div>
               ))}
               {isThinking && (
                 <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-700 rounded-2xl px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-bl-none shadow-sm flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                       <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                       <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                 </div>
               )}
            </div>

            {/* Input */}
            <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
               <form 
                 onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                 className="flex items-center gap-2"
               >
                 <input 
                   className="flex-1 text-sm bg-gray-100 dark:bg-gray-700 border-none rounded-full px-4 py-2 focus:ring-2 focus:ring-primary-500 dark:text-white"
                   placeholder="Type a question..."
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                 />
                 <button 
                   type="submit" 
                   disabled={!input.trim() || isThinking}
                   className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 transition"
                 >
                   <Icons.Send className="w-4 h-4" />
                 </button>
               </form>
            </div>
         </div>
       )}

       {/* Toggle Button */}
       {!isOpen && (
         <button 
           onClick={() => setIsOpen(true)}
           className="h-14 w-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-300"
         >
           <Icons.MessageCircle className="w-7 h-7" />
           {/* Notification Dot */}
           <span className="absolute top-0 right-0 flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
           </span>
         </button>
       )}
    </div>
  );
};

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
      {isDark ? <Icons.Sun className="h-5 w-5" /> : <Icons.Moon className="h-5 w-5" />}
    </button>
  );
};

const LanguageSelector: React.FC = () => {
  const [lang, setLang] = useState('EN');

  return (
    <div className="flex items-center space-x-1 text-sm font-medium text-gray-600 dark:text-gray-300 cursor-pointer hover:text-primary-600 transition-colors">
      <Icons.Globe className="w-4 h-4" />
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value)} 
        className="bg-transparent border-none focus:ring-0 cursor-pointer text-xs"
      >
        <option value="EN">English</option>
        <option value="AM">Amharic</option>
      </select>
    </div>
  );
};

// --- Public Layout (Header & Footer) ---
export const PublicLayout: React.FC<LayoutProps> = ({ children, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                 <Icons.GraduationCap className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-none">Noor High School</h1>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              {['Home', 'About', 'Courses', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => onNavigate(item.toLowerCase())}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
              <ThemeToggle />
              <LanguageSelector />
            </nav>

            <div className="hidden md:flex items-center space-x-4">
               {/* Hidden Admin Trigger for Demo */}
               <button onClick={() => onNavigate('admin-login-trigger', { isAdmin: true })} className="text-xs text-gray-300 dark:text-gray-600 hover:text-gray-500 uppercase tracking-widest font-bold">
                 Admin
               </button>
               <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
               <button onClick={() => onNavigate('dashboard')} className="text-gray-900 dark:text-white font-medium hover:text-primary-600">
                 Student Portal
               </button>
               <Button onClick={() => onNavigate('dashboard')}>Login</Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 dark:text-gray-300">
                {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 py-4 px-4 space-y-3 shadow-lg">
             {['Home', 'About', 'Courses', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => { onNavigate(item.toLowerCase()); setMobileMenuOpen(false); }}
                  className="block w-full text-left text-gray-600 dark:text-gray-300 font-medium py-2"
                >
                  {item}
                </button>
              ))}
              <div className="py-2"><LanguageSelector /></div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-col space-y-3">
                 <Button className="w-full" onClick={() => onNavigate('dashboard')}>Student Login</Button>
                 <button onClick={() => onNavigate('admin-login-trigger', { isAdmin: true })} className="text-center text-xs text-gray-400 mt-2">Admin Login</button>
              </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
               <div className="w-8 h-8 bg-primary-500 rounded flex items-center justify-center text-white">
                 <Icons.GraduationCap className="h-5 w-5" />
               </div>
               <span className="ml-2 text-lg font-bold">Noor High School</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Empowering students with high-quality education, digital learning tools, and academic excellence.
            </p>
            <div className="text-gray-400 text-sm">
                <p>Addis Ababa, Ethiopia</p>
                <p>+251 900 000 000</p>
                <p>info@noorhighschool.com</p>
            </div>
          </div>
          <div>
             <h4 className="font-semibold mb-4 text-primary-200">Quick Links</h4>
             <ul className="space-y-2 text-gray-400 text-sm">
               <li className="cursor-pointer hover:text-white">Academic Calendar</li>
               <li className="cursor-pointer hover:text-white">Admissions</li>
               <li className="cursor-pointer hover:text-white">School News</li>
               <li className="cursor-pointer hover:text-white">Student Portal</li>
             </ul>
          </div>
           <div>
             <h4 className="font-semibold mb-4 text-primary-200">Resources</h4>
             <ul className="space-y-2 text-gray-400 text-sm">
               <li className="cursor-pointer hover:text-white">Library</li>
               <li className="cursor-pointer hover:text-white">e-Learning Rules</li>
               <li className="cursor-pointer hover:text-white">Parent Guide</li>
             </ul>
          </div>
           <div>
             <h4 className="font-semibold mb-4 text-primary-200">Stay Connected</h4>
             <p className="text-sm text-gray-400 mb-4">Follow us for the latest updates and announcements.</p>
             <div className="flex space-x-4">
                {/* Social Placeholders */}
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-primary-600 cursor-pointer transition">F</div>
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-primary-600 cursor-pointer transition">T</div>
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-primary-600 cursor-pointer transition">I</div>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
           © 2025 Noor High School – All Rights Reserved. Powered by the Noor Digital Learning Platform.
        </div>
      </footer>
    </div>
  );
};

// --- Student Layout ---
export const StudentLayout: React.FC<LayoutProps> = ({ children, user, onNavigate, currentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.LayoutDashboard },
    { id: 'my-courses', label: 'My Courses', icon: Icons.BookOpen },
    { id: 'exams', label: 'Exams & Quiz', icon: Icons.CheckCircle },
    { id: 'certificates', label: 'Certificates', icon: Icons.GraduationCap },
    { id: 'profile', label: 'My Profile', icon: Icons.User },
    { id: 'settings', label: 'Settings', icon: Icons.Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed h-full z-10 transition-colors">
        <div className="h-20 flex items-center px-6 border-b border-gray-100 dark:border-gray-700">
           <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center text-white">
                 <Icons.GraduationCap className="h-5 w-5" />
           </div>
           <span className="ml-3 text-lg font-bold text-gray-900 dark:text-white tracking-tight">Noor High School</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === item.id 
                  ? 'bg-primary-50 dark:bg-gray-700 text-primary-700 dark:text-primary-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <item.icon className={`mr-3 h-5 w-5 ${currentPage === item.id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
           <button onClick={() => onNavigate('home', { logout: true })} className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
             <Icons.LogOut className="mr-3 h-5 w-5" />
             Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center px-4 sm:px-6 sticky top-0 z-20 transition-colors">
          <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(true)}>
            <Icons.Menu />
          </button>

          <div className="flex-1 max-w-xl mx-4 lg:mx-0 hidden sm:block">
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Academic Year 2024/2025</span>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSelector />
            <button className="text-gray-400 hover:text-gray-500 relative">
              <Icons.Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800" />
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
               <div className="text-right hidden sm:block">
                   <div className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</div>
                   <div className="text-xs text-gray-500 dark:text-gray-400">Student</div>
               </div>
               <img src={user?.avatar} alt="" className="h-8 w-8 rounded-full bg-gray-200 border border-gray-200 dark:border-gray-700" />
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white dark:bg-gray-800 shadow-xl transition-colors">
             <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-700">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Noor High School</span>
                <button onClick={() => setSidebarOpen(false)}><Icons.X className="h-6 w-6 text-gray-500" /></button>
             </div>
             <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium ${
                    currentPage === item.id ? 'bg-primary-50 dark:bg-gray-700 text-primary-700 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Admin Layout (Darker Sidebar) ---
export const AdminLayout: React.FC<LayoutProps> = ({ children, user, onNavigate, currentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: Icons.LayoutDashboard },
    { id: 'admin-courses', label: 'Manage Courses', icon: Icons.BookOpen },
    { id: 'admin-students', label: 'Manage Students', icon: Icons.User },
    { id: 'admin-reports', label: 'Reports & Analytics', icon: Icons.FileText },
    { id: 'admin-settings', label: 'School Settings', icon: Icons.Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex transition-colors">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 fixed h-full z-10 text-white">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
           <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white">
                 <Icons.Shield className="h-5 w-5" />
           </div>
           <div className="ml-3">
             <span className="block text-lg font-bold tracking-tight">Admin Portal</span>
             <span className="block text-xs text-slate-400">Noor High School</span>
           </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === item.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`mr-3 h-5 w-5 ${currentPage === item.id ? 'text-white' : 'text-slate-500'}`} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
           <button onClick={() => onNavigate('home', { logout: true })} className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
             <Icons.LogOut className="mr-3 h-5 w-5" />
             Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center px-4 sm:px-6 sticky top-0 z-20">
          <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(true)}>
            <Icons.Menu />
          </button>

          <div className="flex-1"></div>

          <div className="flex items-center space-x-4">
             <ThemeToggle />
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
               <div className="text-right hidden sm:block">
                   <div className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</div>
                   <div className="text-xs text-gray-500 dark:text-gray-400">Administrator</div>
               </div>
               <img src={user?.avatar} alt="" className="h-8 w-8 rounded-full bg-gray-200 border border-gray-200 dark:border-gray-700" />
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
       {/* Mobile Sidebar Overlay for Admin (Similar to Student) */}
       {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-slate-900 text-white shadow-xl">
             <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
                <span className="text-lg font-bold">Admin Portal</span>
                <button onClick={() => setSidebarOpen(false)}><Icons.X className="h-6 w-6 text-slate-400" /></button>
             </div>
             <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium ${
                    currentPage === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};