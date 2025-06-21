import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import { PlantingZone } from "../../types";

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

interface MapContainerProps {
  zones: PlantingZone[];
  onZoneCreate?: (geometry: GeoJSON.Polygon) => void;
  onZoneClick?: (zone: PlantingZone) => void;
  enableDrawing?: boolean;
  simulationMode?: boolean;
  currentMonth?: number;
  className?: string;
}

const MapContainer: React.FC<MapContainerProps> = ({
  zones,
  onZoneCreate,
  onZoneClick,
  enableDrawing = false,
  simulationMode = false,
  currentMonth = 0,
  className = "",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const drawnLayersRef = useRef<L.FeatureGroup>(new L.FeatureGroup());
  const zoneLayersRef = useRef<L.FeatureGroup>(new L.FeatureGroup());
  const simulationLayersRef = useRef<L.FeatureGroup>(new L.FeatureGroup());
  const drawControlRef = useRef<L.Control.Draw | null>(null);
  const [currentBasemap, setCurrentBasemap] = useState<L.TileLayer | null>(
    null
  );
  const [isMapReady, setIsMapReady] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    try {
      const map = L.map(mapRef.current, {
        center: [41.31, 69.25],
        zoom: 12,
        minZoom: 10,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: true,
      });

      // Add zoom control to top right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Base layers
      const baseLayers = {
        OpenStreetMap: L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }
        ),
        Satellite: L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution:
              "&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            maxZoom: 19,
          }
        ),
        Hybrid: L.layerGroup([
          L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            {
              attribution: "&copy; Esri",
            }
          ),
          L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
            {
              attribution: "",
            }
          ),
        ]),
      };

      // Add default basemap
      baseLayers["OpenStreetMap"].addTo(map);
      setCurrentBasemap(baseLayers["OpenStreetMap"]);

      // Add layer control
      L.control.layers(baseLayers, {}, { position: "topright" }).addTo(map);

      // Add layer groups
      drawnLayersRef.current.addTo(map);
      zoneLayersRef.current.addTo(map);
      simulationLayersRef.current.addTo(map);

      mapInstanceRef.current = map;
      setIsMapReady(true);

      // Map ready event
      map.whenReady(() => {
        console.log("Map is ready");
        map.invalidateSize();
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setIsMapReady(false);
      }
    };
  }, []);

  // Setup drawing controls
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady || !enableDrawing) return;

    const map = mapInstanceRef.current;

    // Remove existing draw control
    if (drawControlRef.current) {
      map.removeControl(drawControlRef.current);
      drawControlRef.current = null;
    }

    try {
      // Create new draw control
      const drawControl = new L.Control.Draw({
        position: "topleft",
        edit: {
          featureGroup: drawnLayersRef.current,
          remove: true,
          edit: {},
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
              color: "#16a34a",
              weight: 3,
              fillOpacity: 0.2,
              fillColor: "#22c55e",
            },
            showArea: true,
            metric: true,
            feet: false,
            nautic: false,
          },
        },
      });

      drawControl.addTo(map);
      drawControlRef.current = drawControl;

      // Handle draw events
      const handleDrawCreated = (event: any) => {
        console.log("Draw created event:", event);
        const layer = event.layer;

        if (layer && drawnLayersRef.current) {
          drawnLayersRef.current.addLayer(layer);

          if (onZoneCreate) {
            try {
              const geoJson = layer.toGeoJSON();
              console.log("Created GeoJSON:", geoJson);
              onZoneCreate(geoJson.geometry);
            } catch (error) {
              console.error("Error creating zone:", error);
            }
          }
        }
      };

      const handleDrawDeleted = (event: any) => {
        console.log("Draw deleted event:", event);
        // Handle deletion if needed
      };

      const handleDrawEdited = (event: any) => {
        console.log("Draw edited event:", event);
        // Handle editing if needed
      };

      // Add event listeners
      map.on(L.Draw.Event.CREATED, handleDrawCreated);
      map.on(L.Draw.Event.DELETED, handleDrawDeleted);
      map.on(L.Draw.Event.EDITED, handleDrawEdited);

      // Cleanup function
      return () => {
        map.off(L.Draw.Event.CREATED, handleDrawCreated);
        map.off(L.Draw.Event.DELETED, handleDrawDeleted);
        map.off(L.Draw.Event.EDITED, handleDrawEdited);
      };
    } catch (error) {
      console.error("Error setting up drawing controls:", error);
    }
  }, [isMapReady, enableDrawing, onZoneCreate]);

  // Update zones display
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return;

    zoneLayersRef.current.clearLayers();

    zones.forEach((zone) => {
      try {
        const color =
          zone.priority === "high"
            ? "#dc2626"
            : zone.priority === "medium"
            ? "#f59e0b"
            : "#10b981";

        const layer = L.geoJSON(zone.geometry, {
          style: {
            color,
            weight: zone.isUserDrawn ? 3 : 2,
            fillOpacity: zone.isUserDrawn ? 0.3 : 0.15,
            fillColor: color,
            dashArray: zone.isUserDrawn ? undefined : "5, 5",
          },
        });

        // Add popup
        layer.bindPopup(`
          <div class="p-3 min-w-64">
            <h3 class="font-semibold text-lg mb-2 text-gray-900">
              ${
                zone.isUserDrawn
                  ? "Foydalanuvchi zonasi"
                  : "Oldindan belgilangan zona"
              } ${zone.id}
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Maydon:</span>
                <span class="font-medium">${(zone.area / 1000).toFixed(
                  1
                )} ha</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Daraxtlar:</span>
                <span class="font-medium">${zone.treeCapacity}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Sovutish:</span>
                <span class="font-medium">≈ ${zone.temperatureReduction.toFixed(
                  1
                )}°C</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Ustuvorlik:</span>
                <span class="font-medium capitalize ${
                  zone.priority === "high"
                    ? "text-red-600"
                    : zone.priority === "medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }">${zone.priority}</span>
              </div>
            </div>
          </div>
        `);

        // Add click handler
        layer.on("click", (e) => {
          e.originalEvent.stopPropagation();
          if (onZoneClick) {
            onZoneClick(zone);
          }
        });

        zoneLayersRef.current.addLayer(layer);
      } catch (error) {
        console.error("Error adding zone to map:", error);
      }
    });
  }, [zones, onZoneClick, isMapReady]);

  // Simulation overlay
  useEffect(() => {
    if (!mapInstanceRef.current || !simulationMode || !isMapReady) return;

    simulationLayersRef.current.clearLayers();

    zones.forEach((zone) => {
      try {
        const growthProgress = Math.min(1, (currentMonth + 1) / 12);
        const seasonalMultiplier =
          Math.sin((currentMonth / 12) * Math.PI * 2 + Math.PI / 2) * 0.3 + 0.7;
        const finalProgress = growthProgress * seasonalMultiplier;

        if (finalProgress > 0.1) {
          const simulationLayer = L.geoJSON(zone.geometry, {
            style: {
              fillColor: "#22c55e",
              fillOpacity: Math.max(0.1, finalProgress * 0.6),
              color: "#16a34a",
              weight: 2,
              opacity: Math.max(0.3, finalProgress * 0.8),
            },
          });

          simulationLayer.bindTooltip(
            `
            <div class="text-center">
              <div class="font-semibold text-green-800">Simulated Growth</div>
              <div class="text-sm text-green-600">
                Month ${currentMonth + 1}: ${(finalProgress * 100).toFixed(
              0
            )}% coverage
              </div>
              <div class="text-sm text-green-600">
                NDVI: ${(zone.ndvi + finalProgress * 0.3).toFixed(2)}
              </div>
            </div>
          `,
            {
              permanent: false,
              direction: "center",
              className:
                "bg-white/95 border border-green-200 rounded-lg shadow-lg",
            }
          );

          simulationLayersRef.current.addLayer(simulationLayer);
        }
      } catch (error) {
        console.error("Error adding simulation layer:", error);
      }
    });
  }, [zones, simulationMode, currentMonth, isMapReady]);

  // Invalidate size when className changes (for responsive behavior)
  useEffect(() => {
    if (mapInstanceRef.current && isMapReady) {
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 100);
    }
  }, [className, isMapReady]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapRef}
        className="w-full h-full"
        id="map"
        role="application"
        aria-label="Interactive map for urban tree planning"
      />

      {/* Chizish bo'yicha ko'rsatmalar */}
      {enableDrawing && isMapReady && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-sm">
          <div className="text-sm">
            <div className="font-medium text-gray-900 mb-2 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Chizish asboblari faollashgan
            </div>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>
                • Asboblar panelidan <strong>ko‘pburchak asbobi</strong>ni
                tanlang
              </li>
              <li>• Chizishni boshlash uchun xaritaga bosing</li>
              <li>
                • Nuqtalar qo‘shish uchun bosing, tugatish uchun ikki marta
                bosing
              </li>
              <li>
                • Shakllarni o‘zgartirish uchun tahrirlash/o‘chirish
                asboblaridan foydalaning
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Yuklanmoqda indikatori */}
      {!isMapReady && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-[1000]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">
              Interaktiv xarita yuklanmoqda...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
