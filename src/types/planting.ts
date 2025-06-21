export interface DrawnPolygon {
  id: string;
  geometry: GeoJSON.Polygon;
  area: number; // in square meters
  centroid: [number, number]; // [lat, lng]
  boundingBox: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  createdAt: Date;
}

export interface PlantingRecommendation {
  polygonId: string;
  treeCount: number;
  suggestedSpecies: string[];
  currentNDVI: number;
  projectedNDVI: number;
  estimatedCost: number;
  maintenanceNotes: string[];
  seasonalGrowth: SeasonalGrowth[];
}

export interface SeasonalGrowth {
  month: number;
  ndviValue: number;
  coveragePercent: number;
  description: string;
}

export interface PredefinedZone {
  id: string;
  name: string;
  geometry: GeoJSON.Polygon;
  area: number;
  priority: 'high' | 'medium' | 'low';
  existingVegetation: number;
}