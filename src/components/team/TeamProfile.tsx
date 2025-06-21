import React from 'react';
import { motion } from 'framer-motion';
import { X, Github, Linkedin, ExternalLink, MapPin, Award, Briefcase, Code, Database, Palette, BarChart3, Globe } from 'lucide-react';
import { TeamMemberData } from './TeamMember';

interface TeamProfileProps {
  member: TeamMemberData;
  onClose: () => void;
}

const TeamProfile: React.FC<TeamProfileProps> = ({ member, onClose }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'developer': return <Code className="w-6 h-6" />;
      case 'designer': return <Palette className="w-6 h-6" />;
      case 'data-scientist': return <BarChart3 className="w-6 h-6" />;
      case 'manager': return <Globe className="w-6 h-6" />;
      default: return <Code className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'developer': return 'from-blue-500 to-cyan-500';
      case 'designer': return 'from-purple-500 to-pink-500';
      case 'data-scientist': return 'from-green-500 to-emerald-500';
      case 'manager': return 'from-orange-500 to-red-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const getTechIcon = (tech: string) => {
    const techIcons: { [key: string]: string } = {
      'React.js': '⚛️',
      'Python': '🐍',
      'JavaScript': '🟨',
      'TypeScript': '🔷',
      'Node.js': '🟢',
      'Docker': '🐳',
      'Kubernetes': '☸️',
      'AWS': '☁️',
      'Google Earth Engine': '🌍',
      'LANDSAT': '🛰️',
      'MODIS': '📡',
      'Leaflet.js': '🗺️',
      'Figma': '🎨',
      'Adobe XD': '🎭',
      'Scikit-learn': '🤖',
      'Pandas': '🐼',
      'TensorFlow': '🧠',
      'PostgreSQL': '🐘',
      'MongoDB': '🍃',
      'Git': '📝',
      'Jenkins': '🔧',
      'Terraform': '🏗️'
    };
    return techIcons[tech] || '⚡';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative bg-gradient-to-br ${getCategoryColor(member.category)} p-8 text-white`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          </div>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>

          <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                {getCategoryIcon(member.category)}
              </div>
            </motion.div>

            {/* Basic Info */}
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold mb-2"
              >
                {member.name}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-2 mb-4"
              >
                <Briefcase className="w-5 h-5" />
                <span className="text-xl font-medium">{member.role}</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/90 text-lg leading-relaxed mb-6"
              >
                {member.description}
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex space-x-4"
              >
                {member.links.github && (
                  <motion.a
                    href={member.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                )}
                {member.links.linkedin && (
                  <motion.a
                    href={member.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                )}
                {member.links.website && (
                  <motion.a
                    href={member.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </motion.a>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Bio Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Award className="w-6 h-6 text-green-600" />
              <span>About {member.name.split(' ')[0]}</span>
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {member.bio}
            </p>
          </motion.section>

          {/* Contributions Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <span>Key Contributions</span>
            </h2>
            <div className="grid gap-4">
              {member.contributions.map((contribution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-3 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{contribution}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Technologies & References */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Database className="w-6 h-6 text-purple-600" />
              <span>Technologies & Tools</span>
            </h2>
            
            <div className="space-y-6">
              {member.references.map((ref, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <div className={`w-3 h-3 bg-gradient-to-r ${getCategoryColor(member.category)} rounded-full`} />
                    <span>{ref.category}</span>
                  </h3>
                  
                  <div className="flex flex-wrap gap-3">
                    {ref.tools.map((tool, toolIndex) => (
                      <motion.div
                        key={tool}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.4 + index * 0.1 + toolIndex * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
                      >
                        <span className="text-lg">{getTechIcon(tool)}</span>
                        <span className="font-medium text-gray-700">{tool}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* All Technologies Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {member.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-white/80 backdrop-blur-sm text-sm font-medium text-gray-700 rounded-lg border border-white/50 hover:bg-white transition-all"
                >
                  <span>{getTechIcon(tech)}</span>
                  <span>{tech}</span>
                </motion.span>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamProfile;