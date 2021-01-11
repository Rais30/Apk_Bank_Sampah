import React, {Component} from 'react';
import {Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export class Penjemputan extends Component {
  render() {
    return (
      <View>
        <View style={{alignItems: 'center', margin: 10}}>
          <Text style={{fontSize: 25}}> Penyetoran Sampah </Text>
        </View>
        <MapView
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation
          showsMyLocationButton
          provider={PROVIDER_GOOGLE}
          style={{height: '100%'}}></MapView>
      </View>
    );
  }
}

export default Penjemputan;
