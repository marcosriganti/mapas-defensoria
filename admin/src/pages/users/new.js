import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import Form from "../../components/Form";

import { table } from "../../data/users";

const UsersAddPage = () => {
  let history = useHistory();
  const onSubmit = async (values) => {
    // Call the API
    // const newRef = firebase_app.firestore().collection(table.collection).doc();
    // await newRef.set(values);
    //
    axios
      .post(`https://defensoria-sf.web.app/api/v1/users`, { values })
      .then((res) => {
        console.log(res);
        history.replace(`/${table.collection}`);
      });
  };
  return (
    <Layout>
      <div className="container px-6 mx-auto grid">
        <div className="flex justify-between my-6">
          <h2 className=" text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Agregar {table.label}
          </h2>
          <Link
            to={`/${table.collection}`}
            className="p-2 bg-red-500 inline rounded text-white text-sm"
          >
            Atras
          </Link>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <Form fields={table.fields} onSubmit={onSubmit}></Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default UsersAddPage;
