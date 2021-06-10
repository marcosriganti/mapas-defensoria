import React from "react";
import Layout from "../components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div class="container px-6 mx-auto grid">
        <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Inicio
        </h2>

        <div class="w-full overflow-hidden rounded-lg shadow-xs">
          <div class="w-full overflow-x-auto">
            <p>Contenido del inicio </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
