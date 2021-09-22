import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import CSVReader from "react-csv-reader";
// import { useDropzone } from "react-dropzone";
import { firebase_app } from "../../firebase";
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
    const test = {
      name: "Defensoría del Pueblo - Sede Rosario",
      description:
        "La Defensoría del Pueblo es un organismo descentralizado, unipersonal e independiente. Su principal objetivo consiste en proteger los derechos e intereses de los individuos y de la comunidad frente a los actos, hechos y omisiones de la Administración Pública Provincial y sus agentes. El Defensor del Pueblo ejerce su jurisdicción sobre todo el territorio provincial y tiene competencia para proceder sobre  la Administración pública centralizada (Gobernación, ministerios, secretarías y subsecretarías del Poder Ejecutivo), la Administración pública descentralizada (entes autárquicos como Iapos, Túnel Subfluvial, Lotería de Santa Fe, empresas del Estado y concesionadas) y Sociedades con participación estatal y personas jurídicas en ejercicio de funciones públicas (colegios de profesionales). Actúa no sólo ante la queja presentada por un/a  ciudadano/a o grupo de personas y/o instituciones sino también puede hacerlo de oficio cuando advierte alguna anormalidad, por vía de la Ley 10.000 de Intereses Difusos o, inclusive, a petición de los diputados y senadores. La Defensoría del Pueblo cuenta con oficinas de atención en todos los departamentos del territorio provincial. Las mismas funcionan como mesa de entradas y boca de recepción de reclamos para la posterior intervención del Defensor del Pueblo. ",
      extended_description: null,
      address: "Pasaje Alvarez 1516",
      email: "inforos@defensoriasantafe.gob.ar",
      instagram: null,
      facebook: null,
      linkedin: null,
      twitter: null,
      youtube: null,
      phone: " +54 9 341 4721112/13",
      latitud: "-32,9447375235831",
      longitude: "-60,6439204315305",
      city: "Rosario - Rosario",
      web: null,
      subcategory: "Sede",
      category: "Defensoría del Pueblo",
    };
    const newRef = firebase_app.firestore().collection(table.collection).doc();
    const res = await newRef.set(test);
    console.log("adding test to", table.collection, res);

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
