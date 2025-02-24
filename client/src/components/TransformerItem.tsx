import React from "react";

interface TransformerItemProps {
  transformers: any;
  onInspect: (transformer: any) => void;
}

const TransformerList: React.FC<TransformerItemProps> = ({
  transformers,
  onInspect,
}) => {
  const formattedDate = (date: string) =>
    date ? new Date(date).toLocaleString() : "No inspection date";

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    
    {transformers?.map((transformer) => (
     <button
     onClick={() => onInspect(transformer)}
     className="bg-white rounded-lg shadow-md p-4"
     >
      <h2 className="text-lg font-semibold">
        {transformer.transformer_name}
        <br />
        <span className="text-sm text-gray-500">
          Last Inspection: {formattedDate(transformer.last_inspection_date)}
        </span>
      </h2>
    </button>
   ))}
   </div>
  );
};

export default TransformerList;
