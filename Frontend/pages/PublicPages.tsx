

import React, { useState } from 'react';
import { Button, Card, Badge, Icons, Input, Label, Select } from '../components/SharedComponents';
import { COURSES, ACADEMIC_CALENDAR } from '../services/mockData';

interface PublicPageProps {
  onNavigate: (page: string, params?: any) => void;
  courseId?: string;
}

// --- Home Page ---
export const HomePage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 pt-24 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge color="blue" ><span className="text-primary-700 font-semibold tracking-wider">WELCOME TO NOOR HIGH SCHOOL</span></Badge>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Learning for a <br className="hidden md:block"/> <span className="text-primary-200">Brighter Future</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-primary-100 mb-10">
            Noor High School provides modern, high-quality education designed to help students excel academically and build strong character.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50" onClick={() => onNavigate('dashboard')}>Student Login</Button>
            <Button size="lg" variant="outline" className="border-primary-200 text-primary-100 hover:bg-white/10" onClick={() => onNavigate('register')}>Register Now</Button>
          </div>
        </div>
        
        {/* Floating Stats Card */}
        <div className="absolute -bottom-16 left-0 right-0 px-4">
           <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
              {[
                { label: 'Active Students', value: '1,200+' },
                { label: 'Qualified Teachers', value: '50+' },
                { label: 'Graduates', value: '5,000+' },
                { label: 'University Acceptance', value: '98%' },
              ].map((stat, i) => (
                <div key={i} className={`text-center ${i > 0 ? 'pl-8' : ''}`}>
                  <div className="text-3xl font-bold text-primary-700">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Featured Courses / Subjects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Academic Subjects</h2>
            <p className="text-gray-600 mt-2">Explore our core curriculum and digital resources.</p>
          </div>
          <Button variant="ghost" onClick={() => onNavigate('courses')}>View All Subjects <Icons.ChevronRight className="w-4 h-4 ml-1" /></Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.slice(0, 4).map(course => (
            <Card key={course.id} className="group hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 left-2">
                  <Badge>{course.category}</Badge>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-gray-500 mb-2 space-x-2">
                   <div className="flex items-center"><Icons.User className="w-3 h-3 mr-1"/> Grade 9-12</div>
                </div>
                <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 flex-1">{course.description}</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
                   <div className="text-xs text-gray-500 font-medium">Teacher: {course.instructor}</div>
                   <button className="text-sm font-medium text-primary-600 hover:underline" onClick={() => onNavigate('course-detail', { id: course.id })}>Details</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-3xl font-bold text-gray-900 mb-6">Empowering Students Through Technology</h2>
                 <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                   At Noor High School, we integrate modern technology with traditional values. Our digital platform ensures that learning continues beyond the classroom.
                 </p>
                 <ul className="space-y-4 mb-8">
                    {[
                      'Access to high-quality video lessons and notes',
                      'Regular online assessments and quizzes',
                      'AI-powered personalized study assistance',
                      'Track progress and academic performance'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <Icons.CheckCircle className="w-5 h-5 text-primary-600 mr-3" />
                        {item}
                      </li>
                    ))}
                 </ul>
                 <Button onClick={() => onNavigate('about')}>Learn More About Us</Button>
              </div>
              <div className="relative">
                 <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <img src="https://picsum.photos/800/600?random=school" alt="Students learning" className="w-full h-full object-cover" />
                 </div>
                 {/* Floating badge */}
                 <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                    <div className="flex items-center gap-4">
                       <div className="bg-yellow-100 p-3 rounded-full">
                          <Icons.Star className="w-6 h-6 text-yellow-600" />
                       </div>
                       <div>
                          <p className="text-sm text-gray-500 font-medium">Excellence in Education</p>
                          <p className="text-lg font-bold text-gray-900">Since 2010</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary-900 py-16 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
             <h2 className="text-3xl font-bold mb-4">Join Noor High School</h2>
             <p className="text-primary-200 mb-8 text-lg">Admissions are now open for the upcoming academic year. Contact us to schedule a visit.</p>
             <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-white text-primary-900 hover:bg-gray-100" onClick={() => onNavigate('contact')}>Contact Admissions</Button>
                <Button size="lg" variant="outline" className="border-primary-200 text-white hover:bg-primary-800" onClick={() => onNavigate('register')}>Student Registration</Button>
             </div>
          </div>
      </section>
    </div>
  );
};

// --- About Page ---
export const AboutPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="relative bg-primary-900 py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <img src="https://picsum.photos/1920/600?random=school_building" alt="School Building" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
           <Badge color="blue" ><span className="text-blue-100 uppercase tracking-widest font-semibold">About Us</span></Badge>
           <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
             Nurturing Minds, <span className="text-primary-300">Building Character</span>
           </h1>
           <p className="mt-6 text-xl text-primary-100 max-w-2xl mx-auto">
             Noor High School is dedicated to providing holistic education that balances academic excellence with moral development.
           </p>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-white relative z-20 -mt-8 max-w-6xl mx-auto px-4">
         <div className="grid grid-cols-2 md:grid-cols-4 bg-white rounded-xl shadow-lg border border-gray-100 py-8 divide-x divide-gray-100">
            <div className="text-center p-4">
               <div className="text-3xl font-bold text-primary-600 mb-1">15+</div>
               <div className="text-xs text-gray-500 font-bold uppercase">Years of Excellence</div>
            </div>
            <div className="text-center p-4">
               <div className="text-3xl font-bold text-primary-600 mb-1">1,200+</div>
               <div className="text-xs text-gray-500 font-bold uppercase">Current Students</div>
            </div>
            <div className="text-center p-4">
               <div className="text-3xl font-bold text-primary-600 mb-1">60+</div>
               <div className="text-xs text-gray-500 font-bold uppercase">Expert Teachers</div>
            </div>
            <div className="text-center p-4">
               <div className="text-3xl font-bold text-primary-600 mb-1">100%</div>
               <div className="text-xs text-gray-500 font-bold uppercase">Dedication</div>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
               <h2 className="text-3xl font-bold text-gray-900">Our Story & Mission</h2>
               <p>
                  Established in Addis Ababa, Noor High School was founded with a vision to create a learning environment where modern education meets strong ethical values. Over the years, we have grown into one of the city's premier institutions for high school education.
               </p>
               <p>
                  Our mission is to empower students with the knowledge, skills, and character needed to thrive in a rapidly changing world. We believe that true education encompasses not just academic success, but also the development of empathy, discipline, and social responsibility.
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                     <h4 className="font-bold text-blue-900 mb-2">Our Vision</h4>
                     <p className="text-sm text-blue-800">To be a beacon of knowledge and integrity, producing leaders who positively impact their communities.</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                     <h4 className="font-bold text-green-900 mb-2">Our Values</h4>
                     <p className="text-sm text-green-800">Excellence, Integrity, Innovation, Discipline, and Community Service.</p>
                  </div>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <img src="https://picsum.photos/400/500?random=school1" className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8" alt="Students in library" />
               <img src="https://picsum.photos/400/500?random=school2" className="rounded-2xl shadow-lg w-full h-64 object-cover" alt="Science Lab" />
               <img src="https://picsum.photos/400/500?random=school3" className="rounded-2xl shadow-lg w-full h-64 object-cover" alt="Sports day" />
               <img src="https://picsum.photos/400/500?random=school4" className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8" alt="Classroom" />
            </div>
         </div>
      </section>

      {/* Academic Calendar Section */}
      <section className="bg-white py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="text-center mb-10">
          <Badge color="yellow">Important Dates</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">Academic Calendar 2024/2025</h2>
          <p className="text-gray-600 mt-2">Key dates for quizzes, exams, and holidays.</p>
        </div>
        
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          {ACADEMIC_CALENDAR.map((event, index) => (
            <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Icon / Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                {event.type === 'exam' ? <Icons.Clock className="w-5 h-5 text-orange-500" /> : 
                 event.type === 'holiday' ? <Icons.Sun className="w-5 h-5 text-yellow-500" /> :
                 <Icons.Calendar className="w-5 h-5 text-primary-500" />}
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <span className="font-bold text-slate-900">{event.title}</span>
                  <time className="font-mono text-xs font-medium text-slate-500">{event.date}</time>
                </div>
                <div className="text-slate-500 text-sm">
                   {event.description || 'No additional details.'}
                   <div className="mt-2">
                     <Badge color={event.type === 'exam' ? 'red' : event.type === 'holiday' ? 'yellow' : 'blue'}>
                       {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                     </Badge>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Principal Message */}
      <section className="bg-gray-50 py-20">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-6 overflow-hidden border-4 border-white shadow-md">
               <img src="https://ui-avatars.com/api/?name=Principal+Ahmed&background=0D8ABC&color=fff&size=128" alt="Principal" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Message from the Principal</h2>
            <p className="text-gray-500 font-medium mb-8">Mr. Ahmed Mohammed</p>
            <div className="relative">
               <Icons.MessageCircle className="w-10 h-10 text-primary-200 absolute -top-6 left-0 opacity-50" />
               <p className="text-xl text-gray-700 italic leading-relaxed">
                  "At Noor High School, we see every student as a unique individual with boundless potential. Our dedicated staff works tirelessly to provide a supportive and challenging environment. We are not just teaching subjects; we are shaping the future leaders of Ethiopia."
               </p>
            </div>
         </div>
      </section>

      {/* Facilities */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Campus & Facilities</h2>
            <p className="text-gray-600 mt-2">Providing a conducive environment for holistic growth.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
               { icon: Icons.BookOpen, title: 'Modern Library', desc: 'Stocked with thousands of books and digital resources.' },
               { icon: Icons.Brain, title: 'Science Labs', desc: 'Fully equipped Physics, Chemistry, and Biology laboratories.' },
               { icon: Icons.Zap, title: 'Computer Lab', desc: 'High-speed internet and modern computers for ICT learning.' },
               { icon: Icons.Video, title: 'Smart Classrooms', desc: 'Projectors and digital tools integrated into learning.' },
               { icon: Icons.User, title: 'Prayer Room', desc: 'Dedicated space for spiritual development and prayer.' },
               { icon: Icons.Shield, title: 'Sports Ground', desc: 'Areas for football, basketball, and physical activities.' },
            ].map((fac, i) => (
               <Card key={i} className="p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <fac.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{fac.title}</h3>
                  <p className="text-sm text-gray-500">{fac.desc}</p>
               </Card>
            ))}
         </div>
      </section>
    </div>
  );
};

// --- Contact Page ---
export const ContactPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
   const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setFormStatus('sending');
      setTimeout(() => setFormStatus('sent'), 1500);
   };

   return (
      <div className="bg-gray-50 min-h-screen">
         {/* Header */}
         <div className="bg-gray-900 py-16 text-center">
            <h1 className="text-3xl font-bold text-white">Contact Us</h1>
            <p className="text-gray-400 mt-2">We'd love to hear from you. Reach out with any questions.</p>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Contact Cards */}
               <div className="space-y-6">
                  <Card className="p-6 flex items-start space-x-4">
                     <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><Icons.Map className="w-6 h-6" /></div> // Note: Icons.Map might need to be added to SharedComponents if missing, using Icons.Globe or similar as fallback in mind, but assuming Map pin icon exists or use generic
                     <div>
                        <h3 className="font-bold text-gray-900">Visit Us</h3>
                        <p className="text-sm text-gray-600 mt-1">Bole Sub-city, Woreda 03</p>
                        <p className="text-sm text-gray-600">Addis Ababa, Ethiopia</p>
                     </div>
                  </Card>
                  <Card className="p-6 flex items-start space-x-4">
                     <div className="bg-green-100 p-3 rounded-lg text-green-600"><Icons.Phone className="w-6 h-6" /></div>
                     <div>
                        <h3 className="font-bold text-gray-900">Call Us</h3>
                        <p className="text-sm text-gray-600 mt-1">Main Office: +251 911 000 000</p>
                        <p className="text-sm text-gray-600">Admissions: +251 911 234 567</p>
                     </div>
                  </Card>
                  <Card className="p-6 flex items-start space-x-4">
                     <div className="bg-orange-100 p-3 rounded-lg text-orange-600"><Icons.Mail className="w-6 h-6" /></div>
                     <div>
                        <h3 className="font-bold text-gray-900">Email Us</h3>
                        <p className="text-sm text-gray-600 mt-1">General: info@noorhighschool.com</p>
                        <p className="text-sm text-gray-600">Support: support@noorhighschool.com</p>
                     </div>
                  </Card>
                  
                  {/* Working Hours */}
                  <Card className="p-6">
                     <h3 className="font-bold text-gray-900 mb-4 flex items-center"><Icons.Clock className="w-4 h-4 mr-2 text-gray-400"/> Working Hours</h3>
                     <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between"><span>Monday - Friday</span> <span>8:00 AM - 4:30 PM</span></div>
                        <div className="flex justify-between"><span>Saturday</span> <span>8:30 AM - 12:30 PM</span></div>
                        <div className="flex justify-between text-red-500"><span>Sunday</span> <span>Closed</span></div>
                     </div>
                  </Card>
               </div>

               {/* Contact Form */}
               <div className="lg:col-span-2 space-y-8">
                  <Card className="p-8">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                     {formStatus === 'sent' ? (
                        <div className="text-center py-12 bg-green-50 rounded-lg border border-green-100">
                           <Icons.CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                           <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                           <p className="text-gray-600 mt-2">Thank you for contacting us. We will get back to you shortly.</p>
                           <Button variant="outline" className="mt-6" onClick={() => setFormStatus('idle')}>Send Another</Button>
                        </div>
                     ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                 <Label htmlFor="name">Full Name</Label>
                                 <Input id="name" placeholder="Your name" required />
                              </div>
                              <div>
                                 <Label htmlFor="email">Email Address</Label>
                                 <Input id="email" type="email" placeholder="email@example.com" required />
                              </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                 <Label htmlFor="phone">Phone Number</Label>
                                 <Input id="phone" placeholder="+251..." />
                              </div>
                              <div>
                                 <Label htmlFor="subject">Subject</Label>
                                 <Select id="subject">
                                    <option>General Inquiry</option>
                                    <option>Admissions</option>
                                    <option>Technical Support</option>
                                    <option>Parent Feedback</option>
                                 </Select>
                              </div>
                           </div>
                           <div>
                              <Label htmlFor="message">Message</Label>
                              <textarea 
                                 id="message" 
                                 rows={5} 
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                 placeholder="How can we help you?"
                                 required
                              ></textarea>
                           </div>
                           <Button type="submit" size="lg" isLoading={formStatus === 'sending'}>Send Message</Button>
                        </form>
                     )}
                  </Card>

                  {/* FAQ */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                     <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                     <div className="space-y-4">
                        {[
                           { q: 'When does registration start?', a: 'Registration for the new academic year typically starts in July. Please check our website for exact dates.' },
                           { q: 'Is there an entrance exam?', a: 'Yes, new students for Grades 9-12 must take an entrance exam covering Math, English, and Science.' },
                           { q: 'Do you offer transportation services?', a: 'Yes, Noor High School provides bus services covering major routes in Addis Ababa. Contact the transport office for details.' }
                        ].map((item, i) => (
                           <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                              <h4 className="font-semibold text-gray-900 mb-2">{item.q}</h4>
                              <p className="text-sm text-gray-600">{item.a}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- Register Page ---
export const RegisterPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    grade: 'Grade 9',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generatedId, setGeneratedId] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.terms) newErrors.terms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Logic: Generate Student ID (Noor/Random4Digit/Year)
      // Example: Noor/1234/25
      const currentYear = new Date().getFullYear().toString().slice(-2);
      const randomId = Math.floor(1000 + Math.random() * 9000); // 4 digit random
      const newStudentId = `Noor/${randomId}/${currentYear}`;

      setGeneratedId(newStudentId);
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    // Clear error for that field
    if (errors[name]) {
      setErrors(prev => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    }
  };

  if (generatedId) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
           <Card className="p-8 text-center">
             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Icons.CheckCircle className="w-8 h-8 text-green-600" />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
             <p className="text-gray-600 mb-6">Welcome to Noor High School, {formData.firstName}.</p>
             
             <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 font-medium uppercase tracking-wide mb-1">Your Student ID</p>
                <p className="text-3xl font-mono font-bold text-primary-600">{generatedId}</p>
                <p className="text-xs text-blue-600 mt-2">Please memorize this ID. You will use it for all school activities.</p>
             </div>

             <Button className="w-full" onClick={() => onNavigate('dashboard')}>Proceed to Student Portal</Button>
           </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white">
             <Icons.GraduationCap className="h-8 w-8" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Student Registration</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an ID? <button onClick={() => onNavigate('dashboard')} className="font-medium text-primary-600 hover:text-primary-500">Sign in here</button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  placeholder="Samuel" 
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'border-red-300 focus:ring-red-500' : ''}
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  placeholder="Abebe" 
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'border-red-300 focus:ring-red-500' : ''}
                />
                 {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="samuel@example.com" 
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'border-red-300 focus:ring-red-500' : ''}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="grade">Grade Level</Label>
              <Select id="grade" name="grade" value={formData.grade} onChange={handleChange}>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'border-red-300 focus:ring-red-500' : ''}
              />
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : ''}
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms and Conditions</a>
              </label>
            </div>
            {errors.terms && <p className="text-xs text-red-600">{errors.terms}</p>}

            <div>
              <Button className="w-full" type="submit" isLoading={isLoading}>Register</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Courses List Page ---
