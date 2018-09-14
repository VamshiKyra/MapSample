import React, { Component } from "react";
import { AppRegistry, StyleSheet, Dimensions, Text, View } from "react-native";
import axios from "axios";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
const LATITUDE = 30.400189;
const LONGITUDE = -84.232679;

class Maps extends Component {
  state = {
    albums: [],
    LatLng: {
      latitude: LATITUDE,
      longitude: LONGITUDE
    }
  };

  // componentWillMount() {
  //     axios.get('https://rallycoding.herokuapp.com/api/music_albums')
  //         .then(response => this.setState({ locations: response.data }), console.log(this.state.locations))
  //         .catch(e => console.log(e));
  // }
  componentWillMount() {
    axios
      .get(
        "https://ca.dep.state.fl.us/arcgis/rest/services/OpenData/ARMS/MapServer/4/query?where=1%3D1&outFields=*&outSR=4326&f=json"
      )
      .then(response => this.setState({ albums: response.data.features }))
      .catch(e => console.log(e));
  }

  renderMaps() {
    this.state.albums.map(album => {
      if (album.geometry) {
        if (album.geometry.x && album.geometry.y) {
          const latitude = album.geometry.x;
          const longitude = album.geometry.y;
          const LatLng = {
            latitude: album.geometry.y,
            longitude: album.geometry.x
          };
          console.log(LatLng);
          return <Marker coordinate={LatLng} />;
        }
      }
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ ...StyleSheet.absoluteFillObject }}
          region={{
            latitude: this.state.LatLng.latitude,
            longitude: this.state.LatLng.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421
          }}
          showsUserLocation
        >
          {this.state.albums.map(album => {
            if (album.geometry) {
              if (album.geometry.x && album.geometry.y) {
                const LatLng = {
                  latitude: album.geometry.y,
                  longitude: album.geometry.x
                };
                return (
                  <Marker
                    key={album.geometry.x}
                    coordinate={LatLng}
                    title={album.attributes.LONGNAME}
                    description={album.attributes.AQI_CATEGORY}
                  />
                );
              }
            }
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 100,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default Maps;
