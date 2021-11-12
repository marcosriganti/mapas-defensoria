import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { DataTable } from "../../components/DataTable";
import { table } from "../../data/categories";
import { firebase_app } from "../../firebase";

const CategoriesPage = () => {
  const onDelete = async uid => {
    if (window.confirm("Seguro quiere eliminar la categoria?")) {
      await firebase_app
        .firestore()
        .collection(table.collection)
        .doc(uid)
        .delete();
      window.location.reload();
    }
  };
  return (
    <Layout>
      <div className="container px-6 mx-auto grid">
        <div className="flex justify-between my-6">
          <h2 className=" text-2xl font-semibold text-gray-700 dark:text-gray-200">
            {table.label}
          </h2>
          <Link
            to={`/${table.collection}/new`}
            className="p-2 bg-red-500 inline rounded text-white text-sm"
          >
            Agregar
          </Link>
        </div>
        <div className="w-full">
          <DataTable table={table} onDelete={onDelete}></DataTable>
        </div>
      </div>
    </Layout>
  );
};
export default CategoriesPage;
