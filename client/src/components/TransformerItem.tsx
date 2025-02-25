import React from "react";
import { useTranslation } from "react-i18next";

interface TransformerItemProps {
  transformers: any[];
  onInspect: (transformer: any) => void;
}

const TransformerList: React.FC<TransformerItemProps> = ({
  transformers,
  onInspect,
}) => {
  const { t } = useTranslation();

  // // Function to format date with 12-hour format
  // const formattedDate = (date: string) =>
  //   date ? new Date(date).toLocaleString() : "No inspection date";

  // Function to format date with 24hour
  const formattedDate = (date: string) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {transformers?.map((transformer) => (
        <button
          onClick={() => onInspect(transformer)}
          className="bg-white rounded-lg shadow-md p-4"
        >
          <h2 className="text-lg font-semibold">
            {t("inspection.transformer")}
            {"  "}
            {transformer.transformer_name}
            <br />
            <span className="text-sm text-gray-500">
              {t("transformer.LastInspection")}:{" "}
              {formattedDate(transformer.last_inspection_date)}
            </span>
          </h2>
        </button>
      ))}
    </div>
  );
};

export default TransformerList;
