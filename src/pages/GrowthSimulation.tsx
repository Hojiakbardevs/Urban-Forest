import React, { useState, useEffect } from "react";
import { Download, Info } from "lucide-react";
import { motion } from "framer-motion";
import MapContainer from "../components/map/MapContainer";
import TimelineSlider from "../components/simulation/TimelineSlider";
import { useZoneData } from "../hooks/useZoneData";
import toast from "react-hot-toast";

const GrowthSimulation: React.FC = () => {
  const { zones, loading, error } = useZoneData();
  const [currentMonth, setCurrentMonth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animatsiya boshqaruvi
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAnimating) {
      interval = setInterval(() => {
        setCurrentMonth((prev) => (prev + 1) % 12);
      }, 800);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnimating]);

  const handleToggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setCurrentMonth(0);
  };

  const handleExportForecast = () => {
    toast.error("Eksport funksiyasi tez orada ishga tushadi!", {
      icon: "🚧",
      duration: 3000,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            Simulyatsiya maʼlumotlari yuklanmoqda...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center">
          <div className="text-red-600 mb-4">⚠️</div>
          <p className="text-red-600">
            Maʼlumotlarni yuklashda xatolik: {error}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Yon panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-96 bg-white shadow-lg overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              O‘sish simulyatsiyasi
            </h1>
            <p className="text-gray-600">
              12 oy davomida vegetatsiya o‘sishini vizuallashtiring
            </p>
          </div>

          {/* Vaqt boshqaruvi */}
          <div className="p-6 border-b border-gray-200">
            <TimelineSlider
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
              isAnimating={isAnimating}
              onToggleAnimation={handleToggleAnimation}
              onReset={handleReset}
            />
          </div>

          {/* Simulyatsiya statistikasi */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">
              Simulyatsiya sharhi
            </h3>

            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-900">
                    Faol zonalar
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    {zones.length}
                  </span>
                </div>
                <div className="text-xs text-green-700">
                  Simulyatsiya qilinayotgan jami hududlar
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">
                    Jami daraxtlar
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {zones
                      .reduce((sum, zone) => sum + zone.treeCapacity, 0)
                      .toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-blue-700">
                  Prognoz qilingan daraxt sig‘imi
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-900">
                    Qamrov maydoni
                  </span>
                  <span className="text-lg font-bold text-purple-600">
                    {(
                      zones.reduce((sum, zone) => sum + zone.area, 0) / 1000
                    ).toFixed(1)}{" "}
                    ga
                  </span>
                </div>
                <div className="text-xs text-purple-700">
                  Simulyatsiya qilinayotgan jami maydon
                </div>
              </div>
            </div>
          </motion.div>

          {/* Legenda */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">
              Simulyatsiya legendasi
            </h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-200 border-2 border-green-600 rounded"></div>
                <span className="text-sm text-gray-700">
                  Past o‘sish (0-30%)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-400 border-2 border-green-600 rounded"></div>
                <span className="text-sm text-gray-700">
                  O‘rtacha o‘sish (30-70%)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-600 border-2 border-green-800 rounded"></div>
                <span className="text-sm text-gray-700">
                  Yuqori o‘sish (70-100%)
                </span>
              </div>
            </div>
          </motion.div>

          {/* Eksport boshqaruvi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6">
            <button
              onClick={handleExportForecast}
              disabled={true}
              className="w-full bg-gray-300 text-gray-500 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 cursor-not-allowed">
              <Download className="w-4 h-4" />
              <span>Prognozni yuklab olish (Tez orada)</span>
            </button>

            <div className="mt-4 bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">
                    Simulyatsiya eslatmalari
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• O‘sish sur’ati fasl va turga qarab farq qiladi</li>
                    <li>
                      • Vizualizatsiya prognoz qilingan qoplamani ko‘rsatadi
                    </li>
                    <li>• NDVI qiymatlari daraxt zichligiga asoslangan</li>
                    <li>
                      • Turli oylarni ko‘rish uchun vaqt chizig‘idan foydalaning
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Asosiy kontent - xarita */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1">
          <MapContainer
            zones={zones}
            simulationMode={true}
            currentMonth={currentMonth}
            className="h-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default GrowthSimulation;
