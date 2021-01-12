import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import styles from '../../Components/BoxSetor/boxSetor';
import {launchCamera} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
export class Penjemputan extends Component {
  constructor() {
    super();
    this.state = {
      address: '',
      phone_number: '',
      description: '',
      token: '',
      image: '',
      loading: false,
      latitude: '',
      longitude: '',
    };
  }

  EditProfil = () => {
    // console.log(this.state.token);

    const {name, phone_number, image} = this.state;
    const url = 'https://sammpah.herokuapp.com/api/profile';
    const data = {
      name: name,
      phone_number: phone_number,
    };
    this.setState({loading: true});
    // console.log(this.state.token);

    fetch(url, {
      method: 'POST',
      body: this.createFormData(image, data),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        const {status} = resJson;
        if (status == 'Success') {
          ToastAndroid.show(
            ' Berhasil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            console.log(resJson),
            this.props.navigation.replace('Rumah', {screen: 'Profil'}),
          );
          this.setState({loading: false});
          // this.props.navigation.navigate('Home');
        } else {
          this.setState({loading: false});
          console.log('error');
          alert('error');
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('error is' + error);
      });
  };
  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchCamera(options, (response) => {
      if (response.uri) {
        this.setState({image: response});
      }
    });
  };
  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token != null) {
          this.setState({token: token});
        } else {
          console.log('tidak ada token');
        }
      })
      .catch((err) => console.log(err));

    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  render() {
    return (
      <View style={styles.urama}>
        <View style={styles.head}>
          <Text style={styles.title}> Penyetoran Sampah </Text>
        </View>
        <ScrollView>
          <View style={styles.boxInput}>
            <TouchableOpacity style={styles.image}>
              <Image />
            </TouchableOpacity>
            <View style={styles.Input}>
              <TextInput
                placeholder="Nama"
                onChangeText={(text) => this.setState({address: text})}
              />
            </View>
            <View style={styles.Input}>
              <TextInput />
            </View>
            <View style={styles.Input}>
              <TextInput />
            </View>
            <View>
              {this.state.longitude == '' ? (
                <ActivityIndicator size={50} color="red" />
              ) : (
                <MapView
                  region={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }}
                  showsUserLocation
                  showsMyLocationButton
                  provider={PROVIDER_GOOGLE}
                  style={{height: 350, width: 350}}></MapView>
              )}
            </View>
            <View style={{...styles.Input, height: 75}}>
              <Text> </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.klik}>
            <Text style={{fontSize: 40, color: 'white'}}> Setor </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default Penjemputan;
