import React, { useRef, useEffect, useState } from "react";
import { Flame, Info, Leaf } from "lucide-react";

interface EarthEngineViewerProps {
  className?: string;
}

const EarthEngineViewer: React.FC<EarthEngineViewerProps> = ({
  className = "",
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heatmapUrl =
    "https://ecohackathon.projects.earthengine.app/view/heatmap";

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
      setError(null);
    };

    const handleError = () => {
      setIsLoading(false);
      setError(
        "Unable to load Earth Engine heatmap. Please check your connection."
      );
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener("load", handleLoad);
      iframe.addEventListener("error", handleError);
      return () => {
        iframe.removeEventListener("load", handleLoad);
        iframe.removeEventListener("error", handleError);
      };
    }
  }, []);

  const resetView = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      setError(null);
      iframeRef.current.src = heatmapUrl;
    }
  };

  const openInNewTab = () => {
    window.open(heatmapUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      {/* Loading Overlay */}
      {isLoading && !error && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-lg font-medium">
              Earth Engine xaritasi yuklanmoqda...
            </p>
            <p className="text-sm text-gray-300 mt-2">
              Toshkent shahridagi issiqlik taqsimotini tahlil qilinmoqda
            </p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20">
          <div className="text-center text-white max-w-md mx-auto p-6">
            <Flame className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              Issiqlik xaritasi mavjud emas
            </p>
            <p className="text-sm text-gray-300 mb-4">{error}</p>
            <div className="space-y-2">
              <button
                onClick={resetView}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">
                Qayta yuklash
              </button>
              <button
                onClick={openInNewTab}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                Yangi oynada ochish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Control Panel */}

      {/* <div className="absolute top-4 left-4 z-10 control-panel rounded-lg shadow-lg p-3">
        <div className="flex items-center space-x-2 mb-3">
          <Flame className="w-5 h-5 text-orange-600" />
          <span className="font-medium text-gray-900">Heat Analysis</span>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={resetView}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset View</span>
          </button>

          <button
            onClick={openInNewTab}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-1"
          >
            <Layers className="w-4 h-4" />
            <span>Full Screen</span>
          </button>
        </div>
      </div> */}

      {/* Legend Panel */}
      {/* <div className="absolute top-4 right-4 z-10 control-panel rounded-lg shadow-lg p-4 max-w-xs">
        <div className="flex items-center space-x-2 mb-3">
          <Thermometer className="w-5 h-5 text-red-600" />
          <span className="font-medium text-gray-900">Temperature Scale</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">Cool (&lt; 25°C)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Moderate (25-30°C)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-700">Warm (30-35°C)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-sm text-gray-700">Hot (35-40°C)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-700">Very Hot (&gt; 40°C)</span>
          </div>
        </div>
      </div> */}

      {/* Instructions Panel */}
      <div className="absolute bottom-4 left-4 z-10 instructions-panel rounded-lg shadow-lg p-4 max-w-sm">
        <div className="text-sm text-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <Info className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-gray-900">
              Xarita imkoniyatlari:
            </span>
          </div>
          <ul className="space-y-1 text-xs">
            <li>
              • <strong>Harakatlantiring:</strong> Xarita bo‘ylab yurish uchun
              sichqonchani bosing va torting
            </li>
            <li>
              • <strong>Kattalashtiring:</strong> Sichqoncha g‘ildiragi yoki
              boshqaruv tugmalari yordamida
            </li>
            <li>
              • <strong>Qavatlar:</strong> Turli ma’lumot qatlamlarini
              yoqish/o‘chirish
            </li>
            <li>
              • <strong>Bosing:</strong> Harorat ko‘rsatkichlarini olish uchun
              xaritada bosing
            </li>
          </ul>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center space-x-1">
              <Leaf className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600">
                Daraxt ekish uchun ustuvor hududlarni aniqlang
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main iframe */}
      <iframe
        ref={iframeRef}
        src={heatmapUrl}
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        title="Earth Engine Heatmap - Tashkent Urban Heat Analysis"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        onError={() => setError("Failed to load Earth Engine heatmap")}
      />
    </div>
  );
};

export default EarthEngineViewer;
