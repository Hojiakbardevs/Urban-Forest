import React, { useState, useCallback } from 'react';
import { Filter, Eye, EyeOff, Info, Globe, Map as MapIcon, Flame, Trash2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MapContainer from '../components/map/MapContainer';
import GoogleEarthContainer from '../components/map/GoogleEarthContainer';
import EarthEngineViewer from '../components/map/EarthEngineViewer';
import AreaMetrics from '../components/analysis/AreaMetrics';
import ZoneRecommendation from '../components/analysis/ZoneRecommendation';
import { useZoneData } from '../hooks/useZoneData';
import { PlantingZone } from '../types';
import toast from 'react-hot-toast';

const AreaAnalysis: React.FC = () => {
  const { zones, loading, error, addUserZone, clearUserZones } = useZoneData();
  const [selectedZone, setSelectedZone] = useState<PlantingZone | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [showUserZones, setShowUserZones] = useState(true);
  const [showPredefinedZones, setShowPredefinedZones] = useState(true);
  const [mapMode, setMapMode] = useState<'leaflet' | 'satellite' | 'heatmap'>('leaflet');

  const handleZoneCreate = useCallback((geometry: GeoJSON.Polygon) => {
    try {
      console.log('Zone creation triggered with geometry:', geometry);
      const newZone = addUserZone(geometry);
      setSelectedZone(newZone);
      toast.success(`New zone created! Area: ${(newZone.area / 1000).toFixed(1)} hectares`);
    } catch (error) {
      console.error('Error creating zone:', error);
      toast.error('Failed to create zone. Please try again.');
    }
  }, [addUserZone]);

  const handleZoneClick = useCallback((zone: PlantingZone) => {
    setSelectedZone(zone);
    toast.success(`Selected ${zone.isUserDrawn ? 'user' : 'predefined'} zone ${zone.id}`);
  }, []);

  const handleClearUserZones = useCallback(() => {
    clearUserZones();
    setSelectedZone(null);
    toast.success('All user-drawn zones cleared');
  }, [clearUserZones]);

  const filteredZones = zones.filter(zone => {
    const priorityMatch = priorityFilter === 'all' || zone.priority === priorityFilter;
    const typeMatch = (zone.isUserDrawn && showUserZones) || (!zone.isUserDrawn && showPredefinedZones);
    return priorityMatch && typeMatch;
  });

  const userZones = zones.filter(z => z.isUserDrawn);
  const predefinedZones = zones.filter(z => !z.isUserDrawn);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading zone data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️</div>
          <p className="text-red-600">Error loading data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-96 bg-white shadow-lg overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Area Analysis</h1>
            <p className="text-gray-600">Analyze planting potential with multiple view modes</p>
          </div>

          {/* Map Mode Toggle */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="w-4 h-4 text-blue-500" />
              <h3 className="font-medium text-gray-900">Map View</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setMapMode('leaflet')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  mapMode === 'leaflet'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MapIcon className="w-4 h-4 inline mr-1" />
                Interactive Map
              </button>
              <button
                onClick={() => setMapMode('satellite')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  mapMode === 'satellite'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Globe className="w-4 h-4 inline mr-1" />
                Satellite View
              </button>
              <button
                onClick={() => setMapMode('heatmap')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  mapMode === 'heatmap'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Flame className="w-4 h-4 inline mr-1" />
                Heat Analysis
              </button>
            </div>
            
            <div className="mt-3 text-xs text-gray-600">
              {mapMode === 'leaflet' && 'Interactive map with drawing tools for custom zones'}
              {mapMode === 'satellite' && 'High-resolution satellite imagery with Google Maps'}
              {mapMode === 'heatmap' && 'Urban heat analysis from Earth Engine'}
            </div>
          </div>

          {/* Drawing Controls - Only show for Interactive Map */}
          {mapMode === 'leaflet' && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MapIcon className="w-4 h-4 text-green-500" />
                  <h3 className="font-medium text-gray-900">Drawing Tools</h3>
                </div>
                {userZones.length > 0 && (
                  <button
                    onClick={handleClearUserZones}
                    className="text-red-600 hover:text-red-700 p-1 rounded transition-colors"
                    title="Clear all user zones"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-900">User Drawn Zones</span>
                  <span className="text-lg font-bold text-green-600">{userZones.length}</span>
                </div>
                <div className="text-xs text-green-700">
                  Use the polygon tool on the map to draw planting areas
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-2 border-2 border-green-600 bg-green-200"></div>
                  <span>User Drawn Areas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-2 border-2 border-blue-600 bg-blue-100 border-dashed"></div>
                  <span>Predefined Zones</span>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="p-6 border-b border-gray-200 space-y-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <h3 className="font-medium text-gray-900">Filters</h3>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            {/* Zone Type Toggles */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">User Drawn Zones ({userZones.length})</span>
                <button
                  onClick={() => setShowUserZones(!showUserZones)}
                  className={`p-1 rounded transition-colors ${
                    showUserZones ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {showUserZones ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Predefined Zones ({predefinedZones.length})</span>
                <button
                  onClick={() => setShowPredefinedZones(!showPredefinedZones)}
                  className={`p-1 rounded transition-colors ${
                    showPredefinedZones ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {showPredefinedZones ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Zone List */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">
                Zones ({filteredZones.length})
              </h3>
              <button
                onClick={() => setSelectedZone(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
                title="Clear selection"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredZones.map((zone) => (
                <motion.button
                  key={zone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setSelectedZone(zone)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedZone?.id === zone.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        zone.isUserDrawn ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      {zone.isUserDrawn ? 'User' : 'Zone'} {zone.id}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      zone.priority === 'high' ? 'bg-red-100 text-red-700' :
                      zone.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {zone.priority}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {(zone.area / 1000).toFixed(1)} ha • {zone.treeCapacity} trees
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    ≈ {zone.temperatureReduction.toFixed(1)}°C cooling
                  </div>
                </motion.button>
              ))}
              
              {filteredZones.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MapIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No zones match your filters</p>
                  {mapMode === 'leaflet' && (
                    <p className="text-xs mt-1">Try drawing a new zone on the map</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="p-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">How to Use</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {mapMode === 'leaflet' && (
                      <>
                        <li>• Use the polygon tool to draw planting areas</li>
                        <li>• Click on zones to view detailed analysis</li>
                        <li>• Filter zones by priority and type</li>
                        <li>• View recommendations in the panel below</li>
                      </>
                    )}
                    {mapMode === 'satellite' && (
                      <>
                        <li>• Navigate with mouse: drag to pan, scroll to zoom</li>
                        <li>• Click "Open Google Earth" for 3D terrain view</li>
                        <li>• Switch to Interactive Map to draw custom zones</li>
                        <li>• Click zones in the sidebar for analysis</li>
                      </>
                    )}
                    {mapMode === 'heatmap' && (
                      <>
                        <li>• Explore urban heat patterns in Tashkent</li>
                        <li>• Identify hotspots for priority tree planting</li>
                        <li>• Use layers to toggle different data views</li>
                        <li>• Click areas to get temperature readings</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Map */}
          <div className="flex-1">
            {mapMode === 'leaflet' && (
              <MapContainer
                zones={filteredZones}
                onZoneCreate={handleZoneCreate}
                onZoneClick={handleZoneClick}
                enableDrawing={true}
                className="h-full"
              />
            )}
            {mapMode === 'satellite' && (
              <GoogleEarthContainer
                zones={filteredZones}
                onZoneClick={handleZoneClick}
                className="h-full"
              />
            )}
            {mapMode === 'heatmap' && (
              <EarthEngineViewer className="h-full" />
            )}
          </div>

          {/* Bottom Panel */}
          <div className="h-80 bg-white border-t border-gray-200 overflow-y-auto">
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AreaMetrics zones={filteredZones} selectedZone={selectedZone} />
                
                <AnimatePresence mode="wait">
                  {selectedZone ? (
                    <motion.div
                      key={selectedZone.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ZoneRecommendation zone={selectedZone} />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-gray-50 rounded-lg p-8 text-center"
                    >
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Select a Zone for Analysis
                      </h3>
                      <p className="text-gray-600">
                        Click on a zone in the sidebar to view detailed recommendations and analysis.
                        {mapMode === 'leaflet' && ' Use the polygon tool to draw custom zones.'}
                        {mapMode === 'satellite' && ' Switch to Interactive Map mode to draw custom zones.'}
                        {mapMode === 'heatmap' && ' Use the heatmap to identify priority areas for tree planting.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaAnalysis;