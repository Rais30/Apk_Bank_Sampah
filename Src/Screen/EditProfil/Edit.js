import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from '../../Components/EditProfile/editProfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
export class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      nomer: '',
      foto: '',
      loading: false,
      token: '',
    };
  }

  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('foto', {
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
        this.setState({foto: response});
      }
    });
  };

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((value) => {
        if (value != '') {
          this.setState({token: token});
          // console.log(this.state.data);
        } else {
          console.log('token tidak ada');
        }
      })
      .catch((err) => console.log(err));
  }

  EditProfil = () => {
    const {password, password_confirmation, alamat, nomer, foto} = this.state;
    const url = 'https://api-shop1.herokuapp.com/api/update';
    const data = {
      password: password,
      password_confirmation: password_confirmation,
      alamat: alamat,
      nomer: nomer,
      _method: 'PUT',
    };
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      body: this.createFormData(foto, data),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        const {status} = resJson;
        if (status == 'success') {
          ToastAndroid.show(
            ' Berasil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            console.log(resJson),
            this.props.navigation.replace('rumah', {screan: 'Profil'}),
          );
          this.setState({loading: false});
          this.props.navigation.navigate('rumah');
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
        <ScrollView>
          <TouchableOpacity
            style={styles.Avatar}
            onPress={() => this.handleChoosePhoto()}>
            {this.state.foto !== '' ? (
              <Image
                style={styles.Avatar}
                source={{uri: this.state.foto.uri}}
              />
            ) : (
              <Text> Foto </Text>
            )}
          </TouchableOpacity>

          <View>
            <View>
              <TextInput
                placeholder="Nama"
                value={this.state.password_confirmation}
                secureTextEntry={this.state.visibel}
                onChangeText={(text) =>
                  this.setState({password_confirmation: text})
                }
              />
            </View>

            <View>
              <TextInput
                placeholder="No Telefon"
                value={this.state.nomer}
                keyboardType="number-pad"
                onChangeText={(text) => this.setState({nomer: text})}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => this.EditProfil()}>
            {this.state.loading ? (
              <ActivityIndicator size={25} color="red" />
            ) : (
              <Text> Ubah Profil</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default EditProfile;
