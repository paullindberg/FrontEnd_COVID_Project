import axios from "axios";
import React from "react";
import Helmet from "react-helmet";
import L from "leaflet";
import location from "./location.json";

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
      response = await axios.get(
        "https://covidtracking.com/api/v1/states/current.json"
      );
    } catch (e) {
      console.log(`Failed to fetch states: ${e.message}`, e);
      return;
    }

    const { data = [] } = response;

    const Data = Array.isArray(location) && location.length > 0;
    if (!Data) {
      return;
    }

    console.log(location);

    const hasData = Array.isArray(data) && data.length > 0;
    if (!hasData) {
      return;
    }
    console.log(data);

    const geoJson = {
      type: "FeatureCollection",
      features: location.map((state = {}) => {
        const { stateInfo = {} } = state;
        const { latitude: lat, longitude: lng } = stateInfo;
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

    console.log(data);

    const geoJsonLayers = new L.GeoJSON(JSON.parse(JSON.stringify(geoJson)), {
      pointToLayer: (feature = {}, latlng) => {
        const { properties = {} } = feature;
        let updatedFormatted;
        let casesString;

        const { state, lastModified, positive, death, recovered } = properties;

        casesString = `${positive}`;
        if (positive > 1000) {
          casesString = `${casesString.slice(0, -3)}k+`;
        }

        if (lastModified) {
          updatedFormatted = new Date(lastModified).toLocaleString();
        }

        const html = `
          <span class="icon-marker">
            <span class="icon-marker-tooltip">
              <h2>${state}</h2>
              <ul>
                <li><strong>Positive:</strong> ${positive}</li>
                <li><strong>Deaths:</strong> ${death}</li>
                <li><strong>Recovered:</strong> ${recovered}</li>
                <li><strong>Last Modified:</strong> ${lastModified}</li>
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

// import axios from "axios";
// import React from "react";
// import Helmet from "react-helmet";
// import L from "leaflet";

// import Layout from "components/Layout";
// import Container from "components/Container";
// import Map from "components/Map";

// const LOCATION = {
//   lat: 0,
//   lng: 0,
// };
// const CENTER = [LOCATION.lat, LOCATION.lng];
// const DEFAULT_ZOOM = 2;

// const IndexPage = () => {
//   /**
//    * mapEffect
//    * @description Fires a callback once the page renders
//    * @example Here this is and example of being used to zoom in and set a popup on load
//    */

//   async function mapEffect({ leafletElement: map } = {}) {
//     let response;

//     try {
//       response = await axios.get("https://corona.lmao.ninja/v2/countries");
//     } catch (e) {
//       console.log(`Failed to fetch countries: ${e.message}`, e);
//       return;
//     }

//     const { data = [] } = response;

//     const hasData = Array.isArray(data) && data.length > 0;
//     if (!hasData) {
//       return;
//     }
//     console.log(data);

//     const geoJson = {
//       type: "FeatureCollection",
//       features: data.map((country = {}) => {
//         const { countryInfo = {} } = country;
//         const { lat, long: lng } = countryInfo;
//         // testing longitude and latitude output
//         console.log("This is latitude: ");
//         console.log(lat);
//         console.log("This is longitude");
//         console.log(lng);

//         return {
//           type: "Feature",
//           properties: {
//             ...country,
//           },
//           geometry: {
//             type: "Point",
//             coordinates: [lng, lat],
//           },
//         };
//       }),
//     };

//     console.log(geoJson);

//     const geoJsonLayers = new L.GeoJSON(geoJson, {
//       pointToLayer: (feature = {}, latlng) => {
//         const { properties = {} } = feature;
//         let updatedFormatted;
//         let casesString;

//         const { country, updated, cases, deaths, recovered } = properties;

//         casesString = `${cases}`;
//         if (cases > 1000) {
//           casesString = `${casesString.slice(0, -3)}k+`;
//         }

//         if (updated) {
//           updatedFormatted = new Date(updated).toLocaleString();
//         }

//         const html = `
//           <span class="icon-marker">
//             <span class="icon-marker-tooltip">
//               <h2>${country}</h2>
//               <ul>
//                 <li><strong>Confirmed:</strong> ${cases}</li>
//                 <li><strong>Deaths:</strong> ${deaths}</li>
//                 <li><strong>Recovered:</strong> ${recovered}</li>
//                 <li><strong>Last Update:</strong> ${updatedFormatted}</li>
//               </ul>
//             </span>
//             ${casesString}
//           </span>
//         `;

//         return L.marker(latlng, {
//           icon: L.divIcon({
//             className: "icon",
//             html,
//           }),
//           riseOnHover: true,
//         });
//       },
//     });
//     geoJsonLayers.addTo(map);
//   }

//   const mapSettings = {
//     center: CENTER,
//     defaultBaseMap: "OpenStreetMap",
//     zoom: DEFAULT_ZOOM,
//     mapEffect,
//   };

//   return (
//     <Layout pageName="home">
//       <Helmet>
//         <title>Home Page</title>
//       </Helmet>

//       <Map {...mapSettings}></Map>

//       <Container type="content" className="text-center home-start">
//         <h2>Still Getting Started?</h2>
//         <p>Run the following in your terminal!</p>
//         <pre>
//           <code>
//             gatsby new [directory]
//             https://github.com/colbyfayock/gatsby-starter-leaflet
//           </code>
//         </pre>
//         <p className="note">
//           Note: Gatsby CLI required globally for the above command
//         </p>
//       </Container>
//     </Layout>
//   );
// };

// export default IndexPage;
