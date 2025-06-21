import { useState, useEffect, useCallback } from 'react';
import { PlantingZone, PredefinedZone } from '../types';
import * as turf from '@turf/turf';

export const useZoneData = () => {
  const [zones, setZones] = useState<PlantingZone[]>([]);
  const [predefinedZones, setPredefinedZones] = useState<PredefinedZone[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load predefined zones from GeoJSON
  useEffect(() => {
    const loadPredefinedZones = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/planting_zones.geojson');
        if (!response.ok) {
          throw new Error('Failed to load predefined zones');
        }
        
        const geoJsonData = await response.json();
        const loadedZones: PlantingZone[] = geoJsonData.features.map((feature: any) => {
          const area = turf.area(feature.geometry);
          const treeCapacity = Math.floor(area / 25);
          const temperatureReduction = Math.min(5, treeCapacity * 0.02);
          
          return {
            id: feature.properties.zone_id,
            geometry: feature.geometry,
            priority: feature.properties.priority === 'yuqori' ? 'high' : 
                     feature.properties.priority === 'o\'rtacha' ? 'medium' : 'low',
            ndvi: 0.1 + Math.random() * 0.15, // Mock NDVI since not in data
            lstBaseline: 28 + Math.random() * 10, // Mock LST baseline
            area,
            treeCapacity,
            temperatureReduction,
            createdAt: new Date(),
            isUserDrawn: false
          };
        });
        
        setZones(prev => [...prev, ...loadedZones]);
        setPredefinedZones(geoJsonData.features.map((f: any) => f.properties));
      } catch (err) {
        console.error('Error loading predefined zones:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadPredefinedZones();
  }, []);

  const addUserZone = useCallback((geometry: GeoJSON.Polygon) => {
    try {
      console.log('Adding user zone with geometry:', geometry);
      
      const area = turf.area(geometry);
      const treeCapacity = Math.floor(area / 25);
      const temperatureReduction = Math.min(5, treeCapacity * 0.02);
      const baseNdvi = 0.1 + Math.random() * 0.1;
      
      const newZone: PlantingZone = {
        id: `user-${Date.now()}`,
        geometry,
        priority: area > 10000 ? 'high' : area > 5000 ? 'medium' : 'low',
        ndvi: baseNdvi,
        lstBaseline: 28 + Math.random() * 10,
        area,
        treeCapacity,
        temperatureReduction,
        createdAt: new Date(),
        isUserDrawn: true
      };

      console.log('Created new zone:', newZone);
      setZones(prev => [...prev, newZone]);
      return newZone;
    } catch (error) {
      console.error('Error adding user zone:', error);
      throw error;
    }
  }, []);

  const removeZone = useCallback((zoneId: string) => {
    setZones(prev => prev.filter(zone => zone.id !== zoneId));
  }, []);

  const getZonesByPriority = useCallback((priority: string) => {
    if (priority === 'all') return zones;
    return zones.filter(zone => zone.priority === priority);
  }, [zones]);

  const clearUserZones = useCallback(() => {
    setZones(prev => prev.filter(zone => !zone.isUserDrawn));
  }, []);

  return {
    zones,
    predefinedZones,
    loading,
    error,
    addUserZone,
    removeZone,
    getZonesByPriority,
    clearUserZones
  };
};