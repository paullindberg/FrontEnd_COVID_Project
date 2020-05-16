import axios from "axios";
import React from "react";
import Helmet from "react-helmet";
import L from "leaflet";
import current from './current.json'


import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";

const LOCATION = {
  lat: 37.0902,
  lng: -95.7129,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 5;

const IndexPage = () => {
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */
  async function mapEffect({ leafletElement: map } = {}) {
    let response;

    try {
      response = await axios.get("https://covidtracking.com/api/v1/states/current.json");
    } catch (e) {
      console.log(`Failed to fetch states: ${e.message}`, e);
      return;
    }


    const { data = [] } = response;
    const hasData = Array.isArray(data) && data.length > 0;
    if (!hasData) {
      return;
    }
    console.log(data);

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

        const { state, positive, death} = properties;

        casesString = `${positive}`;
        if (positive > 1000) {
          casesString = `${casesString.slice(0, -3)}k+`;
        }

        const html = `
          <span class="icon-marker">
            <span class="icon-marker-tooltip">
              <h2>${state}</h2>
              <ul>
                <li><strong>Positive:</strong> ${positive}</li>
                <li><strong>Death:</strong> ${death}</li>
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
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}></Map>

      <Container type="content" className="text-center home-start">
        <h2>Still Getting Started?</h2>
        <p>Run the following in your terminal!</p>
        <pre>
          <code>
            gatsby new [directory]
            https://github.com/colbyfayock/gatsby-starter-leaflet
          </code>
        </pre>
        <p className="note">
          Note: Gatsby CLI required globally for the above command
        </p>
      </Container>
    </Layout>
  );
};

export default IndexPage;
