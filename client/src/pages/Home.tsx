// MainPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTransformerModal from "../components/AddTransformerModal";
import InspectionModal from "../components/InspectionModal";
import TransformerList from "../components/TransformerItem";
// import TransformerList from "./TransformerList";
// import AddTransformerModal from "./AddTransformerModal";
// import InspectionModal from "./InspectionModal";

const apiUrl = import.meta.env.VITE_API_URL;
const Home: React.FC = () => {
  const [transformers, setTransformers] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInspectModalOpen, setIsInspectModalOpen] = useState(false);
  const [selectedTransformer, setSelectedTransformer] = useState<any | null>(
    null
  );

  useEffect(() => {
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
    <div className="container mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Transformer Management</h1>
      <TransformerList transformers={transformers} onInspect={handleInspect} />
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-[#405470] hover:bg-[#1F2937] text-white font-bold py-2 px-4 rounded ml-auto mt-4"
      >
        Add Transformer
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
      />
    </div>
  );
};

export default Home;

