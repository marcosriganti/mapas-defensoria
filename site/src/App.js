import React, { useState, useEffect } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import axios from "axios";
import { osm, vector } from "./Source";
import { fromLonLat, get } from "ol/proj";

import { Controls, FullScreenControl } from "./Controls";

import logo from "./assets/images/logo.svg";
import { firebase_app } from "./firebase";
import mapConfig from "./config.json";

import { setWithExpiry, getWithExpiry } from "./utils/localStorage";
import { TypeCategories, TypeCities } from "./components/formElements";
import headerImg from "./assets/images/header.png";

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map(item => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}
const FullMap = ({ list }) => {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(7);
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    if (list.length > 0) {
      setFeatures(addMarkers(list));
    }
  }, [list]);

  return (
    <Map center={fromLonLat(center)} zoom={zoom}>
      <Layers>
        <TileLayer source={osm()} zIndex={0} />
        {features.length > 0 && <VectorLayer source={vector({ features })} />}
      </Layers>
      <Controls>
        <FullScreenControl />
      </Controls>
    </Map>
  );
};

const getCategories = async () => {
  let cats = getWithExpiry("categories");
  if (!cats) {
    const res = await axios.get(
      `https://defensoria-sf.web.app/api/v1/categories`
    );
    setWithExpiry("categories", res.data);
    cats = res.data;
  }
  return cats;
};
const getSubcategories = async parent => {
  const cats = await getCategories();
  const categories = Object.values(cats.categories);
  const children = categories.filter(item => item.name === parent);
  if (children.length) {
    return children[0].children;
  }
  return [];
};

