import React, { useState } from "react";
import axios from "axios";

interface AddTransformerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
  apiUrl: string;
}

const AddTransformerModal: React.FC<AddTransformerModalProps> = ({
  isOpen,
  onClose,
  onAdded,
  apiUrl,
}) => {
  const [transformerName, setTransformerName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/transformer`, {
        transformer_name: transformerName,
      });
      setTransformerName("");
      onAdded();
      onClose();
    } catch (error) {
      console.error("Error adding transformer:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-500 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg p-6 relative z-10">
        <h2 className="text-lg font-semibold mb-4">Add Transformer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="transformer_name"
              className="block text-sm font-medium text-gray-700"
            >
              Transformer ID
            </label>
            <input
              type="text"
              id="transformer_name"
              name="transformer_name"
              value={transformerName}
              onChange={(e) => setTransformerName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#b14848] hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#254579] hover:bg-[#1F2937] text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransformerModal;
