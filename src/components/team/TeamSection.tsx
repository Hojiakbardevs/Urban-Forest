import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, Filter, X } from 'lucide-react';
import TeamMember, { TeamMemberData } from './TeamMember';
import TeamProfile from './TeamProfile';

const teamMembers: TeamMemberData[] = [
  {
    id: '1',
    name: 'Abdulhakimov Hojiakbar',
    role: 'CTO – Lead Software Engineer',
    position: 'Chief Technology Officer',
    description: 'Designed and implemented the frontend system for urban heat island detection, developed Python backend pipelines, integrated Leaflet with Google Earth Engine.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    technologies: ['React.js', 'Python', 'Leaflet.js', 'Google Earth Engine', 'LANDSAT', 'MODIS'],
    category: 'developer',
    bio: 'Hojiakbar is a passionate software engineer with expertise in geospatial technologies and environmental data analysis. He leads the technical vision of our urban heat island detection platform, combining cutting-edge web technologies with satellite data processing to create impactful solutions for urban planning.',
    contributions: [
      'Architected the entire frontend system using React.js and Leaflet.js',
      'Developed robust Python backend pipelines for satellite data processing',
      'Integrated Google Earth Engine with web-based visualization tools',
      'Implemented real-time heat island detection algorithms',
      'Created responsive and interactive mapping interfaces',
      'Established CI/CD pipelines and deployment strategies'
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
      github: 'https://github.com/hojiakbar',
      linkedin: 'https://linkedin.com/in/hojiakbar',
      website: 'https://hojiakbar.dev'
    }
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Lead Data Scientist',
    position: 'Senior Data Scientist',
    description: 'Specializes in machine learning algorithms for environmental data analysis, develops predictive models for urban heat patterns using satellite imagery and IoT sensor data.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'TensorFlow', 'Jupyter', 'NumPy'],
    category: 'data-scientist',
    bio: 'Sarah is a data science expert with a PhD in Environmental Engineering. She specializes in applying machine learning to environmental challenges, particularly in urban climate analysis and predictive modeling for sustainable city planning.',
    contributions: [
      'Developed ML models for heat island prediction with 94% accuracy',
      'Created automated data pipelines for satellite imagery processing',
      'Implemented real-time anomaly detection for temperature sensors',
      'Built statistical models for urban vegetation impact analysis',
      'Designed A/B testing frameworks for model validation',
      'Published research on AI-driven urban climate solutions'
    ],
    references: [
      {
        category: 'Data Science',
        tools: ['Scikit-learn', 'Pandas', 'NumPy', 'TensorFlow']
      },
      {
        category: 'Earth Observation',
        tools: ['Google Earth Engine', 'LANDSAT', 'Sentinel-2']
      },
      {
        category: 'Backend',
        tools: ['Python', 'Jupyter', 'Apache Spark']
      }
    ],
    links: {
      github: 'https://github.com/sarahchen',
      linkedin: 'https://linkedin.com/in/sarahchen'
    }
  },
  {
    id: '3',
    name: 'Marcus Rodriguez',
    role: 'UI/UX Designer',
    position: 'Senior Product Designer',
    description: 'Creates intuitive and accessible interfaces for complex geospatial data visualization, focuses on user-centered design for environmental monitoring dashboards.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'Framer', 'Canva'],
    category: 'designer',
    bio: 'Marcus is a creative designer with over 8 years of experience in product design. He specializes in creating beautiful, functional interfaces for complex data visualization tools, with a particular passion for environmental and sustainability-focused applications.',
    contributions: [
      'Designed the complete user interface for the heat mapping platform',
      'Created comprehensive design system and component library',
      'Conducted user research and usability testing sessions',
      'Developed interactive prototypes for stakeholder presentations',
      'Established accessibility guidelines and WCAG compliance',
      'Led design workshops for cross-functional collaboration'
    ],
    references: [
      {
        category: 'Design',
        tools: ['Figma', 'Adobe XD', 'Sketch', 'Principle']
      },
      {
        category: 'Prototyping',
        tools: ['Framer', 'InVision', 'Marvel', 'Canva']
      },
      {
        category: 'Frontend',
        tools: ['HTML/CSS', 'JavaScript', 'React.js']
      }
    ],
    links: {
      github: 'https://github.com/marcusrodriguez',
      linkedin: 'https://linkedin.com/in/marcusrodriguez',
      website: 'https://marcusdesigns.com'
    }
  },
  {
    id: '4',
    name: 'Dr. Aisha Patel',
    role: 'Environmental Research Lead',
    position: 'Principal Researcher',
    description: 'PhD in Environmental Science, leads research initiatives on urban climate change, validates heat island detection models against field measurements.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    technologies: ['R', 'MATLAB', 'ArcGIS', 'QGIS', 'Python', 'Statistical Analysis'],
    category: 'data-scientist',
    bio: 'Dr. Aisha Patel is an environmental scientist with expertise in urban climatology and remote sensing. She brings academic rigor to our research initiatives and ensures our solutions are grounded in solid scientific principles.',
    contributions: [
      'Led validation studies for heat island detection algorithms',
      'Established partnerships with academic institutions',
      'Published peer-reviewed papers on urban climate modeling',
      'Designed field measurement protocols for ground truth data',
      'Created scientific methodology for model validation',
      'Mentored junior researchers and data scientists'
    ],
    references: [
      {
        category: 'Research Tools',
        tools: ['R', 'MATLAB', 'SPSS', 'Origin']
      },
      {
        category: 'GIS & Remote Sensing',
        tools: ['ArcGIS', 'QGIS', 'ENVI', 'ERDAS']
      },
      {
        category: 'Data Science',
        tools: ['Python', 'Pandas', 'SciPy', 'Matplotlib']
      }
    ],
    links: {
      linkedin: 'https://linkedin.com/in/aishapatel',
      website: 'https://aishapatel-research.com'
    }
  },
  {
    id: '5',
    name: 'James Thompson',
    role: 'DevOps Engineer',
    position: 'Senior DevOps Engineer',
    description: 'Manages cloud infrastructure and deployment pipelines, ensures scalable and reliable systems for processing large-scale satellite data and serving real-time visualizations.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    technologies: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'Monitoring'],
    category: 'developer',
    bio: 'James is a DevOps expert with extensive experience in cloud infrastructure and automation. He ensures our platform can handle massive datasets and serve thousands of users with high availability and performance.',
    contributions: [
      'Architected scalable cloud infrastructure on AWS',
      'Implemented automated CI/CD pipelines with zero-downtime deployments',
      'Set up monitoring and alerting systems for 99.9% uptime',
      'Optimized data processing workflows for satellite imagery',
      'Established security best practices and compliance protocols',
      'Reduced infrastructure costs by 40% through optimization'
    ],
    references: [
      {
        category: 'Cloud Platforms',
        tools: ['AWS', 'Google Cloud', 'Azure', 'DigitalOcean']
      },
      {
        category: 'DevOps Tools',
        tools: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins']
      },
      {
        category: 'Monitoring',
        tools: ['Prometheus', 'Grafana', 'ELK Stack', 'DataDog']
      }
    ],
    links: {
      github: 'https://github.com/jamesthompson',
      linkedin: 'https://linkedin.com/in/jamesthompson'
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