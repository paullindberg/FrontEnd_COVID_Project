import React from "react";
import Helmet from "react-helmet";
import L from "leaflet";
import current from "./current.json";

import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";

const LOCATION = {
  lat: 37.0902,
  lng: -95.7129,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 4;

const IndexPage = () => {
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */
  async function mapEffect({ leafletElement: map } = {}) {
    const geoJson = {
      type: "FeatureCollection",
      features: current.map((state = {}) => {
        const { latitude: lat, longitude: lng } = state;
        return {
          type: "Feature",
          properties: {
            ...state,
          },
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
      }),
    };

    console.log(geoJson);

    const geoJsonLayers = new L.GeoJSON(JSON.parse(JSON.stringify(geoJson)), {
      pointToLayer: (feature = {}, latlng) => {
        const { properties = {} } = feature;
        let updatedFormatted;
        let casesString;

        const {
          grade,
          state,
          positive,
          negative,
          death,
          recovered,
          hospitalizedCurrently,
          totalTestResults,
          onVentilatorCurrently,
        } = properties;

        casesString = `${positive}`;
        if (positive > 1000) {
          casesString = `${casesString.slice(0, -3)}k+`;
        }

        const html = `
          <span class="icon-marker">
            <span class="icon-marker-tooltip">
              <h2>${state}</h2>
              <ul>
                <li><strong>Grade:</strong> ${grade}</li>
                <li><strong>Positive:</strong> ${positive}</li>
                <li><strong>Negative:</strong> ${negative}</li>
                <li><strong>Death:</strong> ${death}</li>
                <li><strong>Recovered:</strong> ${recovered}</li>
                <li><strong>Hospitalized Currently:</strong> ${hospitalizedCurrently}</li>
                <li><strong>Total Test Results:</strong> ${totalTestResults}</li>
                <li><strong>Currently on Ventilator:</strong> ${onVentilatorCurrently}</li>
              </ul>
            </span>
            ${casesString}
          </span>
        `;

        return L.marker(latlng, {
          icon: L.divIcon({
            className: "icon",
            html,
          }),
          riseOnHover: true,
        });
      },
    });
    geoJsonLayers.addTo(map);
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>COVID-19 Map</title>
      </Helmet>

      <Map {...mapSettings}></Map>
    </Layout>
  );
};

export default IndexPage;
