import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useDropzone } from "react-dropzone";

import { table } from "../../data/points";

const PointsPage = () => {
  const [fileContent, setFileContent] = useState(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "text/csv",
    maxFiles: 1,
    onDrop: async ([file]) => {
      var reader = new FileReader();
      reader.onload = function (e) {
        var contents = e.target.result;
        setFileContent(contents.split(/\r\n|\n/));
      };
      reader.readAsText(file);
    },
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path} className="font-bold my-4">
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <Layout>
      <div class="container px-6 mx-auto grid">
        <div className="flex justify-between my-6">
          <h2 class=" text-2xl font-semibold text-gray-700 dark:text-gray-200">
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
        <div class="w-full overflow-hidden rounded-lg shadow-xs">
          <div
            {...getRootProps({ className: "dropzone" })}
            className="border-dashed border-4 border-purple-500 my-10 p-10 text-center bg-purple-50 text-gray-600 font-medium"
          >
            <input {...getInputProps()} />
            <p>Arrastra un archivo aqui o haz click y selecciona el archivo.</p>
            <em>(Solo seran aceptados archivos .csv)</em>

            <ul>{acceptedFileItems}</ul>
          </div>
          {fileContent && (
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  {fileContent[0].split(",").map((header, index) => {
                    return (
                      <th className="px-4 py-3" key={`td-${index}`}>
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {fileContent.slice(1).map((row, index) => {
                  return (
                    <tr
                      className="text-gray-700 dark:text-gray-400"
                      key={`tr-${index}`}
                    >
                      {row.split(",").map((item) => {
                        return <td className="px-4 py-3 text-sm">{item}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <p className="py-4 text-right">
            <button className="p-2 bg-purple-500 inline rounded text-white text-sm">
              Importar
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default PointsPage;
