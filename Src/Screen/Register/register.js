import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/Login&Register/boxLogReg';

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      lihat: true,
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone_number: '',
      loading: false,
    };
  }
  Daftar = () => {
    const {
      name,
      email,
      password,
      password_confirmation,
      phone_number,
    } = this.state;
    const url = 'https://sammpah.herokuapp.com/api/register';
    const data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      phone_number: phone_number,
    };
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson) {
          ToastAndroid.show(
            ' Anda Telah TerDaftar',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            console.log(resJson),
            this.setState({loading: false}),
            this.props.navigation.navigate('Login'),
          );
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
  Lihat = () => {
    this.setState({lihat: !this.state.lihat});
  };
  render() {
    return (
      <ScrollView style={styles.utama}>
        <View style={styles.titel}>
          <Image
            style={styles.imageQu}
            source={require('../../Assets/fotoLogo/recycle-icon-5.jpg')}
          />
          <Text style={styles.teksTitel}> sammpaH </Text>
        </View>
        <View style={{...styles.box, height: 350}}>
          <View style={styles.inpuQu}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="account-circle" size={39} color="blue" />
            </View>
            <View style={styles.inputAja}>
              <TextInput
                value={this.state.name}
                onChangeText={(text) => this.setState({name: text})}
                placeholder="Name"
              />
            </View>
          </View>
          <View style={styles.inpuQu}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="mail" size={39} color="blue" />
            </View>
            <View style={styles.inputAja}>
              <TextInput
                placeholder="Email"
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={(text) => this.setState({email: text})}
              />
            </View>
          </View>
          <View style={styles.inpuQu}>
            <View style={styles.iconQu}>
              <Icon name="lock" size={39} color="red" />
            </View>
            <View style={styles.inputAja}>
              <TextInput
                placeholder="Password"
                value={this.state.password}
                secureTextEntry={this.state.lihat}
                onChangeText={(text) => this.setState({password: text})}
              />
            </View>
            <View style={styles.iconQu}>
              <Icon
                name="visibility"
                size={35}
                color="red"
                onPress={() => this.Lihat()}
              />
            </View>
          </View>
          <View style={styles.inpuQu}>
            <View style={styles.iconQu}>
              <Icon name="lock" size={39} color="red" />
            </View>
            <View style={styles.inputAja}>
              <TextInput
                placeholder="Tulis Ulang Password"
                value={this.state.password_convirmation}
                onChangeText={(text) =>
                  this.setState({password_confirmation: text})
                }
                secureTextEntry={this.state.lihat}
              />
            </View>
          </View>
          <View style={styles.inpuQu}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="call" size={39} color="blue" />
            </View>
            <View style={styles.inputAja}>
              <TextInput
                placeholder="Phone Number"
                value={this.state.phone_number}
                keyboardType="number-pad"
                onChangeText={(text) => this.setState({phone_number: text})}
              />
            </View>
          </View>
        </View>
        <View style={styles.Akun}>
          <Text
            style={styles.textSaya}
            onPress={() => this.props.navigation.navigate('Login')}>
            Memiliki Akun
          </Text>
        </View>

        <TouchableOpacity
          style={{...styles.tombolKlik, marginTop: 90}}
          onPress={() => this.Daftar()}>
          {this.state.loading ? (
            <ActivityIndicator size={40} color="red" />
          ) : (
            <Text style={styles.teksLogIn}>Daftar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default Register;
