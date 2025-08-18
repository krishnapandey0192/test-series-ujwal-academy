import React from 'react';
import { Target, Users, Award, Zap, TrendingUp, Shield, Clock, Heart, Trophy } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Mission Focused',
      description: 'We are committed to providing quality education that enables students to achieve their career goals in government services.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Expert Faculty',
      description: 'Our team comprises experienced educators and industry experts who bring real-world insights to the classroom.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'With a track record of 95% success rate, we have helped thousands of students secure government jobs.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Modern Approach',
      description: 'We combine traditional teaching methods with modern technology to create an engaging learning experience.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const achievements = [
    { icon: TrendingUp, number: '5+', label: 'Years Experience', color: 'text-blue-600' },
    { icon: Users, number: '1K+', label: 'Students Trained', color: 'text-emerald-600' },
    { icon: Trophy, number: '1K+', label: 'Success Stories', color: 'text-purple-600' },
    { icon: Shield, number: '95%', label: 'Success Rate', color: 'text-orange-600' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Ujjawal Academy</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Established with a vision to empower students with quality education, 
            Ujjawal Academy has been a beacon of hope for competitive exam aspirants across India.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-slide-in-left">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Transforming Dreams into Reality
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Since our inception, we have been dedicated to providing comprehensive coaching 
              for various competitive examinations. Our student-centric approach ensures that 
              every individual receives personalized attention and guidance.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We understand the challenges faced by competitive exam aspirants and have 
              designed our curriculum to address these challenges effectively. Our success 
              lies in our commitment to excellence and our students' achievements.
            </p>
            
            {/* Enhanced Achievement Stats */}
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${values[index]?.color || 'from-gray-400 to-gray-600'} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <achievement.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className={`text-2xl font-black ${achievement.color} mb-1`}>{achievement.number}</div>
                      <div className="text-sm font-medium text-gray-600">{achievement.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative animate-slide-in-right">
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <Heart className="h-8 w-8 mr-3 text-pink-300" />
                  <h4 className="text-3xl font-bold">Why Choose Us?</h4>
                </div>
                <ul className="space-y-4">
                  {[
                    'Comprehensive study material',
                    'Regular mock tests and assessments',
                    'Doubt clearing sessions',
                    'Current affairs updates',
                    'Flexible batch timings',
                    'Personal mentorship program'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center group">
                      <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-lg group-hover:translate-x-2 transition-transform duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up">
          {values.map((value, index) => (
            <div key={index} className="group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105">
              <div className={`bg-gradient-to-r ${value.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-xl`}>
                <value.icon className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{value.title}</h4>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;