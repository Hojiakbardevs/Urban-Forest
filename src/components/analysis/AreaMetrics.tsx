import React from 'react';
import { Calculator, TreePine, Thermometer, Leaf } from 'lucide-react';
import { PlantingZone } from '../../types';

interface AreaMetricsProps {
  zones: PlantingZone[];
  selectedZone?: PlantingZone | null;
}

const AreaMetrics: React.FC<AreaMetricsProps> = ({ zones, selectedZone }) => {
  const totalArea = zones.reduce((sum, zone) => sum + zone.area, 0);
  const totalTrees = zones.reduce((sum, zone) => sum + zone.treeCapacity, 0);
  const avgTemperatureReduction = zones.length > 0 
    ? zones.reduce((sum, zone) => sum + zone.temperatureReduction, 0) / zones.length 
    : 0;
  const avgNDVI = zones.length > 0 
    ? zones.reduce((sum, zone) => sum + zone.ndvi, 0) / zones.length 
    : 0;

  const displayZone = selectedZone || null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          {displayZone ? 'Zone Analysis' : 'Overall Metrics'}
        </h3>
      </div>

      {displayZone ? (
        // Individual zone metrics
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-3">Zone {displayZone.id}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {(displayZone.area / 1000).toFixed(1)}
                </div>
                <div className="text-sm text-blue-700">Hectares</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {displayZone.treeCapacity}
                </div>
                <div className="text-sm text-green-700">Trees</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-lg font-semibold text-red-600">
                -{displayZone.temperatureReduction.toFixed(1)}°C
              </div>
              <div className="text-xs text-red-700">Cooling Effect</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Leaf className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-lg font-semibold text-green-600">
                {displayZone.ndvi.toFixed(2)}
              </div>
              <div className="text-xs text-green-700">Current NDVI</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Priority Level:</span>
                <span className={`font-medium capitalize ${
                  displayZone.priority === 'high' ? 'text-red-600' :
                  displayZone.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {displayZone.priority}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Zone Type:</span>
                <span className="font-medium">
                  {displayZone.isUserDrawn ? 'User Defined' : 'Predefined'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Created:</span>
                <span className="font-medium">
                  {displayZone.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Overall metrics
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {(totalArea / 1000).toFixed(1)}
              </div>
              <div className="text-sm text-blue-700">Total Hectares</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <TreePine className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-green-600">{totalTrees}</div>
              <div className="text-sm text-green-700">Total Trees</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-1" />
              <div className="text-lg font-semibold text-red-600">
                -{avgTemperatureReduction.toFixed(1)}°C
              </div>
              <div className="text-xs text-red-700">Avg Cooling</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Leaf className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <div className="text-lg font-semibold text-green-600">
                {avgNDVI.toFixed(2)}
              </div>
              <div className="text-xs text-green-700">Avg NDVI</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Zone Distribution</h4>
            <div className="space-y-2">
              {['high', 'medium', 'low'].map(priority => {
                const count = zones.filter(z => z.priority === priority).length;
                const percentage = zones.length > 0 ? (count / zones.length) * 100 : 0;
                return (
                  <div key={priority} className="flex items-center justify-between text-sm">
                    <span className="capitalize text-gray-600">{priority} Priority:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            priority === 'high' ? 'bg-red-500' :
                            priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="font-medium text-gray-900">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AreaMetrics;