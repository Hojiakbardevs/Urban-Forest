export interface PlantingZone {
  id: string;
  geometry: GeoJSON.Polygon;
  priority: 'high' | 'medium' | 'low';
  ndvi: number;
  lstBaseline: number;
  area: number;
  treeCapacity: number;
  temperatureReduction: number;
  createdAt: Date;
  isUserDrawn: boolean;
}

export interface PredefinedZone {
  zone_id: string;
  priority: 'high' | 'medium' | 'low';
  ndvi: number;
  suggestion: string;
  area: number;
  existing_trees: number;
  soil_type: string;
  water_access: string;
}

export interface AnalysisResult {
  areaId: string;
  metrics: {
    area: number;
    treeCapacity: number;
    ndviChange: number;
    temperatureReduction: number;
  };
  recommendations: string[];
  species: string[];
  estimatedCost: number;
}

export interface SimulationData {
  month: number;
  ndviValue: number;
  coveragePercent: number;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
}