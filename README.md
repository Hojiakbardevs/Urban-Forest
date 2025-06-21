# Urban Forest Visualizer

An interactive web application for analyzing and visualizing urban tree planting initiatives in Tashkent, Uzbekistan.

## 🌳 Features

### Core Functionality
- **Interactive Mapping**: Leaflet-based map with drawing tools for area selection
- **Multi-layer Support**: OpenStreetMap, Satellite, and Hybrid base layers
- **Area Analysis**: Real-time calculations for tree capacity, NDVI predictions, and environmental impact
- **Growth Simulation**: 12-month timeline visualization of vegetation development
- **Zone Management**: Support for both user-drawn and predefined planting zones

### Pages
- **Home** (`/`): Hero section with project overview and navigation
- **Area Analysis** (`/area`): Interactive map with drawing tools and zone analysis
- **Growth Simulation** (`/simulation`): Timeline-based vegetation growth visualization
- **Contact** (`/contact`): Contact form with embedded Google Maps

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd urban-forest-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── analysis/
│   │   ├── AreaMetrics.tsx          # Zone metrics and statistics
│   │   └── ZoneRecommendation.tsx   # Detailed planting recommendations
│   ├── layout/
│   │   ├── Navigation.tsx           # Main navigation bar
│   │   └── Footer.tsx               # Site footer
│   ├── map/
│   │   └── MapContainer.tsx         # Main map component with Leaflet
│   └── simulation/
│       └── TimelineSlider.tsx       # 12-month growth timeline
├── hooks/
│   └── useZoneData.ts               # Custom hook for zone data management
├── pages/
│   ├── Home.tsx                     # Landing page
│   ├── AreaAnalysis.tsx             # Map-based area analysis
│   ├── GrowthSimulation.tsx         # Vegetation growth simulation
│   └── Contact.tsx                  # Contact form and information
├── types/
│   └── index.ts                     # TypeScript type definitions
└── App.tsx                          # Main application component
```

## 🗺️ Map Features

### Base Layers
- **OpenStreetMap**: Default street map with labels
- **Satellite**: High-resolution satellite imagery
- **Hybrid**: Satellite imagery with street labels overlay

### Drawing Tools
- **Polygon Tool**: Draw custom planting areas
- **Edit Mode**: Modify existing polygons
- **Delete Mode**: Remove unwanted areas

### Zone Types
- **User-Drawn Zones**: Custom areas created by users
- **Predefined Zones**: Pre-loaded from `public/planting_zones.geojson`

## 📊 Analysis Calculations

### Tree Capacity
- **Formula**: `Area (m²) / 25 = Tree Count`
- **Assumption**: Optimal spacing of 1 tree per 25 square meters

### NDVI Prediction
- **Baseline**: Current vegetation index (0.1-0.25)
- **Projected**: Estimated improvement after tree planting
- **Seasonal**: Monthly variations based on growth patterns

### Temperature Reduction
- **Calculation**: Based on tree density and canopy coverage
- **Range**: 1-5°C potential cooling effect
- **Factors**: Tree species, maturity, and local climate

## 🎯 Data Interfaces

### PlantingZone
```typescript
interface PlantingZone {
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
```

### AnalysisResult
```typescript
interface AnalysisResult {
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
```

## 🎨 Styling & Design

### Design System
- **Framework**: Tailwind CSS
- **Color Palette**: Green and blue gradients for environmental theme
- **Typography**: Clean, modern fonts with proper hierarchy
- **Components**: Glassmorphism effects with subtle transparency

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation**: Collapsible mobile menu with smooth animations

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Map Configuration
```typescript
// Map center coordinates (Tashkent)
const CENTER: [number, number] = [41.31, 69.25];
const DEFAULT_ZOOM = 12;
const MIN_ZOOM = 10;
const MAX_ZOOM = 18;
```

### Mock Data
Predefined zones are loaded from `public/planting_zones.geojson`:
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "zone_id": "TAS-001",
        "priority": "high",
        "ndvi": 0.12,
        "suggestion": "Plant large canopy trees..."
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [...]
      }
    }
  ]
}
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Accessibility Testing
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support

## 📈 Performance

### Optimization Targets
- **Initial Load**: < 3 seconds
- **Map Interactions**: 60fps
- **Analysis Calculations**: < 500ms
- **Simulation Rendering**: < 1 second

### Techniques
- Code splitting with React.lazy()
- Image optimization and lazy loading
- Efficient state management
- Memoized calculations with useMemo/useCallback

## 🌍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or support, please contact:
- Email: info@urbanforest.uz
- Location: Tashkent, Uzbekistan (41.31°N, 69.25°E)

---

Built with ❤️ for a greener Tashkent