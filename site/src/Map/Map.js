import React, { useRef, useState, useEffect } from "react";
import { fromLonLat } from "ol/proj";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";

const Map = ({ children, zoom, center, callback }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  // on component mount
  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };

    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    mapObject.on("click", ev => {
      const features = mapObject.getFeaturesAtPixel(ev.pixel);
      ev.preventDefault();
      if (features.length === 0) {
        return false;
      } else {
        callback && callback(features);
        return false;
      }
    });
    return () => {
      return mapObject.setTarget(undefined);
    };
  }, []);

  // zoom change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setZoom(zoom);
  }, [zoom]);

  // center change handler
  useEffect(() => {
    if (!map) return;
    const base = fromLonLat([-60.1286333, -31.1672838]);
    if (JSON.stringify(center) !== JSON.stringify(base)) {
      map.getView().setCenter(center);
    }
  }, [center]);
  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
