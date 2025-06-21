import React, { useEffect, useState } from "react";
import { Thermometer, Leaf, TreePine, TrendingDown } from "lucide-react";

interface PointInfoProps {
  selectedPoint: {
    lat: number;
    lng: number;
    temperature?: number;
    ndvi?: number;
  };
}

const PointInfo: React.FC<PointInfoProps> = ({ selectedPoint }) => {
  const [data, setData] = useState<{
    temperature: number;
    ndvi: number;
    recommendations: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPointData = async () => {
      setLoading(true);
      try {
        // Simulate API call - replace with actual API
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock data based on coordinates
        const mockTemp = 25 + Math.random() * 15;
        const mockNdvi = Math.random() * 0.8;
        const mockRecommendations = [
          "Plant 3-5 shade trees in this area",
          "Consider drought-resistant species",
          "Install reflective surfaces nearby",
        ];

        setData({
          temperature: mockTemp,
          ndvi: mockNdvi,
          recommendations: mockRecommendations,
        });
      } catch (error) {
        console.error("Error fetching point data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPointData();
  }, [selectedPoint]);

  if (loading) {
    return (
      <div className="bg-white/70 rounded-lg p-4 border border-gray-200">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200 space-y-4">
      <div className="space-y-2">
        <div className="text-xs text-gray-500">
          Coordinates: {selectedPoint.lat.toFixed(4)},{" "}
          {selectedPoint.lng.toFixed(4)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-red-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Thermometer className="w-4 h-4 text-red-500" />
            <span className="text-xs font-medium text-red-700">Harorat</span>
          </div>
          <div className="text-lg font-semibold text-red-600">
            {data.temperature.toFixed(1)}°C
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Leaf className="w-4 h-4 text-green-500" />
            <span className="text-xs font-medium text-green-700">
              NDVI (Vegetatsiya indeksi)
            </span>
          </div>
          <div className="text-lg font-semibold text-green-600">
            {data.ndvi.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <TreePine className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Tavsiyalar</span>
        </div>
        <ul className="space-y-1">
          {data.recommendations.map((rec, index) => (
            <li
              key={index}
              className="text-xs text-gray-600 flex items-start space-x-1">
              <span className="text-blue-500 mt-1">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-blue-50 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-1">
          <TrendingDown className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-medium text-blue-700">
            Kutilayotgan ta’sir
          </span>
        </div>
        <div className="text-sm text-blue-600">
          To‘g‘ri vegetatsiya bilan kutilayotgan sovitish: 2-4°C
        </div>
      </div>
    </div>
  );
};

export default PointInfo;
