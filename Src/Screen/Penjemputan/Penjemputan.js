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
    console.log('setor sampah');

    const {address, phone_number, image, description} = this.state;
    const url = 'https://sammpah.herokuapp.com/api/jemput';
    const data = {
      address: address,
      phone_number: phone_number,
      description: description,
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
        console.log('ini respon pennyetoran Sampah', resJson);
        const {status} = resJson;
        if (status == 'Success') {
          ToastAndroid.show(
            'Menyetoran Bersil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            console.log(resJson),
            this.props.navigation.replace('Rumah', {screen: 'HomeOne'}),
          );
          this.setState({loading: false});
          // this.props.navigation.navigate('Home');
        } else {
          console.log('ada error bang');
          alert('periksa kemabli data anda ');
          this.setState({loading: false});
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('error dari penyetoran sampah' + error);
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
        ToastAndroid.show(
          ' Tidak ada Jaringan ',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
          console.log('tidak ada alamat' + error),
        );
        this.setState({loading: false});
      });
  }

  render() {
    return (
      <View style={styles.urama}>
        <View style={styles.headers}>
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
                <View style={{marginTop: 110, alignSelf: 'center'}}>
                  <Text style={{fontSize: 28}}>foto Sampah</Text>
                </View>
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
            <View style={styles.boxMap}>
              {this.state.longitude == '' ? (
                <View></View>
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
                  style={styles.map}></MapView>
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
