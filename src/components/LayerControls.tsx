import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { LayerConfig } from '../types/map';

interface LayerControlsProps {
  layerConfig: LayerConfig;
  onChange: (config: LayerConfig) => void;
}

const LayerControls: React.FC<LayerControlsProps> = ({ layerConfig, onChange }) => {
  const basemapOptions = [
    { value: 'street', label: 'Street Map' },
    { value: 'satellite', label: 'Satellite' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'terrain', label: 'Terrain' }
  ];

  return (
    <div className="space-y-4">
      {/* Basemap Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Base Map
        </label>
        <select
          value={layerConfig.basemap}
          onChange={(e) => onChange({
            ...layerConfig,
            basemap: e.target.value as LayerConfig['basemap']
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {basemapOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Heatmap Layer */}
      <div className="bg-white/50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">LST Heatmap</span>
          <button
            onClick={() => onChange({
              ...layerConfig,
              heatmapVisible: !layerConfig.heatmapVisible
            })}
            className={`p-1 rounded transition-colors ${
              layerConfig.heatmapVisible
                ? 'text-blue-600 hover:bg-blue-50'
                : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            {layerConfig.heatmapVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
        
        {layerConfig.heatmapVisible && (
          <div>
            <label className="block text-xs text-gray-600 mb-2">
              Opacity: {Math.round(layerConfig.heatmapOpacity * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={layerConfig.heatmapOpacity}
              onChange={(e) => onChange({
                ...layerConfig,
                heatmapOpacity: parseFloat(e.target.value)
              })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )}
      </div>

      {/* Planting Zones Layer */}
      <div className="bg-white/50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Planting Zones</span>
          <button
            onClick={() => onChange({
              ...layerConfig,
              plantingZonesVisible: !layerConfig.plantingZonesVisible
            })}
            className={`p-1 rounded transition-colors ${
              layerConfig.plantingZonesVisible
                ? 'text-green-600 hover:bg-green-50'
                : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            {layerConfig.plantingZonesVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LayerControls;