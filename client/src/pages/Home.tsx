// MainPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTransformerModal from "../components/AddTransformerModal";
import InspectionModal from "../components/InspectionModal";
import TransformerList from "../components/TransformerItem";
import { useTranslation } from "react-i18next";

const apiUrl = import.meta.env.VITE_API_URL;
const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;
const Home: React.FC = () => {
  const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState("");
  const [transformers, setTransformers] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInspectModalOpen, setIsInspectModalOpen] = useState(false);
  const [selectedTransformer, setSelectedTransformer] = useState<any | null>(
    null
  );
  const { t } = useTranslation();

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await axios.get(`${WEATHER_API_URL}`);
        if (response.status === 200) {
          setWeather(response.data.weather[0].main);
          setTemperature((response.data.main.temp - 273.15).toFixed(2));
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    getWeatherData();
    fetchTransformers();
  }, []);

  const fetchTransformers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/transformers`);
      setTransformers(response.data);
    } catch (error) {
      console.error("Error fetching transformers:", error);
    }
  };

  const handleInspect = (transformer: any) => {
    setSelectedTransformer(transformer);
    setIsInspectModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6 mb-8 bg-white ">
      <h1 className="text-2xl font-bold mb-4 text-center">{t("home.title")}</h1>
      <TransformerList transformers={transformers} onInspect={handleInspect} />
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-[#405470] hover:bg-[#1F2937] text-white font-bold py-2 px-4 rounded ml-auto mt-4"
      >
        {t("home.add")}
      </button>
      <AddTransformerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdded={fetchTransformers}
        apiUrl={apiUrl}
      />
      <InspectionModal
        isOpen={isInspectModalOpen}
        onClose={() => setIsInspectModalOpen(false)}
        transformer={selectedTransformer}
        onInspected={fetchTransformers}
        apiUrl={apiUrl}
        temperature={temperature}
        weather={weather}
      />
    </div>
  );
};

export default Home;

