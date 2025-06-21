import React from 'react';
import { Calendar, Play, Pause, RotateCcw } from 'lucide-react';

interface TimelineSliderProps {
  currentMonth: number;
  onMonthChange: (month: number) => void;
  isAnimating: boolean;
  onToggleAnimation: () => void;
  onReset: () => void;
}

const TimelineSlider: React.FC<TimelineSliderProps> = ({
  currentMonth,
  onMonthChange,
  isAnimating,
  onToggleAnimation,
  onReset
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const seasons = [
    { name: 'Winter', months: [11, 0, 1], color: 'bg-blue-100 text-blue-800' },
    { name: 'Spring', months: [2, 3, 4], color: 'bg-green-100 text-green-800' },
    { name: 'Summer', months: [5, 6, 7], color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Autumn', months: [8, 9, 10], color: 'bg-orange-100 text-orange-800' }
  ];

  const currentSeason = seasons.find(season => season.months.includes(currentMonth));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Growth Timeline</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleAnimation}
            className={`p-2 rounded-lg transition-colors ${
              isAnimating 
                ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                : 'bg-green-100 hover:bg-green-200 text-green-600'
            }`}
            aria-label={isAnimating ? 'Pause animation' : 'Start animation'}
          >
            {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          
          <button
            onClick={onReset}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
            aria-label="Reset to January"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Current Month Display */}
      <div className="text-center">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {monthNames[currentMonth]}
        </div>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${currentSeason?.color}`}>
          {currentSeason?.name} - Year 1
        </div>
      </div>

      {/* Timeline Slider */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="range"
            min="0"
            max="11"
            value={currentMonth}
            onChange={(e) => onMonthChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #22c55e 0%, #22c55e ${(currentMonth / 11) * 100}%, #e5e7eb ${(currentMonth / 11) * 100}%, #e5e7eb 100%)`
            }}
          />
          
          {/* Month markers */}
          <div className="flex justify-between mt-2">
            {monthNames.map((month, index) => (
              <button
                key={index}
                onClick={() => onMonthChange(index)}
                className={`text-xs cursor-pointer transition-colors px-1 py-1 rounded ${
                  index === currentMonth
                    ? 'text-green-600 font-semibold bg-green-50'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {month.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Growth Progress */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Vegetation Growth</span>
            <span className="text-sm text-green-600 font-semibold">
              {Math.round((currentMonth + 1) / 12 * 100)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500 relative"
              style={{ width: `${(currentMonth + 1) / 12 * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Planting</span>
            <span>Establishment</span>
            <span>Maturation</span>
          </div>
        </div>

        {/* Seasonal Information */}
        <div className="grid grid-cols-4 gap-2">
          {seasons.map((season, index) => {
            const isCurrentSeason = season.months.includes(currentMonth);
            return (
              <div
                key={season.name}
                className={`text-center p-2 rounded-lg text-xs transition-all ${
                  isCurrentSeason
                    ? season.color + ' ring-2 ring-offset-1 ring-current'
                    : 'bg-gray-50 text-gray-600'
                }`}
              >
                <div className="font-medium">{season.name}</div>
                <div className="text-xs opacity-75">
                  {season.months.map(m => monthNames[m].slice(0, 3)).join(', ')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Growth Description */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">
          {monthNames[currentMonth]} Growth Characteristics
        </h4>
        <p className="text-sm text-blue-700">
          {getMonthDescription(currentMonth)}
        </p>
      </div>
    </div>
  );
};

const getMonthDescription = (month: number): string => {
  const descriptions = [
    "Dormant season - Trees are establishing root systems. Minimal visible growth.",
    "Late winter - Root development continues. Buds begin to swell.",
    "Early spring - Bud break begins. First leaves emerge. Active growth starts.",
    "Spring growth - Rapid leaf development. Canopy begins to fill out.",
    "Peak spring - Full leaf emergence. Trees establish their canopy structure.",
    "Early summer - Maximum growth rate. Dense foliage development.",
    "Mid-summer - Continued growth with full canopy. Peak photosynthesis.",
    "Late summer - Growth slows. Trees focus on strengthening branches.",
    "Early autumn - Growth nearly complete. Leaves begin seasonal changes.",
    "Mid-autumn - Leaf color changes. Trees prepare for dormancy.",
    "Late autumn - Leaf drop begins. Trees enter dormant preparation.",
    "Early winter - Full dormancy. Trees conserve energy for next season."
  ];
  
  return descriptions[month];
};

export default TimelineSlider;