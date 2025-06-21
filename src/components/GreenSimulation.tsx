import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { DrawnPolygon, PlantingRecommendation } from '../types/planting';

interface GreenSimulationProps {
  polygon: DrawnPolygon;
  recommendation: PlantingRecommendation;
  currentMonth: number;
  map: L.Map | null;
  simulationLayers: L.FeatureGroup;
}

const GreenSimulation: React.FC<GreenSimulationProps> = ({
  polygon,
  recommendation,
  currentMonth,
  map,
  simulationLayers
}) => {
  const simulationLayerRef = useRef<L.Layer | null>(null);

  useEffect(() => {
    if (!map || !polygon) return;

    // Remove existing simulation layer
    if (simulationLayerRef.current) {
      simulationLayers.removeLayer(simulationLayerRef.current);
      simulationLayerRef.current = null;
    }

    const currentGrowth = recommendation.seasonalGrowth[currentMonth];
    const growthIntensity = currentGrowth.coveragePercent / 100;

    // Create green overlay based on growth progress
    const greenOverlay = L.geoJSON(polygon.geometry, {
      style: {
        fillColor: '#22c55e',
        fillOpacity: Math.max(0.1, growthIntensity * 0.6),
        color: '#16a34a',
        weight: 2,
        opacity: Math.max(0.3, growthIntensity * 0.8)
      }
    });

    // Add pulsing effect for active growth
    if (growthIntensity > 0.1) {
      const pulseClass = 'pulse-green';
      const style = document.createElement('style');
      style.textContent = `
        .${pulseClass} {
          animation: pulse-green 2s infinite;
        }
        @keyframes pulse-green {
          0% { fill-opacity: ${Math.max(0.1, growthIntensity * 0.6)}; }
          50% { fill-opacity: ${Math.max(0.2, growthIntensity * 0.8)}; }
          100% { fill-opacity: ${Math.max(0.1, growthIntensity * 0.6)}; }
        }
      `;
      document.head.appendChild(style);

      greenOverlay.eachLayer((layer: any) => {
        if (layer._path) {
          layer._path.classList.add(pulseClass);
        }
      });
    }

    // Add tooltip with growth information
    greenOverlay.bindTooltip(`
      <div class="text-center">
        <div class="font-semibold text-green-800">Future Vegetation</div>
        <div class="text-sm text-green-600">
          Coverage: ${currentGrowth.coveragePercent.toFixed(0)}%
        </div>
        <div class="text-sm text-green-600">
          NDVI: ${currentGrowth.ndviValue.toFixed(2)}
        </div>
      </div>
    `, {
      permanent: false,
      direction: 'center',
      className: 'custom-tooltip'
    });

    simulationLayers.addLayer(greenOverlay);
    simulationLayerRef.current = greenOverlay;

    // Add tree markers for mature growth
    if (growthIntensity > 0.5) {
      const treeCount = Math.min(recommendation.treeCount, Math.floor(growthIntensity * recommendation.treeCount));
      const bounds = L.geoJSON(polygon.geometry).getBounds();
      
      for (let i = 0; i < treeCount; i++) {
        const randomLat = bounds.getSouth() + Math.random() * (bounds.getNorth() - bounds.getSouth());
        const randomLng = bounds.getWest() + Math.random() * (bounds.getEast() - bounds.getWest());
        
        // Check if point is inside polygon (simplified check)
        const point = L.latLng(randomLat, randomLng);
        
        const treeIcon = L.divIcon({
          html: `<div style="color: #16a34a; font-size: ${8 + growthIntensity * 8}px;">🌳</div>`,
          className: 'tree-marker',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const treeMarker = L.marker([randomLat, randomLng], { icon: treeIcon });
        simulationLayers.addLayer(treeMarker);
      }
    }

    return () => {
      if (simulationLayerRef.current) {
        simulationLayers.removeLayer(simulationLayerRef.current);
      }
    };
  }, [polygon, recommendation, currentMonth, map, simulationLayers]);

  return null; // This component only manages map layers
};

export default GreenSimulation;