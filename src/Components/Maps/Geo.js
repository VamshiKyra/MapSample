import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { AppRegistry, StyleSheet, Dimensions, Text, View } from "react-native";
import Geojson from "react-native-geojson";
import axios from "axios";
const alcatraz = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: 0,
      geometry: {
        type: "Polygon",
        coordinates: [
          [-122.084917, 37.423156],
          [-83.74379, 42.280119],
          [-105.261166, 40.021563],
          [-71.087422, 42.362809]
        ]
      }
    }
  ]
};
const getReady = false;
class Geo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        type: "",
        features: []
      },
      fetched: false
    };
  }

  componentDidMount() {
    var URL =
      "https://opendata.arcgis.com/datasets/47478e38d2634ae0a0e01ffc717e286d_2.geojson";
    axios
      .get(URL, {})
      .then(res => res.data)
      .then(data => {
        data.features = [data.features[0]];
        data.features.forEach((entry, index) => {
          entry.geometry.type = "Point";
          if (!index) {
            console.log("coordinates", entry.geometry.coordinates);
            console.log("coordinates[0]", entry.geometry.coordinates[0][0]);
          }
          const newCoordinates = [-122.084917, 37.423156];
          //   [
          //     entry.geometry.coordinates[0][0][1],
          //     entry.geometry.coordinates[0][0][0]
          //   ];
          delete entry.properties;
          entry.id = index;
          entry.geometry.coordinates = newCoordinates;
        });
        console.log("data", data);
        this.setState({ data, fetched: true });
        // getReady = true;
      })
      .catch(error => {
        console.error(error);
      });
  }

  //   renderGeo() {
  //     return ;
  //   }
  render() {
    const { data, fetched } = this.state;
    console.log("rendered", data);
    return (
      <MapView
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={{ ...StyleSheet.absoluteFillObject }}
      >
        {fetched && (
          <MapView.Polygon>
            <Geojson geojson={alcatraz} />
          </MapView.Polygon>
        )}
      </MapView>
    );
  }
}

export default Geo;
