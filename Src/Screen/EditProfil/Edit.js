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
import launchImageLibrary from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    AsyncStorage.getItem('token').then((value) => {
      if (value != '') {
        this.setState({token: token});
        // console.log(this.state.data);
      } else {
        console.log('token tidak ada');
      }
    });
  }
  render() {
    return (
      <ScrollView styel={styles.utama}>
        <TouchableOpacity
          style={styles.Avatar}
          onPress={() => this.handleChoosePhoto()}>
          {this.state.foto !== '' ? (
            <Image
              source={require('../../Assets/fotoLogo/recycle-icon-5.jpg')}
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
    );
  }
}

export default EditProfile;
