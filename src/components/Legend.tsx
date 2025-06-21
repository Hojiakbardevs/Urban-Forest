import React from 'react';
import { Thermometer, TreePine, Info } from 'lucide-react';

interface LegendProps {
  className?: string;
}

const Legend: React.FC<LegendProps> = ({ className = '' }) => {
  const temperatureColors = [
    { color: '#0000FF', temp: '< 15°C', label: 'Very Cool' },
    { color: '#00FFFF', temp: '15-20°C', label: 'Cool' },
    { color: '#00FF00', temp: '20-25°C', label: 'Moderate' },
    { color: '#FFFF00', temp: '25-30°C', label: 'Warm' },
    { color: '#FFA500', temp: '30-35°C', label: 'Hot' },
    { color: '#FF0000', temp: '35-40°C', label: 'Very Hot' },
    { color: '#8B0000', temp: '> 40°C', label: 'Extreme' }
  ];

  return (
    <div className={`bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-4 min-w-64 ${className}`}>
      <div className="space-y-4">
        {/* Temperature Legend */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Thermometer className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-gray-700">Land Surface Temperature</span>
          </div>
          <div className="space-y-1">
            {temperatureColors.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs">
                <div 
                  className="w-4 h-3 rounded border border-gray-300"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600 min-w-16">{item.temp}</span>
                <span className="text-gray-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Planting Zones Legend */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center space-x-2 mb-2">
            <TreePine className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold text-gray-700">Planting Zones</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-4 h-3 rounded border-2 border-green-600 bg-green-400 opacity-30" />
            <span className="text-gray-600">Optimal planting areas</span>
          </div>
        </div>

        {/* Info */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-start space-x-2">
            <Info className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-500 leading-relaxed">
              Click anywhere on the map to get detailed temperature analysis and planting recommendations for that location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend;