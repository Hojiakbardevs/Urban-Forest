import React from 'react';
import { TreePine, Droplets, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { PlantingZone } from '../../types';

interface ZoneRecommendationProps {
  zone: PlantingZone;
}

const ZoneRecommendation: React.FC<ZoneRecommendationProps> = ({ zone }) => {
  // Generate species recommendations based on area and priority
  const getSpeciesRecommendations = (zone: PlantingZone): string[] => {
    const { area, priority } = zone;
    
    if (priority === 'high' && area > 10000) {
      return ['Platanus orientalis', 'Populus nigra', 'Acer platanoides'];
    } else if (priority === 'high') {
      return ['Acer platanoides', 'Tilia cordata', 'Fraxinus excelsior'];
    } else if (area > 5000) {
      return ['Tilia cordata', 'Fraxinus excelsior', 'Prunus cerasifera'];
    } else {
      return ['Prunus cerasifera', 'Malus domestica', 'Crataegus monogyna'];
    }
  };

  // Calculate estimated costs
  const estimatedCost = zone.treeCapacity * 45; // $45 per tree
  const maintenanceCost = estimatedCost * 0.15; // 15% annual maintenance

  // Get maintenance recommendations
  const getMaintenanceNotes = (): string[] => {
    return [
      'Water regularly for the first 2 years after planting',
      'Apply organic mulch around tree base to retain moisture',
      'Prune annually during dormant season (late fall/winter)',
      'Monitor for pests and diseases, especially in first 3 years',
      'Fertilize with slow-release fertilizer in early spring'
    ];
  };

  const species = getSpeciesRecommendations(zone);
  const maintenanceNotes = getMaintenanceNotes();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <TreePine className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Planting Recommendation - Zone {zone.id}
        </h3>
      </div>

      {/* Species Recommendations */}
      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-3">Recommended Species</h4>
        <div className="space-y-2">
          {species.map((species, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-green-800 font-medium">{species}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-green-700">
          These species are well-adapted to Tashkent's climate and soil conditions.
        </div>
      </div>

      {/* Planting Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TreePine className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Planting Density</span>
          </div>
          <div className="text-lg font-bold text-blue-600">
            {zone.treeCapacity} trees
          </div>
          <div className="text-xs text-blue-700">
            1 tree per 25m² (optimal spacing)
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Droplets className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">Water Needs</span>
          </div>
          <div className="text-lg font-bold text-purple-600">
            {(zone.treeCapacity * 50).toLocaleString()}L
          </div>
          <div className="text-xs text-purple-700">
            Weekly during establishment
          </div>
        </div>
      </div>

      {/* Cost Analysis */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <DollarSign className="w-4 h-4 text-yellow-600" />
          <h4 className="font-medium text-yellow-900">Cost Analysis</h4>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-yellow-700">Initial Planting:</span>
            <span className="font-medium text-yellow-900">${estimatedCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-yellow-700">Annual Maintenance:</span>
            <span className="font-medium text-yellow-900">${maintenanceCost.toLocaleString()}</span>
          </div>
          <div className="border-t border-yellow-200 pt-2">
            <div className="flex justify-between">
              <span className="font-medium text-yellow-900">Cost per Tree:</span>
              <span className="font-bold text-yellow-600">$45</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-indigo-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Clock className="w-4 h-4 text-indigo-600" />
          <h4 className="font-medium text-indigo-900">Implementation Timeline</h4>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
            <span className="text-indigo-800">
              <strong>Months 1-2:</strong> Site preparation and tree procurement
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
            <span className="text-indigo-800">
              <strong>Month 3:</strong> Planting during optimal season
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
            <span className="text-indigo-800">
              <strong>Months 4-24:</strong> Intensive care and monitoring
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
            <span className="text-indigo-800">
              <strong>Year 3+:</strong> Routine maintenance and growth monitoring
            </span>
          </div>
        </div>
      </div>

      {/* Maintenance Guidelines */}
      <div className="bg-orange-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <AlertCircle className="w-4 h-4 text-orange-600" />
          <h4 className="font-medium text-orange-900">Maintenance Guidelines</h4>
        </div>
        <ul className="space-y-1">
          {maintenanceNotes.map((note, index) => (
            <li key={index} className="text-xs text-orange-700 flex items-start space-x-1">
              <span className="text-orange-500 mt-1">•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Expected Environmental Impact</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600">CO₂ Absorption:</div>
            <div className="font-semibold text-green-600">
              {(zone.treeCapacity * 22).toLocaleString()} kg/year
            </div>
          </div>
          <div>
            <div className="text-gray-600">Air Purification:</div>
            <div className="font-semibold text-blue-600">
              {(zone.treeCapacity * 0.5).toFixed(1)} tons/year
            </div>
          </div>
          <div>
            <div className="text-gray-600">Stormwater Management:</div>
            <div className="font-semibold text-indigo-600">
              {(zone.treeCapacity * 2300).toLocaleString()} L/year
            </div>
          </div>
          <div>
            <div className="text-gray-600">Property Value Increase:</div>
            <div className="font-semibold text-purple-600">3-15%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneRecommendation;