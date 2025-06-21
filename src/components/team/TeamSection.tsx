import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, Filter, X } from 'lucide-react';
import TeamMember, { TeamMemberData } from './TeamMember';
import TeamProfile from './TeamProfile';
import hojiakbar from '/teams/hojiakbar.png';
import dilmurodov from '/teams/sohibjon.png';
import abilxanova from '/teams/balausa.png';
import sulaymonov from '/teams/shahrisabz.png';
import asadulloh from '/teams/asadulloh.png';
const teamMembers: TeamMemberData[] = [
  {
    id: '1',
    name: 'Abdulhakimov Hojiakbar',
    role: 'CTO – Senior Software Engineer',
    position: 'Chief Technology Officer',
    description: 'Designed and implemented the frontend system for urban heat island detection, developed Python backend pipelines, integrated Leaflet with Google Earth Engine.',
    avatar: hojiakbar,
    technologies: ['React.js', 'Python', 'Leaflet.js', 'Google Earth Engine', 'LANDSAT', 'MODIS'],
    category: 'developer',
    bio: 'Hojiakbar is a passionate senior software engineer with expertise in geospatial technologies and environmental data analysis. He leads the technical vision of our urban heat island detection platform, combining cutting-edge web technologies with satellite data processing to create impactful solutions for urban planning.',
    contributions: [
      'Yagona frontend arxitekturasini React.js va Leaflet.js asosida ishlab chiqdi',
      'LANDSAT va MODIS ma’lumotlarini Google Earth Engine orqali integratsiya qildi',
      'Sun’iy yo‘ldosh tasvirlaridan real vaqtli issiqlik orollari algoritmlarini yaratdi',
      'CI/CD pipeline’larini (GitHub Actions, Docker) yaratib, doimiy deploy tizimini yo‘lga qo‘ydi',
      'Interaktiv xaritalash va katmanlar (layers) tizimini ishlab chiqdi',
      'Mahalliy sensorlar va tashqi API’lar bilan uzluksiz bog‘lovchi backend tizimlarini ishlab chiqdi',
      'Yuqori darajadagi foydalanuvchi tajribasi uchun caching va responsive dizaynni amalga oshirdi',
      'Platformaning texnologik yo‘nalishini, standartlar va komponentlar kutubxonasini ishlab chiqdi'
    ],
    references: [
      {
        category: 'Earth Observation',
        tools: ['Google Earth Engine', 'LANDSAT', 'MODIS', 'OpenStreetMap']
      },
      {
        category: 'Frontend',
        tools: ['React.js', 'Leaflet.js', 'TypeScript', 'Tailwind CSS']
      },
      {
        category: 'Backend',
        tools: ['Python', 'FastAPI', 'PostgreSQL', 'Docker']
      }
    ],
    links: {
      github: 'https://github.com/hojiakbardevs',
      linkedin: 'https://linkedin.com/in/hojiakbardev',
      website: 'https://hojiakbar.dev'
    }
  },
  {
    id: '2',
    name: 'Dilmurodov Sohibjon',
    role: 'Data Scientist & Data Engineer',
    position: 'Senior Data Engineer',
    description: 'Designs scalable data pipelines and predictive analytics systems, blending data science with engineering to extract insights from satellite and sensor data.',
    avatar: dilmurodov,
    technologies: ['Python', 'Airflow', 'Spark', 'Pandas', 'TensorFlow', 'PostgreSQL'],
    category: 'data-scientist',
    bio: 'Sohibjon is a skilled data scientist and data engineer with a focus on scalable pipeline design and predictive modeling. He bridges ML model development with production-level data workflows, especially in environmental and urban data contexts.',
    contributions: [
      'Apache Airflow orqali avtomatlashtirilgan ma’lumotlar pipeline’larini yaratdi',
      'Sun’iy yo‘ldosh ma’lumotlarini oldindan tozalash, normalizatsiya va tahlil qilish jarayonlarini avtomatlashtirdi',
      'TensorFlow yordamida urban hududlarda issiqlik tarqalishini bashoratlovchi model ishlab chiqdi',
      'PostgreSQL va S3 kabi xotira tizimlari yordamida samarali ma’lumotlar saqlash infratuzilmasini yaratdi',
      'Sensorlardan olingan harorat ma’lumotlarini real vaqtli oqim shaklida qayta ishlash tizimini joriy qildi',
      'Ma’lumotlar ishonchliligini ta’minlash uchun monitoring va alerting tizimlarini ishlab chiqdi'
    ],
    references: [
      {
        category: 'Data Engineering',
        tools: ['Apache Airflow', 'Spark', 'PostgreSQL']
      },
      {
        category: 'Machine Learning',
        tools: ['TensorFlow', 'Scikit-learn', 'Pandas']
      },
      {
        category: 'Deployment',
        tools: ['Docker', 'Kubernetes', 'TensorFlow Serving']
      }
    ],
    links: {
      github: 'https://github.com/sohibjondev',
      linkedin: 'https://linkedin.com/in/sohibjondev'
    }
  },
  {
    id: '3',
    name: 'Abilxanova Balausa',
    role: 'UI/UX Designer',
    position: 'Software Engineer – UI/UX',
    description: 'Blends software engineering with interface design to ensure user-friendly layouts for environmental data dashboards.',
    avatar: abilxanova,
    technologies: ['Figma', 'Tailwind CSS', 'React.js'],
    category: 'designer',
    bio: 'Balausa is a creative software engineer with strong UI/UX skills, specialized in building functional and aesthetically clean interfaces for data-centric applications. A TATU graduate with a focus on front-end interaction.',
    contributions: [
      'Urban monitoring tizimlari uchun intuitiv UI dizaynlar ishlab chiqdi',
      'Figma orqali dizayn sistemasi va komponent kutubxonasini yaratdi',
      'Tailwind CSS yordamida dizaynlarni tez va barqaror frontend komponentlarga aylantirdi',
      'Foydalanuvchi fikr-mulohazalarini to‘plash orqali iterativ dizayn jarayonini yo‘lga qo‘ydi',
      'Frontend jamoasi bilan to‘g‘ridan-to‘g‘ri ishlash orqali dizaynni aniq implementatsiyasini ta’minladi'
    ],
    references: [
      {
        category: 'Design',
        tools: ['Figma', 'Adobe XD', 'Canva']
      },
      {
        category: 'Frontend',
        tools: ['Tailwind CSS', 'React.js', 'HTML/CSS']
      }
    ],
    links: {
      github: 'https://github.com/balausadev',
      linkedin: 'https://linkedin.com/in/balausadev'
    }
  },
  {
    id: '4',
    name: 'Sulaymonov Shaxrisabz',
    role: 'Frontend Engineer & Project Manager',
    position: 'Frontend Lead',
    description: 'Combines strong frontend development skills with project coordination responsibilities. Focuses on interactive dashboards and team workflow efficiency.',
    avatar: sulaymonov,
    technologies: ['HTML', 'CSS', 'React.js', 'Node.js', 'JavaScript'],
    category: 'developer',
    bio: 'Shaxrisabz is a third-year student from Nukus State Technical University, specializing in modern frontend development and project leadership. He effectively translates design into interactive web components and ensures timely delivery of project milestones.',
    contributions: [
      'React.js yordamida modulli UI komponentlarini ishlab chiqdi',
      'Loyihaning kunlik sprintlarini boshqarib, vazifalar bo‘yicha jamoa a’zolarini yo‘naltirdi',
      'Node.js orqali backend API’larni integratsiya qildi va axios bilan ma’lumot oqimini boshqardi',
      'Notion va Trello kabi vositalar yordamida loyiha jarayonlarini shaffoflashtirdi',
      'Frontend jamoasining kod sifati va deadline’lar bajarilishini nazorat qildi'
    ],
    references: [
      {
        category: 'Frontend',
        tools: ['React.js', 'HTML/CSS', 'JavaScript']
      },
      {
        category: 'Project Management',
        tools: ['Jira', 'Trello', 'Notion']
      }
    ],
    links: {
      github: 'https://github.com/shaxrisabzdev',
      linkedin: 'https://linkedin.com/in/shaxrisabz'
    }
  },
  {
    id: '5',
    name: 'Asadulloh Ravshanov',
    role: 'Fullstack Engineer',
    position: 'Fullstack Developer',
    description: 'Builds and maintains both client-side and server-side systems, ensuring clean UI with robust backend functionality.',
    avatar: asadulloh,
    technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Express', 'JavaScript'],
    category: 'developer',
    bio: 'Asadulloh is a fullstack developer with a strong command of end-to-end web development. He ensures seamless data flow between the UI and backend systems, with a focus on performance and maintainability.',
    contributions: [
      'RESTful API’larni yaratdi va serverda Express orqali marshrutlashni amalga oshirdi',
      'React.js asosida admin panel va foydalanuvchi interfeyslarini ishlab chiqdi',
      'PostgreSQL bilan ishlashda samarador so‘rovlar (query optimization)ni ta’minladi',
      'Backendda foydalanuvchi autentifikatsiyasi va ma’lumot tekshiruvi (validation)ni joriy qildi',
      'Frontend va backend o‘rtasida to‘liq integratsiyani ta’minladi, testlar yozdi'
    ],
    references: [
      {
        category: 'Frontend',
        tools: ['React.js', 'HTML/CSS', 'JavaScript']
      },
      {
        category: 'Backend',
        tools: ['Node.js', 'Express', 'PostgreSQL']
      }
    ],
    links: {
      github: 'https://github.com/asadullohdev',
      linkedin: 'https://linkedin.com/in/asadullohdev'
    }
  }
];


const TeamSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<string>('all');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredMembers = filter === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.category === filter);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredMembers.length) % filteredMembers.length);
  };

  // Auto-play carousel
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredMembers.length]);

  const filterOptions = [
    { value: 'all', label: 'All Team', count: teamMembers.length },
    { value: 'developer', label: 'Developers', count: teamMembers.filter(m => m.category === 'developer').length },
    { value: 'designer', label: 'Designers', count: teamMembers.filter(m => m.category === 'designer').length },
    { value: 'data-scientist', label: 'Data Scientists', count: teamMembers.filter(m => m.category === 'data-scientist').length },
  ];

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2322c55e%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Users className="w-8 h-8 text-green-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Meet Our Team
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate experts combining technology, science, and design to create 
              innovative solutions for urban environmental challenges.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {filterOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setFilter(option.value);
                  setCurrentIndex(0);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  filter === option.value
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>{option.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  filter === option.value
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {option.count}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Team Carousel */}
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-green-600 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-green-600 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Carousel Container */}
            <div className="overflow-hidden mx-16">
              <motion.div
                ref={scrollRef}
                className="flex gap-6"
                animate={{ x: -currentIndex * 400 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {filteredMembers.map((member, index) => (
                  <TeamMember
                    key={member.id}
                    member={member}
                    index={index}
                    onClick={() => setSelectedMember(member)}
                  />
                ))}
              </motion.div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {filteredMembers.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Auto-play Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isAutoPlaying
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Team Profile Modal */}
      <AnimatePresence>
        {selectedMember && (
          <TeamProfile
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default TeamSection;