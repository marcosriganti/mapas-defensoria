import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import { table } from "../../data/points";

const PointsPage = () => {
  return (
    <Layout>
      <div class="container px-6 mx-auto grid">
        <div className="flex justify-between my-6">
          <h2 class=" text-2xl font-semibold text-gray-700 dark:text-gray-200">
            {table.label}
          </h2>
          <div className="space-x-2">
            <Link
              to={`/${table.collection}/new`}
              className="p-2 bg-red-500 inline rounded text-white text-sm"
            >
              Agregar
            </Link>
            <Link
              to={`/${table.collection}/import`}
              className="p-2 bg-green-500 inline rounded text-white text-sm"
            >
              Importar Archivo
            </Link>
          </div>
        </div>
        <div class="w-full overflow-hidden rounded-lg shadow-xs">
          <DataTable table={table}></DataTable>
        </div>
      </div>
    </Layout>
  );
};
export default PointsPage;