export const CoursesPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCourses = COURSES.filter(course => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = course.title.toLowerCase().includes(query) || 
                          course.instructor.toLowerCase().includes(query);
    
    // Filter logic: Check if title includes the category (e.g. "Grade 11")
    const matchesCategory = activeCategory === 'All' || course.title.includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-12">
           <h1 className="text-4xl font-bold text-gray-900 mb-4">School Curriculum</h1>
           <p className="text-gray-600">Browse the subjects and courses offered at Noor High School.</p>
         </div>

         {/* Filters */}
         <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
               {['All', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(cat => (
                 <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
            <div className="relative w-full sm:w-64">
               <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <input 
                  type="text" 
                  placeholder="Search subjects or teachers..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.length > 0 ? (
               filteredCourses.map(course => (
               <Card key={course.id} className="group hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                     <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                     <Badge color="blue">{course.category}</Badge>
                     <h3 className="font-bold text-gray-900 line-clamp-2 mt-2 mb-2 group-hover:text-primary-600">
                     {course.title}
                     </h3>
                     <div className="mt-auto pt-4 flex justify-between items-center">
                     <span className="text-sm text-gray-500">Instructor: {course.instructor.split(' ')[1]}</span>
                     <Button size="sm" variant="outline" onClick={() => onNavigate('course-detail', { id: course.id })}>View</Button>
                     </div>
                  </div>
               </Card>
               ))
            ) : (
               <div className="col-span-full text-center py-12 text-gray-500">
                  <Icons.Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No courses found matching your search.</p>
                  <Button variant="ghost" className="mt-2" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>Clear Filters</Button>
               </div>
            )}
         </div>
       </div>
    </div>
  );
};

// --- Course Detail Page ---
export const CourseDetailPage: React.FC<PublicPageProps & { courseId?: string }> = ({ onNavigate, courseId }) => {
  const course = COURSES.find(c => c.id === courseId) || COURSES[0];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header Banner */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-4">
              <Badge color="yellow">{course.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
              <p className="text-gray-300 text-lg">{course.description}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-400 pt-4">
                 <div className="flex items-center"><Icons.User className="w-4 h-4 mr-2"/> {course.instructor}</div>
                 <div className="flex items-center"><Icons.Clock className="w-4 h-4 mr-2"/> Full Semester</div>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Content */}
         <div className="lg:col-span-2 space-y-8">
            <Card className="p-6 md:p-8">
               <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Objectives</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Understand core concepts', 'Prepare for national exams', 'Complete practical assignments', 'Develop critical thinking'].map((item, i) => (
                    <div key={i} className="flex items-start">
                       <Icons.CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                       <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
               </div>
            </Card>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Syllabus</h3>
              <div className="space-y-4">
                {course.modules.length > 0 ? course.modules.map((module, i) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 font-medium flex justify-between items-center">
                       <span>{module.title}</span>
                       <span className="text-xs text-gray-500">{module.lessons.length} topics</span>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {module.lessons.map(lesson => (
                         <div key={lesson.id} className="px-4 py-3 flex items-center justify-between text-sm hover:bg-gray-50">
                            <div className="flex items-center">
                              {lesson.type === 'video' ? <Icons.PlayCircle className="w-4 h-4 text-gray-400 mr-3"/> : <Icons.BookOpen className="w-4 h-4 text-gray-400 mr-3"/>}
                              <span className="text-gray-700">{lesson.title}</span>
                            </div>
                            <span className="text-gray-400">{lesson.duration}</span>
                         </div>
                      ))}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">Syllabus details available upon login.</div>
                )}
              </div>
            </div>
         </div>

         {/* Sidebar Card */}
         <div className="lg:col-span-1 relative">
            <div className="sticky top-24">
               <Card className="overflow-hidden shadow-lg border-0">
                  <div className="aspect-video bg-gray-100 relative group">
                     <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                     <div className="mb-6">
                        <span className="text-gray-900 font-medium">Included in Tuition</span>
                     </div>
                     <Button className="w-full mb-3" onClick={() => onNavigate('dashboard')}>Access Course</Button>
                     <div className="mt-6 space-y-3 text-sm text-gray-600">
                        <p className="flex justify-between"><span>Grade Level</span> <span className="font-medium">High School</span></p>
                        <p className="flex justify-between"><span>Language</span> <span className="font-medium">English</span></p>
                        <p className="flex justify-between"><span>Assessments</span> <span className="font-medium">Yes</span></p>
                     </div>
                  </div>
               </Card>
            </div>
         </div>
      </div>
    </div>
  );
};