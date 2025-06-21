import React, { useRef, useEffect, useState } from 'react';
import { Globe, Map, Layers, RotateCcw, Flame, ExternalLink, AlertCircle } from 'lucide-react';
import { PlantingZone } from '../../types';

interface GoogleEarthContainerProps {
  zones: PlantingZone[];
  onZoneClick?: (zone: PlantingZone) => void;
  className?: string;
}

const GoogleEarthContainer: React.FC<GoogleEarthContainerProps> = ({
  zones,
  onZoneClick,
  className = ''
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'satellite' | 'heatmap'>('satellite');
  const [error, setError] = useState<string | null>(null);

  // Tashkent coordinates
  const tashkentLat = 41.31;
  const tashkentLng = 69.25;

  // Working URLs for different view modes
  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95942.80789436158!2d${tashkentLng - 0.1}!3d${tashkentLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1635789012345!5m2!1sen!2s`;
  const heatmapUrl = 'https://ecohackathon.projects.earthengine.app/view/heatmap';

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
      setError(null);
    };

    const handleError = () => {
      setIsLoading(false);
      setError('Failed to load the map. Please try again.');
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      };
    }
  }, [viewMode]);

  const handleViewModeChange = (mode: 'satellite' | 'heatmap') => {
    setIsLoading(true);
    setError(null);
    setViewMode(mode);
  };

  const resetView = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      setError(null);
      const url = viewMode === 'satellite' ? googleMapsUrl : heatmapUrl;
      iframeRef.current.src = url;
    }
  };

  const openInGoogleEarth = () => {
    const earthUrl = `https://earth.google.com/web/@${tashkentLat},${tashkentLng},1500a,35y,0h,0t,0r`;
    window.open(earthUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      {/* Loading Overlay */}
      {isLoading && !error && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-lg font-medium">
              Loading {viewMode === 'satellite' ? 'Google Maps Satellite' : 'Earth Engine Heatmap'}...
            </p>
            <p className="text-sm text-gray-300 mt-2">
              Preparing interactive view of Tashkent
            </p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20">
          <div className="text-center text-white max-w-md mx-auto p-6">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Unable to Load Map</p>
            <p className="text-sm text-gray-300 mb-4">{error}</p>
            <button
              onClick={resetView}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Control Panel */}
      <div className="absolute top-4 left-4 z-10 control-panel rounded-lg shadow-lg p-3">
        <div className="flex items-center space-x-2 mb-3">
          <Globe className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-900">Satellite View</span>
        </div>
        
        <div className="flex space-x-2 mb-3">
          <button
            onClick={() => handleViewModeChange('satellite')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'satellite'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Map className="w-4 h-4 inline mr-1" />
            Google Maps
          </button>
          <button
            onClick={() => handleViewModeChange('heatmap')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'heatmap'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Flame className="w-4 h-4 inline mr-1" />
            Heat Analysis
          </button>
        </div>

        <div className="space-y-2">
          <button
            onClick={resetView}
            className="w-full btn-reset text-white px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset View</span>
          </button>

          <button
            onClick={openInGoogleEarth}
            className="w-full btn-earth text-white px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-1"
          >
            <Globe className="w-4 h-4" />
            <span>Open Google Earth</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Zone Information Panel */}
      {zones.length > 0 && (
        <div className="absolute top-4 right-4 z-10 zone-panel rounded-lg shadow-lg p-4 max-w-xs overflow-y-auto">
          <div className="flex items-center space-x-2 mb-3">
            <Layers className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-900">Planting Zones ({zones.length})</span>
          </div>
          
          <div className="space-y-2">
            {zones.slice(0, 8).map((zone) => (
              <button
                key={zone.id}
                onClick={() => onZoneClick?.(zone)}
                className="w-full text-left p-3 bg-gray-50 hover:bg-green-50 rounded-md transition-colors border border-gray-200 hover:border-green-300"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-900">
                    Zone {zone.id}
                  </div>
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
              </button>
            ))}
            {zones.length > 8 && (
              <div className="text-xs text-gray-500 text-center py-2 border-t border-gray-200">
                +{zones.length - 8} more zones available
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instructions Panel */}
      <div className="absolute bottom-4 left-4 z-10 instructions-panel rounded-lg shadow-lg p-4 max-w-sm">
        <div className="text-sm text-gray-700">
          <div className="font-medium text-gray-900 mb-2">
            {viewMode === 'satellite' ? 'Google Maps Navigation:' : 'Heatmap Navigation:'}
          </div>
          <ul className="space-y-1 text-xs">
            <li>• <strong>Mouse:</strong> Click and drag to pan</li>
            <li>• <strong>Scroll:</strong> Zoom in/out</li>
            {viewMode === 'satellite' && (
              <>
                <li>• <strong>Double-click:</strong> Zoom to location</li>
                <li>• <strong>Right-click:</strong> Context menu</li>
              </>
            )}
            {viewMode === 'heatmap' && (
              <>
                <li>• <strong>Click:</strong> Get temperature data</li>
                <li>• <strong>Layers:</strong> Toggle heat visualization</li>
              </>
            )}
          </ul>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-blue-600">
              💡 Click "Open Google Earth" for 3D terrain view
            </p>
          </div>
        </div>
      </div>

      {/* Main iframe */}
      <iframe
        ref={iframeRef}
        src={viewMode === 'satellite' ? googleMapsUrl : heatmapUrl}
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        title={`${viewMode === 'satellite' ? 'Google Maps Satellite' : 'Earth Engine Heatmap'} - Tashkent Urban Planning`}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
        onError={() => setError('Failed to load the map view')}
      />

      {/* Coordinate Display */}
      <div className="absolute bottom-4 right-4 z-10 bg-black/70 text-white px-3 py-2 rounded-lg text-xs font-mono">
        Tashkent: {tashkentLat}°N, {tashkentLng}°E
      </div>
    </div>
  );
};

export default GoogleEarthContainer;