import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="container px-6 mx-auto grid">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Inicio
        </h2>

        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto  flex space-x-4">
            <div class="box-content h-36 w-36 overflow-hidden  ">
              <Link
                className=" border-4 p-4  overflow-hidden text-center justify-center items-center align-center h-full flex flex-col  w-full text-sm font-semibold transition-colors duration-150  hover:text-white hover:bg-purple-600 dark:hover:text-gray-200"
                to="/categories"
              >
                <svg
                  className="w-12 h-12 mx-auto"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <span className=" text-lg">Categorías</span>
              </Link>
            </div>
            <div class="box-content h-36 w-36 overflow-hidden  ">
              <Link
                className=" border-4 p-4  overflow-hidden text-center justify-center items-center align-center h-full flex flex-col  w-full text-sm font-semibold transition-colors duration-150  hover:text-white hover:bg-purple-600 dark:hover:text-gray-200"
                to="/points"
              >
                <svg
                  className="w-12 h-12 mx-auto"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <span className=" text-lg">Instituciones</span>
              </Link>
            </div>
            <div class="box-content h-36 w-36 overflow-hidden  ">
              <Link
                className=" border-4 p-4  overflow-hidden text-center justify-center items-center align-center h-full flex flex-col  w-full text-sm font-semibold transition-colors duration-150  hover:text-white hover:bg-purple-600 dark:hover:text-gray-200"
                to="/users"
              >
                <svg
                  className="w-12 h-12 mx-auto"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  stroke="currentColor"
                >
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
                </svg>
                <span className=" text-lg">Usuarios</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
