import React from 'react';
import { Calendar } from 'lucide-react';
import { SeasonalGrowth } from '../types/planting';

interface TimelineSliderProps {
  currentMonth: number;
  onMonthChange: (month: number) => void;
  seasonalGrowth: SeasonalGrowth[];
}

const TimelineSlider: React.FC<TimelineSliderProps> = ({
  currentMonth,
  onMonthChange,
  seasonalGrowth
}) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const currentGrowth = seasonalGrowth[currentMonth];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-gray-700">
          {monthNames[currentMonth]} - Year 1
        </span>
      </div>

      {/* Timeline Slider */}
      <div className="relative">
        <input
          type="range"
          min="0"
          max="11"
          value={currentMonth}
          onChange={(e) => onMonthChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        
        {/* Month markers */}
        <div className="flex justify-between mt-2">
          {monthNames.map((month, index) => (
            <div
              key={index}
              className={`text-xs cursor-pointer transition-colors ${
                index === currentMonth
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              onClick={() => onMonthChange(index)}
            >
              {month}
            </div>
          ))}
        </div>
      </div>

      {/* Growth Visualization */}
      <div className="bg-white/50 rounded-lg p-3 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Growth Progress</span>
          <span className="text-sm text-green-600 font-semibold">
            {currentGrowth.coveragePercent.toFixed(0)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${currentGrowth.coveragePercent}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>NDVI: {currentGrowth.ndviValue.toFixed(2)}</span>
          <span>Coverage: {currentGrowth.coveragePercent.toFixed(0)}%</span>
        </div>
      </div>

      {/* Seasonal Indicators */}
      <div className="grid grid-cols-4 gap-2">
        {['Spring', 'Summer', 'Autumn', 'Winter'].map((season, index) => {
          const seasonMonths = [
            [2, 3, 4], // Spring
            [5, 6, 7], // Summer
            [8, 9, 10], // Autumn
            [11, 0, 1] // Winter
          ];
          
          const isCurrentSeason = seasonMonths[index].includes(currentMonth);
          
          return (
            <div
              key={season}
              className={`text-center p-2 rounded-lg text-xs transition-colors ${
                isCurrentSeason
                  ? 'bg-blue-100 text-blue-800 font-semibold'
                  : 'bg-gray-50 text-gray-600'
              }`}
            >
              {season}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineSlider;