import { Link } from 'react-router-dom';
import { useUser } from "../contexts/UserContext";

export default function Header() {
  const { logout } = useUser();
  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 sticky w-full z-20 top-0">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl ">
        <Link to="" className="flex items-center mx-auto">
          <img
            src="https://img.icons8.com/?size=100&id=l0ST8DGrKQfu&format=png&color=ffffff"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Transformer Inspection
          </span>
        </Link>
        <div className="flex items-center lg:order-2 mx-auto">
          <Link
            to="/report"
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Report
          </Link>
          <Link
            to="#"
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            {/* <p className=" text-white bg-primary-700 hover:bg-primary-800  font-medium rounded-lg text-sm  dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                Language
              </p> */}

            <img
              src="https://img.icons8.com/?size=100&id=12455&format=png&color=ffffff"
              alt=""
              className="w-8 h-8 ml-1"
            />
          </Link>
          <button
            onClick={logout}
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Log out
          </button>
        </div>
        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <p className="mr-6 text-sm font-medium text-gray-500 dark:text-gray-400">
            easily register inspection value and get report
          </p>
        </div>
      </div>
    </nav>
  );
}
