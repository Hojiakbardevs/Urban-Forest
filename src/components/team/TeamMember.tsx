import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink, MapPin, Code, Database, Palette, BarChart3, Globe } from 'lucide-react';

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  position: string;
  description: string;
  avatar: string;
  technologies: string[];
  category: 'developer' | 'designer' | 'data-scientist' | 'manager';
  bio: string;
  contributions: string[];
  references: {
    category: string;
    tools: string[];
  }[];
  links: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

interface TeamMemberProps {
  member: TeamMemberData;
  onClick: () => void;
  index: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member, onClick, index }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'developer': return <Code className="w-5 h-5" />;
      case 'designer': return <Palette className="w-5 h-5" />;
      case 'data-scientist': return <BarChart3 className="w-5 h-5" />;
      case 'manager': return <Globe className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
      className="group relative bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 cursor-pointer overflow-hidden min-w-[320px] max-w-[380px]"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(member.category)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-60"
            initial={{ x: Math.random() * 300, y: Math.random() * 400 }}
            animate={{
              x: Math.random() * 300,
              y: Math.random() * 400,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Avatar and Role Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r ${getCategoryColor(member.category)} rounded-full flex items-center justify-center text-white shadow-lg`}
            >
              {getCategoryIcon(member.category)}
            </motion.div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-green-100 to-blue-100 px-3 py-1 rounded-full"
          >
            <span className="text-xs font-medium text-gray-700">{member.position}</span>
          </motion.div>
        </div>

        {/* Name and Role */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600 transition-all duration-300">
            {member.name}
          </h3>
          <p className="text-sm font-medium text-gray-600">{member.role}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {member.description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {member.technologies.slice(0, 4).map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + techIndex * 0.1 }}
                className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-xs font-medium text-gray-700 rounded-lg hover:from-green-100 hover:to-blue-100 transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
            {member.technologies.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-500 rounded-lg">
                +{member.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {member.links.github && (
              <motion.a
                href={member.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-900 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
            {member.links.linkedin && (
              <motion.a
                href={member.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            )}
            {member.links.website && (
              <motion.a
                href={member.links.website}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-green-100 hover:bg-green-600 text-green-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
          
          <motion.div
            whileHover={{ x: 5 }}
            className="text-green-600 group-hover:text-blue-600 transition-colors duration-300"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    </motion.div>
  );
};

export default TeamMember;