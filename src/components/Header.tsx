import React from 'react';
import { Thermometer, TreePine, Map } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg">
              <Map className="w-6 h-6" />
              <span className="text-xl font-bold">HeatMap AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Thermometer className="w-4 h-4" />
                <span className="text-sm">Urban Heat Analysis</span>
              </div>
              <div className="flex items-center space-x-1">
                <TreePine className="w-4 h-4" />
                <span className="text-sm">Tree Planting Optimization</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Tashkent, Uzbekistan</div>
              <div className="text-xs text-gray-500">Urban Heat Mapping</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;