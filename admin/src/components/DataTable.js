import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { types } from "../components/Form";
import { firebase_app } from "../firebase";

export const Table = ({ table, items, loading, onDelete }) => {
  return (
    <div className="w-full  shadow">
      {loading ? (
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
      ) : (
        <table className="w-full whitespace-no-wrap rounded-lg overflow-hidden">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              {table.fields.map(field => {
                if (field.onTable) {
                  return <th className="px-4 py-3">{field.label}</th>;
                }
                return null;
              })}
              <th className="px-4 py-3 w-40 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {items.length > 0 ? (
              items.map(item => {
                return (
                  <tr
                    className="text-gray-700 dark:text-gray-400"
                    key={`td-${item.uid || item.id}`}
                  >
                    {table.fields.map(field => {
                      if (field.onTable) {
                        return (
                          <td className="px-4 py-3 text-sm">
                            {typeof item[field.name] == "string" &&
                              item[field.name]}
                            {field.type === "tag" &&
                              item[field.name] &&
                              item[field.name].map(el => (
                                <span className="block-inline bg-purple-400 px-2 py-1 text-xs text-white mx-1">
                                  {el.id}
                                </span>
                              ))}
                            {/* {item[field.name]} */}
                          </td>
                        );
                      }
                      return null;
                    })}

                    <td className="px-4 py-3 text-sm text-right">
                      <div className="flex items-center space-x-4 text-sm">
                        <Link
                          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                          aria-label="Edit"
                          to={`/${table.collection}/edit/${
                            item.uid || item.id
                          }`}
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                          </svg>
                        </Link>
                        {onDelete && (
                          <button
                            onClick={() => {
                              onDelete(item.uid || item.id);
                            }}
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                            aria-label="Delete"
                          >
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={table.fields.length}>
                  <div className=" text-sm p-2 text-center">
                    No hay documentos para mostrar aqui
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
export const DataTable = ({ table, onDelete, filterElements }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [last, setLast] = useState(null);
  const [previous, setPrevious] = useState(null);
  const limit = 15;

  const getData = async action => {
    const newArray = [];
    let query = firebase_app
      .firestore()
      .collection(table.collection)
      .limit(limit);
    if (last && action === "next") {
      query = query.startAfter(last);
    }
    if (previous && action === "prev") {
      query = query.endAt(last);
    }
    if (Object.keys(values).length > 0) {
      for (const key in values) {
        if(typeof values[key] === "object" && values[key].value.length) {
          query = query.where(key, "==", values[key].value);
        } else  if(values[key] && values[key].length > 0) {
          query = query.where(key, "==", values[key]);
          
        }
      }
    }
    const querySnapshot = await query.get();
    querySnapshot.forEach(doc => {
      newArray.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setItems(newArray);
    setLast(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setPrevious(querySnapshot.docs[0]);
  };

  useEffect(() => {
    if (loading) {
      getData();
      setLoading(false);
    }
  }, [loading]);

  const [values, setValues] = useState({});
  const handleChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };
  const handleSearch = ev => {
    ev.preventDefault();
    getData();
  };
  return (
    <>
      {filterElements && (
        <form
          className="shadow mb-3 bg-white p-3 rounded-lg"
          onSubmit={handleSearch}
        >
          <h1 className="text-lg font-semibold text-gray-700">Buscar</h1>
          <div className="flex flex-row space-x-2 items-end">
            {filterElements.map(field => {
              const Element = types[field.type];
              return (
                <div
                  className="block mt-4 text-sm w-1/4"
                  key={`field-${field.name}`}
                >
                  <Element
                    field={field}
                    handleChange={handleChange}
                    values={values}
                  ></Element>
                </div>
              );
            })}
            <button
              className="py-3  px-4 bg-blue-500 inline rounded text-white text-sm mb-1"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      )}

      <Table
        table={table}
        loading={loading}
        items={items}
        onDelete={onDelete}
      />
      <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span className="flex items-center col-span-3">
          {/* Showing 21-30 of 100 */}
        </span>
        <span className="col-span-2"></span>
        <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul className="inline-flex items-center">
              <li>
                <button
                  className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple flex align-center"
                  aria-label="Previous"
                  onClick={() => getData("prev")}
                >
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  Anterior
                </button>
              </li>
              {!(items.length < limit) && (
                <li>
                  <button
                    className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple flex align-center"
                    aria-label="Next"
                    onClick={() => getData("next")}
                  >
                    Siguiente
                    <svg
                      className="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </span>
      </div>
    </>
  );
};
