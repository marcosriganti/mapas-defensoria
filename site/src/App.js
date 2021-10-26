import React, { useState, useEffect } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import axios from "axios";
import { osm, vector } from "./Source";
import { fromLonLat } from "ol/proj";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Controls, FullScreenControl } from "./Controls";
import Select from "react-select";
import { firebase_app } from "./firebase";
import cities from "./assets/cities.json";

import { setWithExpiry, getWithExpiry } from "./utils/localStorage";

// Icons

import facebook from "./assets/facebook.svg";
import twitter from "./assets/twitter.svg";
import instagram from "./assets/instagram.svg";
import youtube from "./assets/youtube.svg";
import website from "./assets/website.svg";

const URL_CATEGORIES = "https://defensoria-sf.web.app/api/v1/categories";
const URL_POINTS =
  "https://firebasestorage.googleapis.com/v0/b/defensoria-sf.appspot.com/o/storage-points.json?alt=media&token=8754a622-8381-4f20-81f6-de80db317502";
const selectCities = cities.map(item => {
  let newName = item.full_name.split("-");
  return {
    value: item.full_name,
    label: newName[0] + " - Depto. " + newName[1],
  };
});

const tags = [];
const updateTags = () => {
  const points = window.allPoints;
  const tagsFound = [];
  points.map(point => {
    if (point.tags && point.tags.length > 0) {
      point.tags.map(t => {
        if (!tagsFound.includes(t.text)) {
          tagsFound.push(t.text);
          tags.push({
            label: t.text,
            value: t.text,
          });
        }
      });
    }
  });
};
const getCategories = async () => {
  let cats = getWithExpiry("categories");
  if (!cats) {
    const res = await axios.get(URL_CATEGORIES);
    setWithExpiry("categories", res.data);
    cats = res.data;
  }
  return cats;
};
const getPoints = async () => {
  console.log("getting all points");
  if (!window.allPoints) {
    const res = await axios.get(URL_POINTS);
    window.allPoints = res.data;
  }
  return window.allPoints;
};

