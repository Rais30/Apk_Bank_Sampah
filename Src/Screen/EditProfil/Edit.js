import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import styles from '../../Components/EditProfile/editProfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

export class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      phone_number: '',
      avatar: '',
      loading: false,
      token: '',
    };
  }

  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('avatar', {
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
    launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({avatar: response});
      }
    });
  };

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token != null) {
          this.setState({token: token});
          // console.log(this.state.token);
          // console.log(this.state.data);
        } else {
          console.log('token tidak ada');
        }
      })
      .catch((err) => console.log(err));
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
        // 'Content-Type': 'application/json',
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

  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.head}>
          <Text style={{fontSize: 37}}> Ubah Profile</Text>
        </View>
        <ScrollView>
          <TouchableOpacity
            style={styles.Avatar}
            onPress={() => this.handleChoosePhoto()}>
            {this.state.avatar !== '' ? (
              <Image
                style={styles.Avatar}
                source={{uri: this.state.avatar.uri}}
              />
            ) : (
              <Text> foto </Text>
            )}
          </TouchableOpacity>

          <View>
            <View style={styles.boxInpur}>
              <TextInput
                style={styles.teksInput}
                placeholder="Nama"
                value={this.state.name}
                secureTextEntry={this.state.visibel}
                onChangeText={(text) => this.setState({name: text})}
              />
            </View>

            <View style={styles.boxInpur}>
              <TextInput
                placeholder="No Telefon"
                value={this.state.phone_number}
                keyboardType="number-pad"
                onChangeText={(text) => this.setState({phone_number: text})}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.EditProfil()}
            style={styles.tombol}>
            {this.state.loading ? (
              <ActivityIndicator size={25} color="red" />
            ) : (
              <Text style={{fontSize: 30}}> Simpan </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default EditProfile;
