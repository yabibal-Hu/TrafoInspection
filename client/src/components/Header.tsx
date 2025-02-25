import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Header() {
  const { logout } = useUser();
  const [lang, setLang] = useState(false);
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

  return (
    <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800 sticky w-full z-20 top-0">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl ">
        <Link to="" className="flex items-center mx-auto">
          <img
            src="https://img.icons8.com/?size=100&id=l0ST8DGrKQfu&format=png&color=ffffff"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            {t("header.title")}
          </span>
        </Link>
        <div className="flex items-center lg:order-2 mx-auto">
          <Link
            to="/report"
            className=" text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800"
          >
            {t("header.report")}
          </Link>
          <button
            onClick={() => setLange()}
            className="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800"
          >
            <img
              src="https://img.icons8.com/?size=100&id=12455&format=png&color=ffffff"
              alt=""
              className="w-8 h-8 ml-1"
            />
          </button>
          <button
            onClick={logout}
            className="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800"
          >
            {t("header.logout")}
          </button>
        </div>
        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <p className="mr-6 text-sm font-medium text-gray-200">
            {t("header.description")}
          </p>
        </div>
      </div>
    </nav>
  );
}
