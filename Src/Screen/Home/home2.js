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
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/Home/BoxHome';
AsyncStorage;

export class Home2 extends Component {
  constructor() {
    super();
    this.state = {
      saldo: '',
      token: '',
      name: '',
      email: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('name');
    AsyncStorage.getItem('token').then((token, name, email) => {
      if (token != null) {
        this.setState({token: token, name: name, email: email});
      } else {
        console.log('token, name, eamil tidak ada');
      }
    });
  }
  saldoKu() {
    const url = 'https://sammpah.herokuapp.com/api/getSaldo';
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        this.setState({saldo: resJson.data, loading: false});
        console.log(resJson.data);
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
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
        </View>
        <ScrollView style={{backgroundColor: '#00c853'}}>
          <View style={styles.head}>
            <View style={styles.boxgambar}>
              <Image
                source={require('../../Assets/fotoLogo/recycle-icon-5.jpg')}
                style={styles.gambar}
              />
            </View>
            <View style={styles.dataKu}>
              <View>
                <Text style={{fontSize: 25}}> Pengurus 2 </Text>
              </View>
              <View>
                <Text style={{fontSize: 18}}>raisazaria30@gmail.com</Text>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <View style={{alignItems: 'center'}}>
              <ScrollView horizontal={true}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Penjemputan')}
                  style={styles.boxFitur}>
                  <Text>penjemputan sampah</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Tabungan')}
                  style={styles.boxFitur}>
                  <Text>buku tabungan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('TarikSaldo')}
                  style={styles.boxFitur}>
                  <Text>penaria saldo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('HistorySaldo')}
                  style={styles.boxFitur}>
                  <Text>Riwanyat saldo</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Home2;
