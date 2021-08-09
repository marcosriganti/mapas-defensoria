import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import { table } from "../../data/users";

// var admin = require("firebase-admin");
// var serviceAccount = require("../../defensoria-sf-firebase-adminsdk-v3wlf-d42999c6b7.json");

// const default_admin = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// const defaultAuth = default_admin.auth();

const UsersPage = () => {
  // useEffect(() => {
  //   console.log("trying to make  a query");

  // }, []);

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
          </div>
        </div>
        <div class="w-full overflow-hidden rounded-lg shadow-xs">
          USUARIOS lista
        </div>
      </div>
    </Layout>
  );
};
export default UsersPage;
