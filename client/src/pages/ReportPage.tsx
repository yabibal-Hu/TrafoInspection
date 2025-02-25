import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { inspection, singleInspection } from "../pages/types";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

interface Transformer{
  transformer_name: string
}

export default function ReportPage() {
  const [inspectionData, setInspectionData] = useState<inspection[]>([]);
  const [transformers, setTransformers] = useState<Transformer[]>([]);
  const [transformerName, setTransformerName] = useState("all");
  const [inspectionDate, setInspectionDate] = useState("");
  const [oneTimeData, setOneTimeData] = useState<singleInspection[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTransformers = async () => {
      try {
        const response = await axios.get(`${VITE_API_URL}/api/transformers`);
        setTransformers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransformers();
  }, []);

  useEffect(() => {
    if (!inspectionDate) return; // Prevent API call if date is empty

    const fetchInspections = async () => {
      try {
        const endpoint =
          transformerName === "all"
            ? `${VITE_API_URL}/api/inspections/${inspectionDate}/date`
            : `${VITE_API_URL}/api/inspections/${inspectionDate}/transformer/${transformerName}`;
        const response = await axios.get(endpoint);
        setInspectionData(response.data);

        if (transformerName === "all") {
          const uniqueHoursData = response.data
            .map((inspection: inspection) => {
              if (inspection.inspection_date) {
                const formattedTime = formattedDate(inspection.inspection_date);
                const weather = inspection.weather;
                const temperature = inspection.temperature;

                return {
                  hours: formattedTime, // Now using formattedDate function
                  weather,
                  temperature,
                };
              }
              return null;
            })
            .filter(Boolean); // Remove null values

          // Remove duplicates from the extracted data
          const filteredUniqueHoursData = uniqueHoursData.filter(
            (item: singleInspection, index: number, self: singleInspection[]) =>
              index === self.findIndex((t) => t.hours === item.hours)
          );

          setOneTimeData(filteredUniqueHoursData);
        } else {
          setOneTimeData([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInspections();
  }, [transformerName, inspectionDate]);

 const formattedDate = (dateString: string) => {
   const date = new Date(dateString);
   const hours = date.getUTCHours().toString().padStart(2, "0");
   const minutes = date.getUTCMinutes().toString().padStart(2, "0");
   return `${hours}:${minutes}`;
 };


  const handlePrint = (contentId: string) => {
    // Create a new window for printing
    const printWindow = window.open("", "", "height=600,width=800");

    // Define the content to be printed (this could be the table or section you want)
    const content = document.getElementById(contentId)?.innerHTML;

    // Inject the content into the new window
    printWindow?.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            h1 { text-align: center; font-size: 20px; }
            .table-header { background-color: #f1f1f1; font-weight: bold; }
            button{
            display: none;
            }
            .printflex{
              display: flex;
              justify-content: space-around;
              align-items: center;
            }
          </style>
        </head>
        <body>
          <h1>Inspection Report</h1>
          <div>${content}</div>
        </body>
      </html>
    `);

    // Close the document to complete the content injection
    printWindow?.document.close();

    // Trigger the print dialog
    printWindow?.print();
  };
  return (
    <div className="p-4 w-full mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold text-center mb-4">
        {t("report.title")}
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="sm:w-1/2">
          <label className="font-semibold ml-4">
            {t("report.selectTrafo")}
          </label>
          <select
            value={transformerName}
            onChange={(e) => setTransformerName(e.target.value)}
            className="p-2 mt-1 border rounded-md w-full"
          >
            <option value="all">{t("report.all")}</option>
            {transformers.map((transformer) => (
              <option
                key={transformer.transformer_name}
                value={transformer.transformer_name}
              >
                {transformer.transformer_name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:w-1/2">
          <label className="font-semibold ml-4">{t("report.selectDate")}</label>
          <input
            type="date"
            value={inspectionDate}
            onChange={(e) => setInspectionDate(e.target.value)}
            className="p-2 mt-1 border rounded-md w-full"
          />
        </div>
      </div>

      <div className="mt-6">
        {inspectionData.length > 0 ? (
          <>
            {transformerName === "all" ? (
              <div>
                {oneTimeData.map((data) => (
                  <div
                    id={`content-to-print-${data.hours}`}
                    key={data.hours}
                    className="overflow-x-auto mt-10"
                  >
                    <div className="flex justify-around align-center printflex">
                      <p className="font-bold text-gray-500">
                        {t("report.date")}: {inspectionDate}
                      </p>
                      <p className="font-bold text-gray-500">
                        {t("report.hour")}: {data.hours}
                      </p>
                      <p className="font-bold text-gray-500">
                        {t("inspection.weather")}: {data.weather}
                      </p>
                      <p className="font-bold text-gray-500">
                        {t("inspection.temp")}: {data.temperature}&deg;C
                      </p>
                      {/* print this maped table  */}
                      <button
                        className="hidden sm:block"
                        onClick={() =>
                          handlePrint(`content-to-print-${data.hours}`)
                        }
                      >
                        <img
                          src="https://img.icons8.com/?size=100&id=123&format=png&color=000000"
                          alt="icon"
                          className="w-6 h-6"
                        />
                      </button>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-300 mt-2">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                            {t("report.trafoID")}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                            {t("inspection.transformerTemp")}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                            {t("inspection.LYT")}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                            {t("inspection.LGT")}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                            {t("inspection.LRT")}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                            {t("inspection.LBT")}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                            {t("inspection.RYT")}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                            {t("inspection.RGT")}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                            {t("inspection.RRT")}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                            {t("inspection.RBT")}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                            {t("inspection.LTUB")}
                          </th>
                          <th className="px-6 py-3 min-w-[300px] text-left text-xs font-medium text-gray-500 ">
                            {t("inspection.remark")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {inspectionData
                          .filter((inspection) => {
                            if (!inspection.inspection_date) return false; // Ensure the date exists

                            return (
                              formattedDate(inspection.inspection_date) ===
                              data.hours
                            );
                          })
                          .map((inspection) => (
                            <tr key={inspection.transformer_name}>
                              <td className="px-6 py-4">
                                {inspection.transformer_name}
                              </td>
                              <td className="px-6 py-4">
                                {inspection.transformer_temp}
                              </td>
                              <td className="px-6 py-4">
                                {inspection.left_yellow_line_temp}
                              </td>
                              <td className="px-6 py-4">
                                {inspection.left_green_line_temp}
                              </td>
                              <td className="px-6 py-4">
                                {inspection.left_red_line_temp}
                              </td>
                              <td className="px-6 py-4">
                                {inspection.left_blue_line_temp}
                              </td>
                              <td className="px-6 py-4">
                                {inspection.right_yellow_line_temp}
                              </td>
                              <td className="px-6 py-4">
                                {inspection.right_green_line_temp}
                              </td>
                              <td className="px-6 py-4">
                                {inspection.right_red_line_temp}
                              </td>
                              <td className="px-6 py-4">
                                {inspection.right_blue_line_temp}
                              </td>
                              <td className="px-6 py-4">
                                {inspection.line_temp_under_the_base}
                              </td>
                              <td className="px-6 py-4">
                                {inspection.comments}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto mb-4" id="inspectionTable">
                <div className="flex gap-8 justify-around align-center mx-8 printflex">
                  <p className="font-bold text-gray-500">
                    {t("report.trafoID")}: {transformerName}
                  </p>
                  <p className="font-bold text-gray-500">
                    {t("report.date")}: {inspectionDate}
                  </p>
                  <button
                    className="hidden sm:block"
                    onClick={() => handlePrint("inspectionTable")}
                  >
                    <img
                      src="https://img.icons8.com/?size=100&id=123&format=png&color=000000"
                      alt=""
                      className="h-6 sm:h-9"
                    />
                  </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300 mt-2">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                        {t("report.hour")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                        {t("inspection.weather")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                        {t("inspection.temp")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                        {t("inspection.transformerTemp")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                        {t("inspection.LYT")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                        {t("inspection.LGT")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                        {t("inspection.LRT")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                        {t("inspection.LBT")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                        {t("inspection.RYT")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                        {t("inspection.RGT")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                        Right LV Red Line Temperature
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                        {t("inspection.RBT")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                        {t("inspection.LTUB")}
                      </th>
                      <th className="px-6 py-3 text-left min-w-[300px] text-xs font-medium text-gray-500 ">
                        Remark
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inspectionData.map((inspection) => (
                      <tr key={inspection.transformer_name}>
                        <td className="px-6 py-4">
                          {formattedDate(inspection.inspection_date ?? "")}
                        </td>
                        <td className="px-6 py-4">{inspection.weather}</td>
                        <td className="px-6 py-4">
                          {inspection.temperature}&deg;C
                        </td>
                        <td className="px-6 py-4">
                          {inspection.transformer_temp}
                        </td>
                        <td className="px-6 py-4">
                          {inspection.left_yellow_line_temp}
                        </td>
                        <td className="px-6 py-4">
                          {inspection.left_green_line_temp}
                        </td>
                        <td className="px-6 py-4">
                          {inspection.left_red_line_temp}
                        </td>
                        <td className="px-6 py-4">
                          {inspection.left_blue_line_temp}
                        </td>
                        <td className="px-6 py-4">
                          {inspection.right_yellow_line_temp}
                        </td>
                        <td className="px-6 py-4">
                          {inspection.right_green_line_temp}
                        </td>
                        <td className="px-6 py-4">
                          {inspection.right_red_line_temp}
                        </td>
                        <td className="px-6 py-4">
                          {inspection.right_blue_line_temp}
                        </td>
                        <td className="px-6 py-4">
                          {inspection.line_temp_under_the_base}
                        </td>
                        <td className="px-6 py-4 w-[300px]">
                          {inspection.comments}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center">{t("report.noData")}.</p>
        )}
      </div>
    </div>
  );
}
