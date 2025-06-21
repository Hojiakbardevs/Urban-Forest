import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock data for Tashkent region
const generateMockTemperature = (lat, lng) => {
  // Simulate temperature variation based on location
  const baseTemp = 28;
  const variation = Math.sin(lat * 100) * Math.cos(lng * 100) * 10;
  return Math.max(15, Math.min(45, baseTemp + variation));
};

const generateMockNDVI = (lat, lng) => {
  // Simulate vegetation index
  return Math.max(0, Math.min(1, Math.random() * 0.8));
};

// API endpoints
app.get("/api/temperature", (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({
      success: false,
      error: "Latitude and longitude are required",
    });
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);

  const temperature = generateMockTemperature(latitude, longitude);
  const ndvi = generateMockNDVI(latitude, longitude);

  res.json({
    success: true,
    data: {
      lat: latitude,
      lng: longitude,
      temperature: Math.round(temperature * 10) / 10,
      ndvi: Math.round(ndvi * 100) / 100,
      timestamp: new Date().toISOString(),
    },
  });
});

app.get("/api/planting-zones", (req, res) => {
  // Generate mock planting zones around Tashkent
  const center = { lat: 41.2995, lng: 69.2401 };
  const zones = [];

  for (let i = 0; i < 25; i++) {
    const lat = center.lat + (Math.random() - 0.5) * 0.1;
    const lng = center.lng + (Math.random() - 0.5) * 0.1;
    const area = Math.round(500 + Math.random() * 3000);
    const trees = Math.round(area / 120);
    const reduction = Math.round((Math.random() * 3 + 1) * 10) / 10;

    zones.push({
      id: `zone-${i + 1}`,
      coordinates: [
        [lat - 0.002, lng - 0.002],
        [lat - 0.002, lng + 0.002],
        [lat + 0.002, lng + 0.002],
        [lat + 0.002, lng - 0.002],
      ],
      area,
      trees,
      reduction,
      priority: Math.random() > 0.5 ? "high" : "medium",
    });
  }

  res.json({
    success: true,
    data: zones,
  });
});

app.get("/api/recommendations", (req, res) => {
  const { lat, lng, temperature } = req.query;

  const temp = parseFloat(temperature) || 30;
  let recommendations = [];

  if (temp > 35) {
    recommendations = [
      "Katta soyali daraxtlar ekish (Platanus orientalis, Populus nigra)",
      "Jamoat joylariga soyabon konstruksiyalar o‘rnatish",
      "Yorug‘ rangli yo‘l qoplamalaridan foydalanish",
      "Havoning aylanishi uchun yashil yo‘laklar yaratish",
      "Piyodalar hududida tuman purkagich tizimlarini o‘rnatish",
    ];
  } else if (temp > 30) {
    recommendations = [
      "O‘rtacha o‘lchamdagi soyali daraxtlar ekish (Acer platanoides, Tilia cordata)",
      "Yashil tom qoplamalarini kengaytirish",
      "Avtoturargoh joylariga o‘simliklar qo‘shish",
      "Zich joylarda kichik bog‘lar (pocket park) tashkil etish",
    ];
  } else if (temp > 25) {
    recommendations = [
      "Aralash mahalliy o‘simliklarni ekish",
      "Mavjud daraxt soyasini saqlab qolish",
      "Estetik ko‘rinish uchun manzarali o‘simliklar qo‘shish",
      "Suvni o‘tkazadigan yo‘l qoplamasini ko‘rib chiqish",
    ];
  } else {
    recommendations = [
      "Mavjud vegetatsiya darajasini saqlab qolish",
      "Biologik xilma-xillikni oshirishga e’tibor qaratish",
      "Changlatuvchilar uchun gullaydigan o‘simliklar ekish",
    ];
  }

  res.json({
    success: true,
    data: {
      recommendations,
      urgency: temp > 35 ? "high" : temp > 30 ? "medium" : "low",
      estimatedCooling: temp > 35 ? "3-5°C" : temp > 30 ? "2-4°C" : "1-2°C",
    },
  });
});

app.get("/api/stats", (req, res) => {
  res.json({
    success: true,
    data: {
      averageTemperature: 28.5,
      totalPlantingZones: 142,
      recommendedTrees: 1847,
      potentialCooling: 3.2,
      lastUpdated: new Date().toISOString(),
    },
  });
});

app.listen(PORT, () => {
  console.log(`HeatMap AI API server yuqlanish jarayonida kuting.... ${PORT}`);
});
