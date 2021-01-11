import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import styles from '../../Components/BoxSetor/boxSetor';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    };
  }
  EditProfil = () => {
    // console.log(this.state.token);

    const {name, phone_number, avatar} = this.state;
    const url = 'https://sammpah.herokuapp.com/api/profile';
    const data = {
      name: name,
      phone_number: phone_number,
    };
    this.setState({loading: true});
    // console.log(this.state.token);

    fetch(url, {
      method: 'POST',
      body: this.createFormData(avatar, data),
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
  }
  render() {
    return (
      <View style={styles.urama}>
        <View style={styles.head}>
          <Text style={styles.title}> Penyetoran Sampah </Text>
        </View>
        <ScrollView>
          <View>
            <View>
              <TextInput />
            </View>
            <View>
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
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Penjemputan;
