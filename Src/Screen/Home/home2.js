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
import styles from '../../Components/Home/BoxHome';

export class Home2 extends Component {
  constructor() {
    super();
    this.state = {
      sampah: [],
      name: '',
      email: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('name');
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.Gudang(token);
      } else {
        console.log('token, name, eamil tidak ada');
      }
    });
  }
  Gudang(token) {
    console.log('get sampah');
    const url = 'https://sammpah.herokuapp.com/api/getSampah';
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        this.setState({sampah: resJson.data, loading: false});
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
        <ScrollView>
          <View style={styles.head}>
            <View style={styles.dataKu}>
              <View>
                <Text
                  style={{fontSize: 25, color: 'white', fontWeight: 'bold'}}>
                  Pengurus 2
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                  pengurus2@gmail.com
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <View style={{alignItems: 'center'}}>
              <ScrollView horizontal={true}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('JualSampah')}
                  style={styles.boxFitur}>
                  <Image
                    source={require('../../Assets/fotoLogo/icons8-sell-100.png')}
                    style={{width: 65, height: 65}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('HistoriPenjual')
                  }
                  style={styles.boxFitur}>
                  <Image
                    source={require('../../Assets/fotoLogo/icons8-order-history-96-2.png')}
                    style={{width: 65, height: 55}}
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              padding: 5,
              margin: 10,
              backgroundColor: '#76d275',
              elevation: 5,
              borderRadius: 5,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
              Gudang SampaH
            </Text>
          </View>
          <View>
            {this.state.sampah == null ? (
              <View style={{alignSelf: 'center'}}>
                <ActivityIndicator size={40} />
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  // alignItems: 'center',
                }}>
                {this.state.sampah.map((val, key) => {
                  return (
                    <View
                      onPress={() =>
                        this.setState({
                          jenis_sampah: val.jenis_sampah,
                          hargaSampah: val.harga,
                          idSampah: val.id,
                        })
                      }>
                      <View key={key}>
                        <View
                          style={{
                            margin: 5,
                            padding: 5,
                            backgroundColor: 'white',
                            elevation: 5,
                            borderRadius: 10,
                          }}>
                          <View>
                            <Image
                              source={{uri: val.jenis.image}}
                              style={{width: 150, height: 150}}
                            />
                          </View>
                          <View
                            style={{
                              padding: 5,
                              flexDirection: 'row',
                            }}>
                            <Image
                              source={require('../../Assets/fotoLogo/icons8-trash-100.png')}
                              style={{height: 40, width: 40}}
                            />
                            <View style={{justifyContent: 'center'}}>
                              <Text style={{fontSize: 15}}>
                                {val.jenis.jenis_sampah}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              padding: 5,
                              flexDirection: 'row',
                            }}>
                            <Image
                              source={require('../../Assets/fotoLogo/icons8-note-100.png')}
                              style={{height: 40, width: 40}}
                            />
                            <View style={{justifyContent: 'center'}}>
                              <Text style={{fontSize: 15}}>
                                {val.berat} /Kg
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              padding: 5,
                              flexDirection: 'row',
                            }}>
                            <Image
                              source={require('../../Assets/fotoLogo/icons8-note-100.png')}
                              style={{height: 40, width: 40}}
                            />
                            <View style={{justifyContent: 'center'}}>
                              <Text style={{fontSize: 15}}>
                                Rp.{val.jenis.harga} ,-
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Home2;
