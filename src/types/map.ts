export interface LayerConfig {
  heatmapVisible: boolean;
  plantingZonesVisible: boolean;
  heatmapOpacity: number;
  basemap: 'street' | 'satellite' | 'hybrid' | 'terrain';
}

export interface PlantingZone {
  id: string;
  area: number;
  reduction: number;
  trees: number;
  coordinates: [number, number][];
}

export interface TemperatureData {
  lat: number;
  lng: number;
  temperature: number;
  ndvi?: number;
  recommendations?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}