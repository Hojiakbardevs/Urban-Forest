import React from 'react';
import { Pencil, Eye, EyeOff, MapPin, TreePine } from 'lucide-react';

interface DrawingControlsProps {
  onTogglePredefinedZones: () => void;
  showPredefinedZones: boolean;
  drawnPolygonsCount: number;
}

const DrawingControls: React.FC<DrawingControlsProps> = ({
  onTogglePredefinedZones,
  showPredefinedZones,
  drawnPolygonsCount
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Pencil className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-gray-900">Drawing Tools</h3>
      </div>

      {/* Drawing Status */}
      <div className="bg-blue-50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-900">Drawn Areas</span>
          <span className="text-lg font-bold text-blue-600">{drawnPolygonsCount}</span>
        </div>
        <p className="text-xs text-blue-700">
          Use the polygon tool on the map to draw planting areas
        </p>
      </div>

      {/* Layer Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Predefined Zones</span>
          </div>
          <button
            onClick={onTogglePredefinedZones}
            className={`p-1 rounded transition-colors ${
              showPredefinedZones
                ? 'text-orange-600 hover:bg-orange-50'
                : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            {showPredefinedZones ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>

        {showPredefinedZones && (
          <div className="ml-6 space-y-1 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-2 border-2 border-red-600 bg-red-100"></div>
              <span>High Priority Zones</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-2 border-2 border-yellow-600 bg-yellow-100"></div>
              <span>Medium Priority Zones</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-2 border-2 border-green-600 bg-green-100"></div>
              <span>Low Priority Zones</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-green-50 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <TreePine className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-900">Planting Benefits</span>
        </div>
        <div className="space-y-1 text-xs text-green-700">
          <p>• 1 tree per 25m² optimal density</p>
          <p>• 2-4°C temperature reduction</p>
          <p>• Improved air quality & biodiversity</p>
          <p>• Enhanced property values</p>
        </div>
      </div>
    </div>
  );
};

export default DrawingControls;