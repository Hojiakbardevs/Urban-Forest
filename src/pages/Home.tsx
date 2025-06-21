import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TreePine,
  Calculator,
  TrendingUp,
  Users,
  Leaf,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import TeamSection from "../components/team/TeamSection";

const Home: React.FC = () => {
  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Interaktiv xarita",
      description:
        "Hududlarni chizing va ekish zonalarini aniq xarita vositalari bilan ko‘ring.",
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Aqlli tahlil",
      description:
        "Daraxt sig‘imi, ekologik ta’sir va xarajatlarni tez hisoblang.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "O‘sish simulyatsiyasi",
      description:
        "Ekkan hududlaringiz 12 oy davomida qanday o‘zgarishini ko‘ring.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Jamiyatga ta’sir",
      description:
        "Urban o‘rmonchilikning ekologik va ijtimoiy foydasini tushuning.",
    },
  ];

  const stats = [
    {
      value: "18,500+",
      label: "Ekilgan daraxtlar (2023-2024)",
      icon: <TreePine className="w-6 h-6" />,
    },
    {
      value: "1,200+",
      label: "Tahlil qilingan maydon (ga)",
      icon: <Leaf className="w-6 h-6" />,
    },
    {
      value: "44.6°C",
      label: "Eng yuqori aniqlangan harorat",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      value: "2.8°C",
      label: "O‘rtacha sovitish ta’siri",
      icon: <Calculator className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-green-100 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2322c55e%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Ekologik
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  {" "}
                  Vizual{" "}
                </span>
                Tahlil Platformasi
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Loyiha Toshkent shahrining urban ekotizimini ilmiy asosda
                raqamli xaritalar orqali namoyish etadi. Sun’iy yo‘ldosh
                tasvirlari va issiqlik xaritalari asosida harorat va tuproq
                sharoiti tahlil qilinib,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  {" "}
                  “issiq zonalar”{" "}
                </span>
                uchun joylashuvga mos daraxt ekish bo‘yicha aniq tavsiyalar
                yaratiladi. Natijada foydalanuvchilar shaharni ekologik
                barqarorlik sari yo‘naltiruvchi aqlli qarorlar qabul qilish
                imkoniyatiga ega bo‘ladi.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/area"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 group">
                  <span>Tahlil jarayonini ishga tushiring</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/simulation"
                  className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 transition-colors flex items-center justify-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Sinov jarayonini kuzating</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                    <TreePine className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Ayni damda rejalashtirilgan hudud
                  </h3>
                  <p className="text-gray-600">
                    41.31°N, 69.25°E <br />
                    bu hududizni bilasizmi?{" "}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center text-green-600 mb-2">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rejalashtiring va kuchaytiring
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bizning keng zamonaviy platformamiz shahar va o‘rmonchilik loyihalarini
              rejalashtirish, tahlil qilish va vizualizatsiya qilish uchun zarur
              bo‘lgan barcha funksiyalarni taqdim etadi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow group">
                <div className="text-green-600 mb-4 group-hover:scale-110 transition-transform  m-auto w-max">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your City?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join the movement towards sustainable urban development. Start
              planning your green spaces today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/area"
                className="bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>Start Planning</span>
              </Link>

              <Link
                to="/contact"
                className="bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold border-2 border-white transition-colors flex items-center justify-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Get in Touch</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
