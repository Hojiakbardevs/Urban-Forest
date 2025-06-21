import React, { useState, useCallback, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import * as turf from "@turf/turf";
import {
  TreePine,
  Calculator,
  Leaf,
  Play,
  Pause,
  RotateCcw,
  Info,
  Layers,
} from "lucide-react";
import {
  DrawnPolygon,
  PlantingRecommendation,
  SeasonalGrowth,
  PredefinedZone,
} from "../types/planting";
import DrawingControls from "./DrawingControls";
import RecommendationPanel from "./RecommendationPanel";
import TimelineSlider from "./TimelineSlider";
import GreenSimulation from "./GreenSimulation";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const TreePlantingVisualizer: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const drawControlRef = useRef<L.Control.Draw | null>(null);
  const drawnLayersRef = useRef<L.FeatureGroup>(new L.FeatureGroup());
  const predefinedLayersRef = useRef<L.FeatureGroup>(new L.FeatureGroup());
  const simulationLayersRef = useRef<L.FeatureGroup>(new L.FeatureGroup());

  const [drawnPolygons, setDrawnPolygons] = useState<DrawnPolygon[]>([]);
  const [recommendations, setRecommendations] = useState<
    PlantingRecommendation[]
  >([]);
  const [selectedPolygon, setSelectedPolygon] = useState<DrawnPolygon | null>(
    null
  );
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showPredefinedZones, setShowPredefinedZones] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Predefined zones data
  const predefinedZones: PredefinedZone[] = [
    {
      id: "zone-1",
      name: "Central Park Area",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [69.24, 41.315],
            [69.245, 41.315],
            [69.245, 41.32],
            [69.24, 41.32],
            [69.24, 41.315],
          ],
        ],
      },
      area: 25000,
      priority: "high",
      existingVegetation: 0.15,
    },
    {
      id: "zone-2",
      name: "Residential District",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [69.25, 41.305],
            [69.255, 41.305],
            [69.255, 41.31],
            [69.25, 41.31],
            [69.25, 41.305],
          ],
        ],
      },
      area: 18000,
      priority: "medium",
      existingVegetation: 0.08,
    },
  ];

  // Tree species recommendations based on area size and location
  const getTreeSpecies = (area: number): string[] => {
    if (area > 10000) {
      return [
        "Platanus orientalis",
        "Populus nigra",
        "Acer platanoides",
        "Tilia cordata",
      ];
    } else if (area > 5000) {
      return ["Acer platanoides", "Tilia cordata", "Fraxinus excelsior"];
    } else if (area > 1000) {
      return ["Tilia cordata", "Fraxinus excelsior", "Prunus cerasifera"];
    } else {
      return ["Prunus cerasifera", "Malus domestica", "Crataegus monogyna"];
    }
  };

  // Generate seasonal growth data
  const generateSeasonalGrowth = (
    baseNDVI: number,
    targetNDVI: number
  ): SeasonalGrowth[] => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.map((month, index) => {
      const progress = index / 11;
      const seasonalMultiplier =
        Math.sin((index / 12) * Math.PI * 2 + Math.PI / 2) * 0.3 + 0.7;
      const ndviValue =
        baseNDVI + (targetNDVI - baseNDVI) * progress * seasonalMultiplier;
      const coveragePercent = Math.min(
        100,
        progress * 100 * seasonalMultiplier
      );

      return {
        month: index,
        ndviValue: Math.max(baseNDVI, ndviValue),
        coveragePercent,
        description: `${month}: ${coveragePercent.toFixed(
          0
        )}% vegetation coverage`,
      };
    });
  };

  // Calculate polygon properties
  const calculatePolygonProperties = useCallback(
    (layer: L.Polygon): DrawnPolygon => {
      const geoJson = layer.toGeoJSON() as GeoJSON.Feature<GeoJSON.Polygon>;
      const turfPolygon = turf.polygon(geoJson.geometry.coordinates);
      const area = turf.area(turfPolygon);
      const centroidFeature = turf.centroid(turfPolygon);
      const bbox = turf.bbox(turfPolygon);

      return {
        id: `polygon-${Date.now()}`,
        geometry: geoJson.geometry,
        area,
        centroid: [
          centroidFeature.geometry.coordinates[1],
          centroidFeature.geometry.coordinates[0],
        ],
        boundingBox: {
          north: bbox[3],
          south: bbox[1],
          east: bbox[2],
          west: bbox[0],
        },
        createdAt: new Date(),
      };
    },
    []
  );

  // Generate planting recommendation
  const generateRecommendation = useCallback(
    (polygon: DrawnPolygon): PlantingRecommendation => {
      const treeCount = Math.floor(polygon.area / 25); // 1 tree per 25 m²
      const currentNDVI = 0.1 + Math.random() * 0.15; // Simulate current vegetation
      const projectedNDVI = Math.min(
        0.8,
        currentNDVI + 0.25 + (treeCount / polygon.area) * 1000
      );
      const estimatedCost = treeCount * 45; // $45 per tree including planting

      return {
        polygonId: polygon.id,
        treeCount,
        suggestedSpecies: getTreeSpecies(polygon.area),
        currentNDVI,
        projectedNDVI,
        estimatedCost,
        maintenanceNotes: [
          "Water regularly for the first 2 years",
          "Prune annually during dormant season",
          "Apply mulch around base to retain moisture",
          "Monitor for pests and diseases",
        ],
        seasonalGrowth: generateSeasonalGrowth(currentNDVI, projectedNDVI),
      };
    },
    []
  );

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [41.31, 69.25],
      zoom: 13,
      minZoom: 10,
      maxZoom: 18,
    });

    // Add base layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add layer groups
    drawnLayersRef.current.addTo(map);
    predefinedLayersRef.current.addTo(map);
    simulationLayersRef.current.addTo(map);

    // Initialize draw control
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnLayersRef.current,
        remove: true,
      },
      draw: {
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
        polygon: {
          allowIntersection: false,
          drawError: {
            color: "#e1e100",
            message: "<strong>Error:</strong> Shape edges cannot cross!",
          },
          shapeOptions: {
            color: "#2563eb",
            weight: 3,
            fillOpacity: 0.2,
          },
        },
      },
    });

    drawControl.addTo(map);
    drawControlRef.current = drawControl;

    // Handle draw events
    map.on(L.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      drawnLayersRef.current.addLayer(layer);

      const polygonData = calculatePolygonProperties(layer);
      const recommendation = generateRecommendation(polygonData);

      setDrawnPolygons((prev) => [...prev, polygonData]);
      setRecommendations((prev) => [...prev, recommendation]);
      setSelectedPolygon(polygonData);

      // Add click handler to the drawn polygon
      layer.on("click", () => {
        setSelectedPolygon(polygonData);
      });
    });

    map.on(L.Draw.Event.DELETED, (event: any) => {
      const deletedLayers = event.layers;
      deletedLayers.eachLayer((layer: any) => {
        // Remove from state (simplified - in production, match by geometry)
        setDrawnPolygons((prev) => prev.slice(0, -1));
        setRecommendations((prev) => prev.slice(0, -1));
      });
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [calculatePolygonProperties, generateRecommendation]);

  // Load predefined zones
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    predefinedLayersRef.current.clearLayers();

    if (showPredefinedZones) {
      predefinedZones.forEach((zone) => {
        const layer = L.geoJSON(zone.geometry, {
          style: {
            color:
              zone.priority === "high"
                ? "#dc2626"
                : zone.priority === "medium"
                ? "#f59e0b"
                : "#10b981",
            weight: 2,
            fillOpacity: 0.1,
            dashArray: "5, 5",
          },
        });

        layer.bindPopup(`
          <div class="p-3">
            <h3 class="font-semibold text-lg mb-2">${zone.name}</h3>
            <p><strong>Area:</strong> ${(zone.area / 1000).toFixed(
              1
            )} hectares</p>
            <p><strong>Priority:</strong> ${zone.priority}</p>
            <p><strong>Existing Vegetation:</strong> ${(
              zone.existingVegetation * 100
            ).toFixed(0)}%</p>
          </div>
        `);

        predefinedLayersRef.current.addLayer(layer);
      });
    }
  }, [showPredefinedZones]);

  // Animation control
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAnimating) {
      interval = setInterval(() => {
        setCurrentMonth((prev) => (prev + 1) % 12);
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnimating]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentMonth(0);
  };

  const selectedRecommendation = selectedPolygon
    ? recommendations.find((r) => r.polygonId === selectedPolygon.id)
    : null;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg">
                <TreePine className="w-6 h-6" />
                <span className="text-xl font-bold">
                  Tree Planting Visualizer
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calculator className="w-4 h-4" />
                  <span className="text-sm">Area Analysis</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm">Growth Simulation</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="bg-white/80 hover:bg-white border border-gray-200 rounded-lg p-2 transition-colors">
                <Layers className="w-5 h-5" />
              </button>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  Tashkent, Uzbekistan
                </div>
                <div className="text-xs text-gray-500">
                  Tree Planting Optimization
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex relative">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-96" : "w-0"
          } transition-all duration-300 overflow-hidden bg-white/95 backdrop-blur-md border-r border-white/20 shadow-xl`}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Planting Analysis
              </h2>
              <p className="text-sm text-gray-600">
                Draw areas to visualize future vegetation growth
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Drawing Controls */}
              <DrawingControls
                onTogglePredefinedZones={() =>
                  setShowPredefinedZones(!showPredefinedZones)
                }
                showPredefinedZones={showPredefinedZones}
                drawnPolygonsCount={drawnPolygons.length}
              />

              {/* Timeline Controls */}
              {selectedPolygon && selectedRecommendation && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      Growth Timeline
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleAnimation}
                        className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors">
                        {isAnimating ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={resetAnimation}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <TimelineSlider
                    currentMonth={currentMonth}
                    onMonthChange={setCurrentMonth}
                    seasonalGrowth={selectedRecommendation.seasonalGrowth}
                  />
                </div>
              )}

              {/* Recommendation Panel */}
              {selectedPolygon && selectedRecommendation && (
                <RecommendationPanel
                  polygon={selectedPolygon}
                  recommendation={selectedRecommendation}
                  currentMonth={currentMonth}
                />
              )}

              {/* Instructions */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-900">How to Use</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>
                        • Xaritada poligon vositasini bosib chizishni boshlang
                      </li>
                      <li>
                        • Daraxt ekmoqchi bo‘lgan hududlarni chizib belgilang
                      </li>
                      <li>• Natijalarni va tavsiyalarni darhol ko‘ring</li>
                      <li>
                        • O‘sish simulyatsiyasini ko‘rish uchun vaqt chizig‘idan
                        foydalaning
                      </li>
                      <li>
                        • Taqqoslash uchun oldindan belgilangan zonalarni yoqing
                        yoki o‘chiring
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <div ref={mapRef} className="w-full h-full" />

          {/* Green Simulation Overlay */}
          {selectedPolygon && selectedRecommendation && (
            <GreenSimulation
              polygon={selectedPolygon}
              recommendation={selectedRecommendation}
              currentMonth={currentMonth}
              map={mapInstanceRef.current}
              simulationLayers={simulationLayersRef.current}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TreePlantingVisualizer;
