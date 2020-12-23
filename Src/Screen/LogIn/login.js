import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/Login&Register/boxLogReg';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      lihat: true,
      email: '',
      password: '',
    };
  }
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
        <View style={styles.box}>
          <View style={styles.inpuQu}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="account-circle" size={39} color="blue" />
            </View>
            <View>
              <TextInput placeholder="Email" />
            </View>
          </View>
          <View style={styles.inpuQu}>
            <View style={styles.iconQu}>
              <Icon name="lock" size={39} color="red" />
            </View>
            <View style={styles.inputAja}>
              <TextInput placeholder="Password" />
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
        </View>
        <View style={styles.textAja}>
          <View>
            <Text
              style={styles.textSaya}
              onPress={() => this.props.navigation.navigate('Register')}>
              Buat Akun Baru
            </Text>
          </View>
          <View>
            <Text style={{...styles.textSaya, marginLeft: 140}}>
              Lupa Password
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.tombolKlik}>
          <Text style={styles.teksLogIn}>Masuk</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default Login;
