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

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      lihat: true,
      name: '',
      email: '',
      password: '',
      password_convirmation: '',
      phone_number: '',
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
        <View style={{...styles.box, height: 350}}>
          <View style={styles.inpuQu}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="account-circle" size={39} color="blue" />
            </View>
            <View>
              <TextInput placeholder="Name" />
            </View>
          </View>
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
          <View style={styles.inpuQu}>
            <View style={styles.iconQu}>
              <Icon name="lock" size={39} color="red" />
            </View>
            <View style={styles.inputAja}>
              <TextInput placeholder="Tulis Ulang xPassword" />
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="account-circle" size={39} color="blue" />
            </View>
            <View>
              <TextInput placeholder="Phone Number" />
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

        <TouchableOpacity style={{...styles.tombolKlik, marginTop: 90}}>
          <Text style={styles.teksLogIn}>Daftar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default Register;
