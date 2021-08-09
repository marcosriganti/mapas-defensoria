import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import { Table } from "../../components/DataTable";
import { table } from "../../data/users";

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get(`https://defensoria-sf.web.app/api/v1/users`).then((res) => {
      const users = res.data;
      setItems(users);
      setLoading(false);
    });
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
