import React from "react";
import {
  TreePine,
  Calculator,
  Leaf,
  DollarSign,
  Clock,
  AlertCircle,
} from "lucide-react";
import { DrawnPolygon, PlantingRecommendation } from "../types/planting";

interface RecommendationPanelProps {
  polygon: DrawnPolygon;
  recommendation: PlantingRecommendation;
  currentMonth: number;
}

const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  polygon,
  recommendation,
  currentMonth,
}) => {
  const currentGrowth = recommendation.seasonalGrowth[currentMonth];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <TreePine className="w-5 h-5 text-green-600" />
        <h3 className="font-medium text-gray-900">Ekish bo‘yicha tavsiya</h3>
      </div>

      {/* Maydon haqida ma’lumot */}
      <div className="bg-white/70 rounded-lg p-4 border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Maydon tahlili</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Umumiy maydon</div>
            <div className="text-lg font-semibold text-gray-900">
              {(polygon.area / 1000).toFixed(1)} ga
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Markaz koordinatasi</div>
            <div className="text-sm font-mono text-gray-700">
              {polygon.centroid[0].toFixed(4)}, {polygon.centroid[1].toFixed(4)}
            </div>
          </div>
        </div>
      </div>

      {/* Daraxt ekish tavsiyasi */}
      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Calculator className="w-4 h-4 text-green-600" />
          <h4 className="font-medium text-green-900">Daraxt ekish rejasi</h4>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-700">
              Tavsiya etilgan daraxtlar soni
            </span>
            <span className="text-xl font-bold text-green-600">
              {recommendation.treeCount}
            </span>
          </div>

          <div>
            <div className="text-xs text-green-600 mb-1">
              Tavsiya etilgan turlar
            </div>
            <div className="flex flex-wrap gap-1">
              {recommendation.suggestedSpecies.map((species, index) => (
                <span
                  key={index}
                  className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                  {species}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NDVI yaxshilanishi */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Leaf className="w-4 h-4 text-blue-600" />
          <h4 className="font-medium text-blue-900">
            Vegetatsiya indeksi (NDVI)
          </h4>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">Joriy NDVI</span>
            <span className="font-semibold text-blue-600">
              {recommendation.currentNDVI.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">Prognoz qilingan NDVI</span>
            <span className="font-semibold text-blue-600">
              {recommendation.projectedNDVI.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {monthNames[currentMonth]} NDVI
            </span>
            <span className="font-semibold text-blue-600">
              {currentGrowth.ndviValue.toFixed(2)}
            </span>
          </div>

          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (currentGrowth.ndviValue / recommendation.projectedNDVI) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Xarajat hisob-kitobi */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <DollarSign className="w-4 h-4 text-yellow-600" />
          <h4 className="font-medium text-yellow-900">Xarajat hisob-kitobi</h4>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-yellow-700">Umumiy investitsiya</span>
            <span className="text-lg font-bold text-yellow-600">
              ${recommendation.estimatedCost.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-yellow-600">
            Daraxtlar, ekish va dastlabki parvarish xarajatlari kiritilgan
          </div>
        </div>
      </div>

      {/* Parvarish bo‘yicha eslatmalar */}
      <div className="bg-orange-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <AlertCircle className="w-4 h-4 text-orange-600" />
          <h4 className="font-medium text-orange-900">
            Parvarish bo‘yicha tavsiyalar
          </h4>
        </div>

        <ul className="space-y-1">
          {recommendation.maintenanceNotes.map((note, index) => (
            <li
              key={index}
              className="text-xs text-orange-700 flex items-start space-x-1">
              <span className="text-orange-500 mt-1">•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Joriy o‘sish holati */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-4 h-4 text-green-600" />
          <h4 className="font-medium text-gray-900">O‘sish jarayoni</h4>
        </div>

        <div className="text-sm text-gray-700">
          <strong>{monthNames[currentMonth]}:</strong>{" "}
          {currentGrowth.description}
        </div>

        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${currentGrowth.coveragePercent}%` }}
          />
        </div>

        <div className="text-xs text-gray-500 mt-1">
          {currentGrowth.coveragePercent.toFixed(0)}% vegetatsiya qoplamasi
        </div>
      </div>
    </div>
  );
};

export default RecommendationPanel;
