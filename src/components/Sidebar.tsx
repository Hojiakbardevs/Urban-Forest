import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  MapPin,
  Thermometer,
  Leaf,
} from "lucide-react";
import { LayerConfig } from "../types/map";
import LayerControls from "./LayerControls";
import PointInfo from "./PointInfo";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  layerConfig: LayerConfig;
  onLayerConfigChange: (config: LayerConfig) => void;
  selectedPoint: {
    lat: number;
    lng: number;
    temperature?: number;
    ndvi?: number;
  } | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  layerConfig,
  onLayerConfigChange,
  selectedPoint,
}) => {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute top-4 left-4 z-1000 bg-white/90 backdrop-blur-md hover:bg-white border border-white/20 rounded-lg p-2 shadow-lg transition-all duration-300 hover:shadow-xl">
        {isOpen ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white/95 backdrop-blur-md border-r border-white/20 shadow-xl transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Map Controls
            </h2>
            <p className="text-sm text-gray-600">
              Configure layers and analyze heat patterns
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Layer Controls Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium text-gray-900">Layer Settings</h3>
              </div>
              <LayerControls
                layerConfig={layerConfig}
                onChange={onLayerConfigChange}
              />
            </div>

            {/* Point Information Section */}
            {selectedPoint && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <h3 className="font-medium text-gray-900">Point Analysis</h3>
                </div>
                <PointInfo selectedPoint={selectedPoint} />
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 space-y-3">
              <h3 className="font-medium text-gray-900 mb-3">
                Bugungi umumiy ko‘rsatkichlar
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-600">
                      O‘rtacha harorat
                    </span>
                  </div>
                  <span className="text-sm font-medium">28.5°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Leaf className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Ekish zonalari
                    </span>
                  </div>
                  <span className="text-sm font-medium">142 ta hudud</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
