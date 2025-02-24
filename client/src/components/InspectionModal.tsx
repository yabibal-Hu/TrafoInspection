import React, { useEffect, useState } from "react";
import axios from "axios";

const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transformer: any;
  onInspected: () => void;
  apiUrl: string;
}

const InspectionModal: React.FC<InspectionModalProps> = ({
  isOpen,
  onClose,
  transformer,
  onInspected,
  apiUrl,
}) => {
//  const WEATHER_API_URL="https://api.openweathermap.org/data/2.5/weather?lat=8.5875&lon=39.3092&appid=51743fb050a75b5aac2a83eeb0dc0ad2"
  const username = "yabu";
  const [formdata, setFormData] = useState({});
  const [weather , setWeather] = useState("");
  const [temperature , setTemperature] = useState("");

  console.log("weather", weather, temperature);
  
  // Call getWeatherData on component mount
  useEffect(() => {
   const getWeatherData = async () => {
     try {
       const response = await axios.get(`${WEATHER_API_URL}`);
       if (response.status === 200) {
         setWeather(response.data.weather[0].main);
         // convert to celsius and set to state
         setTemperature((response.data.main.temp - 273.15).toFixed(2));
       }
     } catch (error) {
       console.error("Error fetching weather data:", error);
     }
   };
   getWeatherData();
   
  }, []);
 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   

   const payload = {
     ...formdata,
     transformer_name: transformer.transformer_name, // Assuming transformer has an 'id' field
     username: username,
     comments: (formdata as any).comments || null,
     weather: weather,
     temperature: temperature
   };
   console.log("payload", payload);
   try {
     await axios.post(`${apiUrl}/api/inspection`, payload);
     onInspected(); // Notify parent component about successful inspection
     setFormData({});
     onClose(); // Close the modal
   } catch (error) {
     console.error("Error submitting inspection:", error);
   }
 };


  if (!isOpen || !transformer) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-500 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg p-6 relative z-10 w-11/12 max-w-lg  ">
        <h2 className="text-lg text-center font-semibold mb-4 rounded bg-gray-200">
          {transformer.transformer_name}
          <br />
          <span className="text-sm text-gray-500 flex justify-between mx-4">

          <span >Weather: {weather}</span>
          <span > Temp: {temperature}&deg;C</span>
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
                Inspection Date
              </label>
              <input
                type="datetime-local"
                id="inspection_date"
                name="inspection_date"
                value={formdata.inspection_date}
                min={new Date().toISOString().slice(0, 16)}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    inspection_date: e.target.value,
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
                Transformer Temperature
              </label>
              <input
                type="text"
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
                Left LV Yellow Line Temperature
              </label>
              <input
                type="text"
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
                Left LV Green Line Temperature
              </label>
              <input
                type="text"
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
                Left LV Red Line Temperature
              </label>
              <input
                type="text"
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
                Left LV Blue Line Temperature
              </label>
              <input
                type="text"
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
                Right LV Yellow Line Temperature
              </label>
              <input
                type="text"
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
                Right LV Green Line Temperature
              </label>
              <input
                type="text"
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
                Right LV Red Line Temperature
              </label>
              <input
                type="text"
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
                Right LV Blue Line Temperature
              </label>
              <input
                type="text"
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
                Line Temperature Under the Base
              </label>
              <input
                type="text"
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
                Remarks
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
              className="bg-[#973e2e] hover:bg-[#973e2e] text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#376ab3] hover:bg-[#376ab3] text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InspectionModal;
