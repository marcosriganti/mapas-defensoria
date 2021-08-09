import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { Table } from "../../components/DataTable";
import { table } from "../../data/users";

// var admin = require("firebase-admin");
// var serviceAccount = require("../../defensoria-sf-firebase-adminsdk-v3wlf-d42999c6b7.json");

// const default_admin = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// const defaultAuth = default_admin.auth();

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  useEffect(() => {
    console.log("trying to make  a query");

    axios.get(`https://defensoria-sf.web.app/api/v1/users`).then((res) => {
      console.log(res);
      const users = res.data;
      setItems(users);
      setLoading(false);
    });

    // fetch(US)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .then(
    //     (result) => {
    //       console.log(result);
    //       // this.setState({
    //       //   isLoaded: true,
    //       //   items: result.items,
    //       // });
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       console.log(error);
    //       setLoading(false);
    //       // this.setState({
    //       //   isLoaded: true,
    //       //   error,
    //       // });
    //     }
    //   );
  }, []);

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
          {/*  Table  */}
          {!loading && (
            <Table loading={loading} items={items} table={table}></Table>
          )}
          {/* Table End */}
        </div>
      </div>
    </Layout>
  );
};
export default UsersPage;
