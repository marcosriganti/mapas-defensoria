import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { Form } from "../../components/Form";
import { firebase_app } from "../../firebase";
import { table } from "../../data/points";

const PointsEditPage = () => {
  let history = useHistory();
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase_app
      .firestore()
      .collection(table.collection)
      .doc(id)
      .get()
      .then(doc => {
        // doc.data() is never undefined for query doc snapshots
        setLoading(false);
        let data = doc.data();
        data.city = {
          value: data.city,
          label: data.city,
        }
        setData(data);
      });
  }, [id]);
  const onSubmit = async values => {
    const newRef = firebase_app
      .firestore()
      .collection(table.collection)
      .doc(id);
    await newRef.set({
      ...values,
      city: values.city && values.city.value ? values.city.value : values.city ,
      updatedAt: new Date(),
    });
    history.replace(`/${table.collection}`);
  };

  return (
    <Layout>
      <div className="container px-6 mx-auto grid">
        <div className="flex justify-between my-6">
          <h2 className=" text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Editar {table.label} - ID: {id}
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
            {!loading && data ? (
              <Form
                fields={table.fields}
                initialValues={data}
                onSubmit={onSubmit}
              ></Form>
            ) : (
              <svg
                className="animate-spin mx-auto my-4 h-5 w-5 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default PointsEditPage;
