import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { firebase_app } from "../firebase";

const table = {
  collection: "categories",
  fields: [
    {
      name: "id",
      label: "id",
      hidden: true,
    },
    {
      name: "name",
      label: "Nombre",
    },
  ],
};

const CategoriesPage = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    firebase_app
      .firestore()
      .collection(table.collection)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setItems([
            ...items,
            {
              id: doc.id,
              ...doc.data(),
            },
          ]);
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  return (
    <Layout>
      <div class="container px-6 mx-auto grid">
        <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Categorías
        </h2>
        <div class="w-full overflow-hidden rounded-lg shadow-xs">
          <div class="w-full overflow-x-auto">
            {loading ? (
              <svg
                class="animate-spin mx-auto my-4 h-5 w-5 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <table class="w-full whitespace-no-wrap">
                <thead>
                  <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    {table.fields.map((field) => {
                      if (!field.hidden) {
                        return <th class="px-4 py-3">{field.label}</th>;
                      }
                    })}
                  </tr>
                </thead>
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {items.map((item) => {
                    return (
                      <tr class="text-gray-700 dark:text-gray-400">
                        {table.fields.map((field) => {
                          if (!field.hidden) {
                            return (
                              <td class="px-4 py-3 text-sm">
                                {item[field.name]}
                              </td>
                            );
                          }
                        })}

                        <td class="px-4 py-3 text-sm">Editar - Eliminar</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          {/* <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span class="flex items-center col-span-3">
              Showing 21-30 of 100
            </span>
            <span class="col-span-2"></span>
            <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul class="inline-flex items-center">
                  <li>
                    <button
                      class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                  <li>
                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      1
                    </button>
                  </li>
                  <li>
                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      2
                    </button>
                  </li>
                  <li>
                    <button class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                      3
                    </button>
                  </li>
                  <li>
                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      4
                    </button>
                  </li>
                  <li>
                    <span class="px-3 py-1">...</span>
                  </li>
                  <li>
                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      8
                    </button>
                  </li>
                  <li>
                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      9
                    </button>
                  </li>
                  <li>
                    <button
                      class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
                    >
                      <svg
                        class="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};
export default CategoriesPage;
