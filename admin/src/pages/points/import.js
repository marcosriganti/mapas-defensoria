import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import CSVReader from "react-csv-reader";
import { table } from "../../data/points";

const PointsPage = () => {
  const [fileContent, setFileContent] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  let history = useHistory();
  const handleForce = (data, fileInfo) => {
    setFileContent(data);
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_"),
  };

  const handleImport = async () => {
    if (submiting) return false;
    setSubmiting(true);
    axios
      .post(`https://defensoria-sf.web.app/api/v1/points`, {
        content: fileContent,
      })
      .then(res => {
        console.log(res);
        setSubmiting(false);
        history.replace(`/points`);
      });
  };

  return (
    <Layout>
      <div className="container px-6 mx-auto grid">
        <div className="flex justify-between my-6">
          <h2 className=" text-2xl font-semibold text-gray-700 dark:text-gray-200">
            {table.label}
          </h2>
          <div className="space-x-2">
            <Link
              to={`/${table.collection}`}
              className="p-2 bg-red-500 inline rounded text-white text-sm"
            >
              Atras
            </Link>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className=" dropzone border-dashed border-4 border-purple-500 my-10 p-10 text-center bg-purple-50 text-gray-600 font-medium">
            <CSVReader
              cssclassName="react-csv-input"
              label="Selecciona el archivo CSV"
              onFileLoaded={handleForce}
              parserOptions={papaparseOptions}
            />

            <p></p>
            <em>(Solo seran aceptados archivos .csv)</em>

            {/* <ul>{acceptedFileItems}</ul> */}
          </div>
          {/* {JSON.stringify(fileContent)} */}
          {fileContent && (
            <div className="overflow-auto	">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    {Object.keys(fileContent[0]).map((header, index) => {
                      return (
                        <th className="px-4 py-3" key={`td-${index}`}>
                          {header}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {fileContent.map((row, index) => {
                    return (
                      <tr
                        className="text-gray-700 dark:text-gray-400"
                        key={`tr-${index}`}
                      >
                        {Object.keys(fileContent[0]).map(key => {
                          return (
                            <td className="px-4 py-3 text-sm truncate max-w-sm	">
                              {row[key]}
                            </td>
                          );
                        })}

                        {/* {row.split(",").map((item) => {
                          return <td className="px-4 py-3 text-sm">{item}</td>;
                        })} */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <p className="py-4 text-right">
            <button
              className={`p-2 ${
                submiting ? `bg-gray-500` : `bg-purple-500`
              } inline rounded text-white text-sm`}
              onClick={handleImport}
            >
              {submiting ? `Importando...` : `Importar`}
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default PointsPage;
