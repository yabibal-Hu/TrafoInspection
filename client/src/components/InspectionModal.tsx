import React, {  useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useUser } from "../contexts/UserContext";
import {inspection} from "../pages/types"
import { FaSpinner } from "react-icons/fa";



interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transformer: any;
  onInspected: () => void;
  apiUrl: string;
  temperature: string;
  weather: string
}


const InspectionModal: React.FC<InspectionModalProps> = ({
  isOpen,
  onClose,
  transformer,
  onInspected,
  apiUrl,
  temperature,
  weather
}) => {
const [formdata, setFormData] = useState<inspection>({});
const [loading, setLoading] = useState(false);
 
  const { t } = useTranslation();
  const {username} = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formdata, 
      transformer_name: transformer.transformer_name, 
      username: username, 
      comments: formdata.comments || null,
      weather: weather, 
      temperature: temperature, 
    };

    try {
      await axios.post(
        `${apiUrl}/api/inspection`,
        payload
      );

      await axios.put(
        `${apiUrl}/api/transformer/${transformer.transformer_id}`,
        {
          last_inspection_date: formdata.inspection_date, 
        }
      );

      onInspected();
      setFormData({});
      onClose();
    } catch (error) {
      console.error("Error submitting inspection:", error);
      alert(
        "unstable connection, please check your connection and try again"
      );
    }finally {
      setLoading(false);
    }
  };

  if (!isOpen || !transformer) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-500 opacity-50"
        onClick={onClose}
        // onClick={() => {
        //   onClose();
        //   setFormData({});
        // }}
      ></div>
      <div className="bg-white rounded-lg p-6 relative z-10 w-11/12 max-w-lg  ">
        <h2 className="text-lg text-center font-semibold mb-4 rounded bg-gray-200">
          {t("inspection.transformer")}
          {"  "}
          {transformer.transformer_name}
          <br />
          <span className="text-sm text-gray-500 flex justify-between mx-4">
            <span>
              {t("inspection.weather")}: {weather}
            </span>
            <span>
              {" "}
              {t("inspection.temp")}: {temperature}&deg;C
            </span>
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-4 mb-2">
            {/* inspection_date */}
            <div>
              <label
                htmlFor="inspection_date"
                className="block text-sm font-medium text-gray-700"
              >
                {t("inspection.inspectionDate")}
              </label>
              <input
                type="datetime-local"
                id="inspection_date"
                name="inspection_date"
                value={formdata.inspection_date}
                // min={new Date().toISOString().slice(0, 16)}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    inspection_date: e.target.value, // This will handle the 24-hour format correctly
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="transformer_temp"
                className="block text-sm font-medium text-gray-700"
              >
                {t("inspection.transformerTemp")}
              </label>
              <input
                type="number"
                id="transformer_temp"
                name="transformer_temp"
                value={formdata.transformer_temp}
                onChange={(e) =>
                  setFormData({ ...formdata, transformer_temp: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="left_yellow_line_temp"
                className="block text-sm font-medium text-gray-700"
              >
                {t("inspection.LYT")}
              </label>
              <input
                type="number"
                id="left_yellow_line_temp"
                name="left_yellow_line_temp"
                value={formdata.left_yellow_line_temp}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    left_yellow_line_temp: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="left_green_line_temp"
                className="block text-sm font-medium text-gray-700"
              >
                {t("inspection.LGT")}
              </label>
              <input
                type="number"
                id="left_green_line_temp"
                name="left_green_line_temp"
                value={formdata.left_green_line_temp}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    left_green_line_temp: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="left_red_line_temp"
                className="block text-sm font-medium text-gray-700"
              >
                {t("inspection.LRT")}
              </label>
              <input
                type="number"
                id="left_red_line_temp"
                name="left_red_line_temp"
                value={formdata.left_red_line_temp}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    left_red_line_temp: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="left_blue_line_temp"
                className="block text-sm font-medium text-gray-700"
              >
                {t("inspection.LBT")}
              </label>
              <input
                type="number"
                id="left_blue_line_temp"
                name="left_blue_line_temp"
                value={formdata.left_blue_line_temp}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    left_blue_line_temp: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="right_yellow_line_temp"
                className="block text-sm font-medium text-gray-700"
              >
                {t("inspection.RYT")}
              </label>
              <input
                type="number"
                id="right_yellow_line_temp"
                name="right_yellow_line_temp"
                value={formdata.right_yellow_line_temp}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    right_yellow_line_temp: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="right_green_line_temp"
                className="block text-sm font-medium text-gray-700"
              >
                {t("inspection.RGT")}
              </label>
              <input
                type="number"
                id="right_green_line_temp"
                name="right_green_line_temp"
                value={formdata.right_green_line_temp}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    right_green_line_temp: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="right_red_line_temp"
                className="block text-sm font-medium text-gray-700"
              >
                {t("inspection.RRT")}
              </label>
              <input
                type="number"
                id="right_red_line_temp"
                name="right_red_line_temp"
                value={formdata.right_red_line_temp}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    right_red_line_temp: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="right_blue_line_temp"
                className="block text-sm font-medium text-gray-700"
              >
                {t("inspection.RBT")}
              </label>
              <input
                type="number"
                id="right_blue_line_temp"
                name="right_blue_line_temp"
                value={formdata.right_blue_line_temp}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    right_blue_line_temp: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="line_temp_under_the_base"
                className="block text-sm font-medium text-gray-700"
              >
                {t("inspection.LTUB")}
              </label>
              <input
                type="number"
                id="line_temp_under_the_base"
                name="line_temp_under_the_base"
                value={formdata.line_temp_under_the_base}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    line_temp_under_the_base: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="comments"
                className="block text-sm font-medium text-gray-700"
              >
                {t("inspection.remark")}
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formdata.comments}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    comments: e.target.value,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              // onClick={() => {
              //   onClose();
              //   setFormData({});
              // }}
              className="bg-[#973e2e] hover:bg-[#973e2e] text-white font-bold py-2 px-4 rounded"
            >
              {t("inspection.cancel")}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#376ab3] hover:bg-[#376ab3] text-white font-bold py-2 px-4 rounded min-w-[90px]"
            >
              {loading ? (
                <FaSpinner className="animate-spin mx-auto" />
              ) : (
                t("inspection.submit")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InspectionModal;
