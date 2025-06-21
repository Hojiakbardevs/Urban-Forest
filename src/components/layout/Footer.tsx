import React from 'react';
import { TreePine, Github, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                <TreePine className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Urban Forest Visualizer</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering sustainable urban development through intelligent tree planting 
              visualization and environmental impact analysis for Tashkent and beyond.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@urbanforest.uz"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/area" className="text-gray-300 hover:text-white transition-colors">
                  Area Analysis
                </a>
              </li>
              <li>
                <a href="/simulation" className="text-gray-300 hover:text-white transition-colors">
                  Growth Simulation
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Location</h3>
            <div className="flex items-start space-x-2 text-gray-300">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p>Tashkent, Uzbekistan</p>
                <p className="text-sm">41.31°N, 69.25°E</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Urban Forest Visualizer. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;