function App() {
  const [loading, setLoading] = useState(true);
  const [seaching, setSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [categories, setCategories] = useState([]);
  const [params, setParams] = useState({});
  const [subcategories, setSubcategories] = useState([]);
  let list = [];
  const [featuresList, setFeaturesList] = useState([]);

  useEffect(() => {
    if (loading) {
      const getCats = async () => {
        const cats = await getCategories();
        setCategories(Object.values(cats.categories));
        setLoading(false);
      };
      getCats();

      setLoading(false);
      // setFeaturesList([]);
    }
  }, []);
  const handleChange = (key, val) => {
    setParams({
      ...params,
      [key]: val,
    });
    if (key === "category") {
      getSubcategories(val).then(res => {
        setSubcategories(res);
      });
    }
  };
  const handleSubmit = ev => {
    ev.preventDefault();
    console.log("Enviando", params);
    setSearching(true);
    let list = [];
    if (!params.city || !params.category) return false;

    const query = firebase_app
      .firestore()
      .collection("points")
      .where("city", "==", params.city)
      .where("category", "==", params.category)
      .limit(10)
      .get();

    query.then(querySnapshot => {
      const points = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResult(points);
      setSearching(false);
      points.map(item => {
        if (
          item.latitud &&
          item.longitude &&
          typeof item.latitud === "string"
        ) {
          list.push([
            parseFloat(item.longitude.replace(",", ".")),
            parseFloat(item.latitud.replace(",", ".")),
          ]);
        }
      });
      console.log("found points", points);
      setFeaturesList(list);
    });
    return false;
    firebase_app
      .firestore()
      .collection("points")
      .limit(10)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const item = {
            id: doc.id,
            ...doc.data(),
          };
          if (
            item.latitud &&
            item.longitude &&
            typeof item.latitud === "string"
          ) {
            list.push([
              parseFloat(item.longitude.replace(",", ".")),
              parseFloat(item.latitud.replace(",", ".")),
            ]);
          } else {
            console.log("wrong data", doc.id, item.latitud, item.longitude);
          }
        });
        // setItems(newArray);

        // console.log(newArray);
        setLoading(false);
        setFeaturesList(list);
        // setFeatures(addMarkers(featuresList));
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });

    return false;
  };
  const validForm = params.city && params.category;
  return (
    <div>
      <header
        style={{ borderColor: "#afc75d" }}
        className="border-b-4 pt-12  py-4 bg-white"
      >
        <div>
          <img src={headerImg} className="absolute top-0 w-full" />
        </div>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4">
            <div>
              <img
                src={logo}
                alt="Defensor&iacute;a de ni&ntilde;as, ni&ntilde;os y adolescentes"
              />
            </div>
            <div>
              <h1 className="text-2xl">Georeferencia Servicios Locales</h1>
            </div>
          </div>
        </div>
      </header>
      <main className="py-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-3">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="rounded-md bg-gray-100 pt-4 mx  -2 overflow-hidden p-3">
                <h3 className="px-3 py-2  mb-2 font-bold text-gray-800 bg-gray-200 rounded-md">
                  Ubicación
                </h3>
                <TypeCities
                  values={params}
                  field={{ name: "city", label: "Ciudad" }}
                  handleChange={handleChange}
                />
                <h3 className="px-3 py-2 mb-2 font-bold text-gray-800 bg-gray-200 rounded-md">
                  Categoría
                </h3>
                <TypeCategories
                  values={params}
                  field={{ name: "category", label: "Principal" }}
                  source={categories}
                  handleChange={handleChange}
                />
                <TypeCategories
                  values={params}
                  field={{ name: "subcategory", label: "Secundaria" }}
                  source={subcategories}
                  handleChange={handleChange}
                />

                <h3 className="px-3 py-2  mb-2 font-bold text-gray-800 bg-gray-200 rounded-md">
                  Etiquetas
                </h3>
                <button
                  disabled={!validForm}
                  type="submit"
                  className={`px-4 py-2  font-semibold text-center text-white   block w-full rounded-md ${
                    validForm
                      ? `bg-green-400 hover:bg-green-300`
                      : `bg-gray-400`
                  }`}
                >
                  {seaching ? "Buscando..." : "Buscar"}
                </button>
                {result !== null && (
                  <p className="text-gray-800 text-sm mt-2 text-center">{`Se ha/n encontrado ${result.length} resultado/s`}</p>
                )}
              </div>
            </form>
            <div className="md:col-span-3 px-3">
              <div
                id="mapa-santa-fe"
                className="w-full"
                // style={{ height: 500 }}
              >
                {!loading && <FullMap list={featuresList}></FullMap>}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer
        className=" bg-white py-16 border-t-4"
        style={{ borderColor: "#afc75d" }}
      >
        <div className="container space-y-5 px-6">
          <div className="grid text-gray-800 text-sm md:grid-cols-2">
            <div>
              <h3 className="font-bold text-xl">ROSARIO</h3>
              <p>Tucumán 1681 - CP 2000 - Rosario</p>
              <p>
                Teléfonos: Lunes a viernes de 8.00 a 18.00 (0341) 156-914345
              </p>
              <p>info@defensorianna.gob.ar</p>
            </div>
            <div>
              <h3 className="font-bold text-xl">SANTA FE</h3>
              <p>Eva Perón 2726 - CP 3000 - Santa Fe</p>
              <p>
                Teléfonos: Lunes a viernes de 8.00 a 18.00 (0342) 154-494569
              </p>
              <p>info@defensorianna.gob.ar</p>
            </div>
          </div>
          <div className="grid text-gray-800 text-sm md:grid-cols-3 border-t  pt-5">
            <div>
              <h3 className="font-bold text-xl">RAFAELA</h3>
              <p>Brown 73</p>
              <p>Teléfonos: (03492) 45-3101</p>
              <p>defensorrafaela@gmail.com</p>
            </div>
            <div>
              <h3 className="font-bold text-xl">RECONQUISTA</h3>
              <p>Patricio Diez 985</p>
              <p>Teléfonos: (03482) 43-8849</p>
              <p>reconquista@defensorsantafe.gov.ar</p>
            </div>
            <div>
              <h3 className="font-bold text-xl">VENADO TUERTO</h3>
              <p>9 de julio 1040</p>
              <p>Teléfonos: (03462) 40-8868</p>
              <p>venadotuerto@defensorsantafe.gov.ar</p>
            </div>
          </div>
        </div>
        <div
          className=" bg-white mt-10 pt-10 border-t-4"
          style={{ borderColor: "#afc75d" }}
        >
          <div className="container px-6">
            <div className="sponsors flex flex-row justify-center">
              <a
                href="https://www.defensoriasantafe.gob.ar/ "
                target="_blank"
                className="flex-1"
                rel="noreferrer"
                title="Defensoría del pueblo"
              >
                <img
                  src="https://www.defensorianna.gob.ar/modules/skin/full/img/logo-defensoria-del-pueblo.png"
                  className="img-responsive"
                />
              </a>
              <a
                href="https://www.unicef.org/argentina/ "
                target="_blank"
                className="flex-1"
                rel="noreferrer"
                title="Unicef"
              >
                <img
                  src="https://www.defensorianna.gob.ar/modules/skin/full/img/logo-unicef.png"
                  className="img-responsive"
                />
              </a>
              <a
                href="http://www.defensorianna.gob.ar/observatorio/que-es-y-como-funciona-2740"
                target="_blank"
                className="flex-1"
                rel="noreferrer"
                title="Observatorio"
              >
                <img
                  src="https://www.defensorianna.gob.ar/modules/skin/full/img/logo-observatorio.png"
                  className="img-responsive"
                />
              </a>
              <a
                href="http://www.portalfio.org/red-ninez-adolescencia/"
                target="_blank"
                className="flex-1"
                rel="noreferrer"
                title="Red de Niñez"
              >
                <img
                  src="https://www.defensorianna.gob.ar/modules/skin/full/img/logo-red-ninez-adolescencia.png"
                  className="img-responsive"
                />
              </a>
              <a
                href="http://www.adpra.org.ar/"
                target="_blank"
                title="ADPRA"
                rel="noreferrer"
              >
                <img
                  src="https://www.defensorianna.gob.ar/modules/skin/full/img/logo-adpra.png"
                  className="img-responsive"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
