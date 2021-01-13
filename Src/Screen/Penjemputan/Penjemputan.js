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
  ToastAndroid,
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

  setorSampah = () => {
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
        this.alamat();
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
  alamat() {
    const {latitude, longitude} = this.state;
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    // this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        // Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(' ini alamt', resJson.display_name);
        this.setState({address: resJson.display_name});
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  }

  render() {
    return (
      <View style={styles.urama}>
        <View style={styles.head}>
          <Text style={styles.title}> Penyetoran Sampah </Text>
        </View>
        <ScrollView>
          <View style={styles.boxInput}>
            <TouchableOpacity
              style={styles.image}
              onPress={() => this.handleChoosePhoto()}>
              {this.state.image !== '' ? (
                <Image
                  style={styles.gambar}
                  source={{uri: this.state.image.uri}}
                />
              ) : (
                <Text style={{fontSize: 33}}>foto sampah Kamu</Text>
              )}
            </TouchableOpacity>
            <View style={styles.Input}>
              <TextInput
                placeholder=" Nomer Telepon "
                keyboardType="number-pad"
                onChangeText={(text) => this.setState({phone_number: text})}
              />
            </View>

            <View style={styles.Input}>
              <TextInput
                placeholder=" Description "
                onChangeText={(text) => this.setState({description: text})}
              />
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
            <View style={{...styles.Input, height: 75, padding: 10}}>
              <Text>{this.state.address}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.klik}
            onPress={() => this.setorSampah()}>
            {this.state.loading ? (
              <ActivityIndicator color="red" size="small" />
            ) : (
              <Text style={{fontSize: 40, color: 'white'}}> Setor </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default Penjemputan;
