import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../contexts/UserContext";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Auth() {
  const [localUsername, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("mnhbbtnv");
  const { setUsername, setRole } = useUser();
  const [lang, setLang] = useState(true);
  const { t, i18n } = useTranslation();

  const setLange = () => {
    setLang(!lang);
    changeLanguage();
  };

  const changeLanguage = () => {
    const selectedLang = lang ? "en" : "ch";
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("language", selectedLang);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.get(`${apiUrl}/api/user/login`, {
        params: {
          username: localUsername,
          password_hashed: password,
        },
      });
      if (response.status === 200) {
        setUsername(response.data.username);
        setRole(response.data.role);
        // window.location.href = "/"; // Redirect to home
      }
    } catch (error) {
      setError("Invalid username or password");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="w-full max-w-md p-6 m-6 rounded-lg shadow-md bg-gray-800 relative">
        {/* Logo Section */}
        <div className="flex flex-row items-center gap-2 justify-center mb-6">
          <img
            src="https://img.icons8.com/?size=100&id=l0ST8DGrKQfu&format=png&color=ffffff"
            alt="transformer logo"
            className="h-10 mb-2"
          />
          <span className="text-xl font-semibold text-white">
            {t("header.title")}
          </span>
          <button
            onClick={() => setLange()}
            className="absolute top-1 right-1 sm:p-4 p-2 hover:bg-gray-700 rounded-full"
          >
            <img
              src="https://img.icons8.com/?size=100&id=12455&format=png&color=ffffff"
              alt=""
              className="w-8 h-8"
            />
          </button>
        </div>

        {/* Sign-In Form */}
        <h1 className="text-xl font-bold md:text-2xl text-white text-center">
          {t("login.title")}
        </h1>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
        <p className="text-red-500 text-center text-sm">{error}</p>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-white"
            >
              {t("login.username")}
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={localUsername}
              onChange={(e) => {
                setLocalUsername(e.target.value);
                setError("");
              }}
              className="w-full p-2.5 border rounded-lg bg-gray-700 border-gray-600 text-white"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              {t("login.password")}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="••••••••"
              className="w-full p-2.5 border rounded-lg bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          {/* Sign-In Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-fit px-5 py-2.5 text-white bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all"
            >
              {t("login.button")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
