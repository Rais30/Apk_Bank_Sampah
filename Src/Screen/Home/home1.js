import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/Home/BoxHome';
AsyncStorage;

export class Home1 extends Component {
  constructor() {
    super();
    this.state = {
      saldo: '',
      token: '',
      name: '',
      emasil: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
      } else {
        console.log('token, name, eamil tidak ada');
      }
    });
  }

  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headers}>
          <TouchableOpacity
            onPress={() => this.props.navigation.openDrawer()}
            style={{...styles.boxgambar, marginRight: '68%'}}>
            <Image
              source={require('../../Assets/fotoLogo/recycle-icon-5.jpg')}
              style={styles.gambar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Kontak')}
            style={styles.IconHead}>
            <Image
              source={require('../../Assets/fotoLogo/icons8-new-contact-100.png')}
              style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.head}>
            <View style={styles.dataKu}>
              <View>
                <Text
                  style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>
                  Pengurus 1
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 18, color: 'white'}}>
                  raisazaria30@gmail.com
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <View style={{alignItems: 'center'}}>
              <ScrollView horizontal={true}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('SetorSampah')}
                  style={styles.boxFitur}>
                  <Image
                    source={require('../../Assets/fotoLogo/icons8-trash-100.png')}
                    style={{height: 65, width: 65}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Jemput')}
                  style={styles.boxFitur}>
                  <Image
                    source={require('../../Assets/fotoLogo/icons8-new-message-100.png')}
                    style={{width: 60, height: 60}}
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Home1;