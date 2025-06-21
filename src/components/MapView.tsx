import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { LayerConfig } from '../types/map';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  layerConfig: LayerConfig;
  onPointClick: (point: { lat: number; lng: number }) => void;
}

const MapView: React.FC<MapViewProps> = ({ layerConfig, onPointClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const heatmapLayerRef = useRef<L.Layer | null>(null);
  const plantingZonesLayerRef = useRef<L.LayerGroup | null>(null);
  const currentBasemapRef = useRef<L.TileLayer | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [41.2995, 69.2401],
      zoom: 12,
      minZoom: 10,
      maxZoom: 16,
      zoomControl: false
    });

    // Add zoom control to top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add click handler
    map.on('click', (e) => {
      onPointClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onPointClick]);

  // Update basemap
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove current basemap
    if (currentBasemapRef.current) {
      map.removeLayer(currentBasemapRef.current);
    }

    // Add new basemap
    let basemapLayer: L.TileLayer;
    
    switch (layerConfig.basemap) {
      case 'satellite':
        basemapLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });
        break;
      case 'hybrid':
        basemapLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });
        break;
      case 'terrain':
        basemapLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });
        break;
      default: // street
        basemapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
    }

    basemapLayer.addTo(map);
    currentBasemapRef.current = basemapLayer;

    // Add labels for satellite/hybrid
    if (layerConfig.basemap === 'hybrid') {
      const labelsLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        attribution: ''
      });
      labelsLayer.addTo(map);
    }
  }, [layerConfig.basemap]);

  // Create mock heatmap effect
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing heatmap
    if (heatmapLayerRef.current) {
      map.removeLayer(heatmapLayerRef.current);
      heatmapLayerRef.current = null;
    }

    if (layerConfig.heatmapVisible) {
      // Create mock heatmap using circles (in real app, use georaster-layer-for-leaflet)
      const heatmapGroup = L.layerGroup();
      
      // Generate mock heat points around Tashkent
      const center = [41.2995, 69.2401];
      const points = [];
      
      for (let i = 0; i < 50; i++) {
        const lat = center[0] + (Math.random() - 0.5) * 0.1;
        const lng = center[1] + (Math.random() - 0.5) * 0.1;
        const intensity = Math.random();
        points.push({ lat, lng, intensity });
      }

      points.forEach(point => {
        const color = getHeatColor(point.intensity);
        const circle = L.circle([point.lat, point.lng], {
          radius: 200 + point.intensity * 300,
          fillColor: color,
          fillOpacity: layerConfig.heatmapOpacity * 0.6,
          color: color,
          weight: 0
        });
        heatmapGroup.addLayer(circle);
      });

      heatmapGroup.addTo(map);
      heatmapLayerRef.current = heatmapGroup;
    }
  }, [layerConfig.heatmapVisible, layerConfig.heatmapOpacity]);

  // Create planting zones
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing planting zones
    if (plantingZonesLayerRef.current) {
      map.removeLayer(plantingZonesLayerRef.current);
      plantingZonesLayerRef.current = null;
    }

    if (layerConfig.plantingZonesVisible) {
      const plantingZonesGroup = L.layerGroup();
      
      // Generate mock planting zones
      const center = [41.2995, 69.2401];
      
      for (let i = 0; i < 20; i++) {
        const lat = center[0] + (Math.random() - 0.5) * 0.08;
        const lng = center[1] + (Math.random() - 0.5) * 0.08;
        const area = Math.round(500 + Math.random() * 2000);
        const trees = Math.round(area / 100);
        const reduction = (Math.random() * 3 + 1).toFixed(1);
        
        const polygon = L.polygon([
          [lat - 0.002, lng - 0.002],
          [lat - 0.002, lng + 0.002],
          [lat + 0.002, lng + 0.002],
          [lat + 0.002, lng - 0.002]
        ], {
          fillColor: '#00FF00',
          fillOpacity: 0.3,
          color: '#00AA00',
          weight: 2
        });

        polygon.bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold mb-2">Potential Planting Zone</h3>
            <p><strong>Area:</strong> ${area}m²</p>
            <p><strong>Expected Reduction:</strong> ${reduction}°C</p>
            <p><strong>Recommended Trees:</strong> ${trees}</p>
          </div>
        `);

        plantingZonesGroup.addLayer(polygon);
      }

      plantingZonesGroup.addTo(map);
      plantingZonesLayerRef.current = plantingZonesGroup;
    }
  }, [layerConfig.plantingZonesVisible]);

  const getHeatColor = (intensity: number): string => {
    const colors = ['#0000FF', '#00FFFF', '#00FF00', '#FFFF00', '#FFA500', '#FF0000', '#8B0000'];
    const index = Math.floor(intensity * (colors.length - 1));
    return colors[index] || colors[0];
  };

  return <div ref={mapRef} className="w-full h-full" />;
};

export default MapView;