const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )} )`
    : null;
};
const getColorFromCategory = name => {
  let cats = getWithExpiry("categories");
  if (!cats) {
    return "#000000";
  }
  const category = Object.values(cats.categories).find(
    cat => cat.name === name
  );
  return hexToRgb(category && (category.color || "#000000"));
};
const getImageFromCategory = name => {
  const color = getColorFromCategory(name);
  let svg =
    '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="25" height="25">';
  svg += `<path  fill="${color}"  d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />`;

  svg += "</svg>";
  return svg;
};

function addMarkers(lonLatArray) {
  let features = lonLatArray.map((item, index) => {
    var iconStyle = new Style({
      image: new Icon({
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "data:image/svg+xml;utf8," + getImageFromCategory(item.category),
      }),
    });

    let feature = new Feature({
      id: item.id,
      geometry: new Point(fromLonLat(item.lonLat)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

const FullMap = ({ list, location, callback }) => {
  const [center, setCenter] = useState(location);
  const [zoom, setZoom] = useState(7);
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    if (list.length > 0) {
      setFeatures(addMarkers(list));
    }
    setCenter(location);
  }, [list, location]);
  const newLocation = fromLonLat(center);
  return (
    <Map center={newLocation} zoom={zoom} callback={callback}>
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

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState({});
  const [loading, setLoading] = useState(true);
  const [seaching, setSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [categories, setCategories] = useState([]);
  const [params, setParams] = useState({});
  const [location, setLocation] = useState([-60.1286333, -31.1672838]);
  const [featuresList, setFeaturesList] = useState([]);
  useEffect(() => {
    if (loading) {
      const getCats = async () => {
        const cats = await getCategories();
        await getPoints();
        updateTags();
        setCategories(
          Object.values(cats.categories).map(category => {
            return {
              label: category.name,
              value: category.name,
            };
          })
        );
        setLoading(false);
      };
      getCats();
      // load the points

      //
      setLoading(false);
    }
  }, []);

  const handleFeature = collection => {
    if (!collection || collection.length === 0) return;
    const feature = collection[0];
    const results = window.result;
    const point = results.find(item => item.id === feature.values_.id);
    if (point) {
      setSelectedFeature(point);
      setShowModal(true);
    }
  };
  const handleChange = (key, val) => {
    const newVal = val.map(item => item.value);
    setParams({
      ...params,
      [key]: newVal,
    });
    if (key === "city" && val) {
      //check the latitud and
      const item = cities.find(item => item.full_name === val);
      if (item) {
        if (item.lat && item.ltg && typeof item.lat === "string") {
          setLocation([
            parseFloat(item.ltg.replace(",", ".")),
            parseFloat(item.lat.replace(",", ".")),
          ]);
        }
      }
    }
  };
  const handleSubmit = ev => {
    console.log("running submit", params);
    ev.preventDefault();
    setSearching(true);
    let list = [];

    let result = window.allPoints;

    if (params.city && params.city.length > 0) {
      result = result.filter(point => params.city.includes(point.city));
    }
    if (params.category && params.category.length > 0) {
      result = result.filter(point => params.category.includes(point.category));
    }

    console.log("tags", params.tags);
    if (params.tags && params.tags.length > 0) {
      result = result.filter(
        point =>
          params.tags &&
          point.tags.find((tag, index) => {
            return params.tags.includes(tag.id);
          })
      );
    }

    setResult(result);
    setSearching(false);

    result.map(item => {
      if (item.latitud && item.longitude && typeof item.latitud === "string") {
        list.push({
          id: item.id,
          category: item.category,
          lonLat: [
            parseFloat(item.longitude.replace(",", ".")),
            parseFloat(item.latitud.replace(",", ".")),
          ],
        });
      }
    });
    setFeaturesList(list);
    window.result = result;
    return false;
  };
  const validForm = true;
  const selectCategories = categories;
  return (
    <div>
      <Header />
      <main className="py-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-3">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="rounded-md bg-gray-100 pt-4 mx-2 p-3">
                <h3 className="px-3 py-2  mb-2 font-bold text-gray-800 bg-gray-200 rounded-md">
                  Ubicación
                </h3>
                <Select
                  options={selectCities}
                  isMulti
                  placeholder="Todas las ciudades"
                  className="block text-sm my-2"
                  filterOption={(option, inputValue) => {
                    const q = inputValue.toLowerCase();
                    const base = option.value.toLowerCase().split("-")[0];
                    return base.indexOf(q) > -1;
                  }}
                  onChange={value => handleChange("city", value)}
                />
                <h3 className="px-3 py-2 mb-2 font-bold text-gray-800 bg-gray-200 rounded-md">
                  Categoría
                </h3>
                {selectCategories.length > 0 && (
                  <Select
                    options={selectCategories}
                    isMulti
                    placeholder="Todas las categorías"
                    className="block text-sm my-2"
                    onChange={value => handleChange("category", value)}
                  />
                )}
                <h3 className="px-3 py-2  mb-2 font-bold text-gray-800 bg-gray-200 rounded-md">
                  Etiquetas
                </h3>
                <Select
                  options={tags}
                  isMulti
                  placeholder=""
                  className="block text-sm my-2"
                  onChange={value => handleChange("tags", value)}
                />

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

                <button
                  type="button"
                  onClick={ev => {
                    ev.preventDefault();
                    setParams({});
                  }}
                  className={`px-4 mt-2 py-2  font-semibold text-center text-white   block w-full rounded-md 
                     ${
                       Object.keys(params).length > 0
                         ? `bg-red-500 hover:bg-red-400`
                         : `bg-gray-400`
                     }
                  `}
                >
                  Borrar Filtros
                </button>
                {result !== null && (
                  <p className="text-gray-800 text-sm mt-2 text-center">{`Se ha/n encontrado ${result.length} resultado/s`}</p>
                )}
              </div>
            </form>
            <div className="md:col-span-3 px-3">
              <div id="mapa-santa-fe" className="w-full">
                {!loading && (
                  <FullMap
                    list={featuresList}
                    location={location}
                    callback={handleFeature}
                  ></FullMap>
                )}
              </div>
              {result && result.length > 0 && (
                <div>
                  <h2 className="text-green-600 text-2xl font-bold my-3">
                    {`${result.length} Resultados`}
                  </h2>
                  <div className="space-y-3">
                    {result.map(item => {
                      return (
                        <div
                          className="shadow-lg bg-white rounded-xl p-5 space-y-3"
                          id={`result_${item.id}`}
                          key={`result_${item.id}`}
                        >
                          <ShowItem
                            item={item}
                            onList
                            key={`item-${item.id}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <div
        className={`flex fixed justify-center top-0 bottom-0 left-0 right-0 items-center	bg-green-200 bg-opacity-50 ${
          !showModal && `hidden`
        }`}
      >
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <ShowItem item={selectedFeature} />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const ShowItem = ({ item, onList }) => {
  const [showDescription, setShowDescription] = useState(onList ? false : true);
  return (
    <>
      <header>
        <h2 className="text-green-500 text-xl font-bold">{item.name}</h2>
        <h3 className="text-base text-gray-500">
          <span
            style={{ color: getColorFromCategory(item.category) }}
            className="font-bold"
          >
            {item.category}
          </span>{" "}
          | {item.subcategory}
        </h3>
      </header>
      {onList ? (
        <div className="text-sm text-gray-800 overflow-auto  pb-2">
          {showDescription ? (
            <div className="mb-2 inline-block">
              <p>{item.description}</p>
              <p>{item.extended_description}</p>
            </div>
          ) : (
            <div className="mb-2 inline-block">
              <p>{item.description.substr(0, 140)}...</p>
            </div>
          )}
          <button
            className="  font-semibold text-center text-green-400   inline   text-sm"
            onClick={() => setShowDescription(!showDescription)}
          >
            {!showDescription ? `Ver Mas` : `Ver Menos`}
          </button>
        </div>
      ) : (
        <div className="text-sm text-gray-800 overflow-auto h-48 pb-2">
          <p>{item.description}</p>
          <p>{item.extended_description}</p>
        </div>
      )}

      <div>
        <h4 className="text-sm  text-green-500 font-bold ">Direccion</h4>
        <div className="text-sm text-gray-800">
          {[item.address, item.city].join(", ")}
          {(item.email || item.phone) && (
            <div>
              <h4 className="text-sm  text-green-500 font-bold my-1">
                Contacto
              </h4>{" "}
              <p>
                {item.phone}
                {item.email &&
                  item.email.split(";").map(el => (
                    <>
                      &nbsp; | &nbsp;
                      <a
                        href={`mailto:${el.trim()}`}
                        className="text-sm  text-green-500"
                      >
                        {el.trim()}
                      </a>
                    </>
                  ))}
              </p>
              {(item.facebook ||
                item.instagram ||
                item.twitter ||
                item.web ||
                item.youtube) && (
                <div>
                  <h4 className="text-sm  text-green-500 font-bold my-1">
                    Redes Sociales
                  </h4>
                  <p>
                    {item.web && (
                      <a
                        href={item.web}
                        className="flex space-x-1 items-center"
                      >
                        <img
                          src={website}
                          className="w-4 inline text-green-500"
                          alt="Website"
                        />
                        <span className="inline text-green-500">
                          {item.web}
                        </span>
                      </a>
                    )}

                    {item.facebook && (
                      <a
                        href={item.facebook}
                        className="flex space-x-1 items-center"
                      >
                        <img
                          src={facebook}
                          className="w-4 inline text-green-500"
                          alt="Facebook"
                        />
                        <span className="inline text-green-500">
                          {item.facebook}
                        </span>
                      </a>
                    )}
                    {item.instagram && (
                      <a
                        href={item.instagram}
                        className="flex space-x-1 items-center"
                      >
                        <img
                          src={instagram}
                          className="w-4 inline text-green-500"
                          alt="Instagram"
                        />
                        <span className="inline text-green-500">
                          {item.instagram}
                        </span>
                      </a>
                    )}
                    {item.youtube && (
                      <a
                        href={item.youtube}
                        className="flex space-x-1 items-center"
                      >
                        <img
                          src={youtube}
                          className="w-4 inline text-green-500"
                          alt="Youtube"
                        />
                        <span className="inline text-green-500">
                          {item.youtube}
                        </span>
                      </a>
                    )}
                    {item.twitter && (
                      <a
                        href={item.twitter}
                        className="flex space-x-1 items-center"
                      >
                        <img
                          src={twitter}
                          className="w-4 inline text-green-500"
                          alt="Twitter"
                        />
                        <span className="inline text-green-500">
                          {item.twitter}
                        </span>
                      </a>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default App;
